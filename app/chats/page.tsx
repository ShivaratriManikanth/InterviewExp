'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { chatAPI, utils } from '../lib/api'
import { User } from '../types/api'

interface Conversation {
  id: string
  otherParticipant: {
    id: string
    name: string
    college: string
    course: string
    year: string
    profilePicture?: string
  }
  lastMessage: {
    id: string
    content: string
    message_type: string
    created_at: string
    sender_id: string
  } | null
  unreadCount: number
  lastMessageAt: string
}

export default function ChatsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const userData = utils.getUser()
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(userData)
    loadConversations()

    // Poll for new messages every 3 seconds
    pollingInterval.current = setInterval(() => {
      loadConversations(true)
    }, 3000)

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [])

  const loadConversations = async (silent: boolean = false) => {
    try {
      if (!silent) setLoading(true)
      
      const response = await chatAPI.getConversations()
      if (response.success && response.data) {
        setConversations(response.data.conversations || [])
      }
    } catch (error) {
      if (!silent) {
        console.error('Error loading conversations:', error)
      }
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const getLastMessagePreview = (conv: Conversation) => {
    if (!conv.lastMessage) return 'No messages yet'
    
    const isMe = conv.lastMessage.sender_id === user?.id
    const prefix = isMe ? 'You: ' : ''
    
    if (conv.lastMessage.message_type === 'image') {
      return `${prefix}📷 Photo`
    } else if (conv.lastMessage.message_type === 'file') {
      return `${prefix}📎 File`
    }
    
    return `${prefix}${conv.lastMessage.content}`
  }

  const filteredConversations = conversations.filter(conv =>
    conv.otherParticipant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.otherParticipant.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-peach-50">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                </div>
                Messages
              </h1>
              {totalUnread > 0 && (
                <div className="flex items-center gap-2 ml-16">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-600 font-medium">
                    {totalUnread} unread message{totalUnread > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="space-y-4">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchQuery ? 'No conversations found' : 'No messages yet'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchQuery 
                    ? 'Try a different search term' 
                    : 'Start a conversation by visiting someone\'s profile'}
                </p>
                {!searchQuery && (
                  <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    Explore Experiences
                  </Link>
                )}
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/chat/${conv.otherParticipant.id}`}
                  className="group block bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-100 p-5 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <span className="text-white font-bold text-xl">
                          {conv.otherParticipant.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <span className="text-white text-xs font-bold">
                            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors ${conv.unreadCount > 0 ? 'text-lg' : 'text-base'}`}>
                            {conv.otherParticipant.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            {conv.otherParticipant.year} • {conv.otherParticipant.course}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                          {formatTimestamp(conv.lastMessageAt)}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${
                        conv.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-600'
                      }`}>
                        {getLastMessagePreview(conv)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
