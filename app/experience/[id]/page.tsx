'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import CommentSection from '../../components/CommentSection'
import { experienceAPI, utils } from '../../lib/api'
import { Experience } from '../../types/api'
import { 
  CalendarIcon, 
  MapPinIcon, 
  EyeIcon, 
  HeartIcon, 
  BookmarkIcon,
  ShareIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid'

export default function ExperienceView() {
  const params = useParams()
  const router = useRouter()
  const experienceId = params.id as string
  
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [user, setUser] = useState(utils.getUser())

  useEffect(() => {
    loadExperience()
  }, [experienceId])

  const loadExperience = async () => {
    try {
      const response = await experienceAPI.getExperience(experienceId)
      
      if (response.success && response.data && response.data.experience) {
        setExperience(response.data.experience)
      } else {
        console.error('Experience load failed:', response)
        alert(response.message || 'Experience not found')
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Error loading experience:', error)
      alert(error?.message || 'Failed to load experience')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('✅ Link copied to clipboard!')
  }

  const handleChat = () => {
    if (!user) {
      alert('Please login to chat')
      router.push('/login')
      return
    }
    if (experience?.users?.id) {
      router.push(`/chat/${experience.users.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experience...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-2xl text-gray-600">Experience not found</p>
          </div>
        </div>
      </div>
    )
  }

  const resultColors = {
    'Selected': 'bg-green-100 text-green-800 border-green-300',
    'Not Selected': 'bg-red-100 text-red-800 border-red-300',
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Card - Modern & Clean */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-6">
          {/* Top Section with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {experience.companies?.logo_url && (
                  <div className="bg-white p-2 rounded-lg shadow-lg">
                    <img 
                      src={experience.companies.logo_url} 
                      alt={experience.companies.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {experience.role}
                  </h1>
                  <p className="text-xl text-blue-100 font-semibold mb-3">
                    {experience.companies?.name}
                  </p>
                </div>
              </div>
              
              <span className={`px-4 py-2 rounded-lg text-base font-bold shadow-lg ${resultColors[experience.result]}`}>
                {experience.result === 'Selected' ? '✅' : experience.result === 'Not Selected' ? '❌' : '⏳'} {experience.result}
              </span>
            </div>
          </div>

          {/* Bottom Section - White */}
          <div className="px-8 py-6">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <button
                onClick={() => router.push(`/user/${experience.users?.id}`)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">
                    {experience.users?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {experience.users?.name}
              </button>
              {experience.users?.course && <span className="text-gray-600">• {experience.users.course}</span>}
              {experience.users?.year && <span className="text-gray-600">• {experience.users.year}</span>}
            </div>

            {/* Meta Info - Improved Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-gray-600 font-medium mb-1">Type:</p>
                <p className="text-sm font-bold text-blue-700">{experience.experience_type}</p>
              </div>
              {experience.location && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />Location:
                  </p>
                  <p className="text-sm font-bold text-purple-700">{experience.location}</p>
                </div>
              )}
              {experience.interview_date && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />Date:
                  </p>
                  <p className="text-sm font-bold text-green-700">{new Date(experience.interview_date).toLocaleDateString()}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 font-medium mb-1">
                  <EyeIcon className="h-4 w-4 inline mr-1" />Views:
                </p>
                <p className="text-sm font-bold text-gray-700">{experience.views_count || 0}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                <ShareIcon className="h-5 w-5" />
                Share
              </button>
              
              {user && experience.users?.id !== user.id && (
                <button
                  onClick={handleChat}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  Chat with {experience.users?.name}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Sections - Modern Cards */}
        <div className="space-y-5">
          {/* Overall Experience */}
          {experience.overall_experience && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <h2 className="text-xl font-bold text-white">Overall Interview Process</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {experience.overall_experience}
                </p>
              </div>
            </div>
          )}

          {/* Technical Rounds */}
          {experience.technical_rounds && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <h2 className="text-xl font-bold text-white">Technical / Coding Rounds</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {experience.technical_rounds}
                </p>
              </div>
            </div>
          )}

          {/* HR Rounds */}
          {experience.hr_rounds && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <h2 className="text-xl font-bold text-white">HR / Behavioral Rounds</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {experience.hr_rounds}
                </p>
              </div>
            </div>
          )}

          {/* Tips & Advice */}
          {experience.tips_and_advice && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💡</span>
                  <h2 className="text-xl font-bold text-white">Tips & Advice</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {experience.tips_and_advice}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <CommentSection experienceId={experienceId} />
        </div>
      </div>
    </div>
  )
}
