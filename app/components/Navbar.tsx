'use client'

import { useState, useEffect } from 'react'
import { ChatBubbleLeftIcon, UserIcon, Bars3Icon, XMarkIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { utils, authAPI } from '../lib/api'
import AnimatedLogo from './AnimatedLogo'

interface NavbarProps {
  isLoggedIn?: boolean
  user?: any
}

export default function Navbar({ isLoggedIn: propIsLoggedIn, user: propUser }: NavbarProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn || false)
  const [user, setUser] = useState(propUser || null)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = utils.isAuthenticated()
      const userData = utils.getUser()
      setIsLoggedIn(authenticated)
      setUser(userData)
    }

    checkAuth()
    
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      setIsLoggedIn(false)
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-3 group">
            <AnimatedLogo size="small" />
            <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-100 hidden sm:block group-hover:scale-105 transition-transform">InterviewExp</span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            <Link 
              href="/" 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium transition-all"
                >
                  <HomeIcon className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link 
                  href="/chats" 
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg font-medium transition-all"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  Messages
                </Link>
                <Link 
                  href="/post-experience" 
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Post Experience
                </Link>
                
                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all text-white">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="hidden lg:block">{user?.name || 'User'}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 font-medium border-b border-gray-200 rounded-t-xl"
                    >
                      👤 My Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium rounded-b-xl"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-6 py-2.5 text-white hover:bg-white/10 rounded-lg font-bold transition-all"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
                >
                  Sign Up
                  <span className="text-xl">→</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-gradient-to-b from-indigo-700 to-pink-700">
          <div className="px-4 py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              ℹ️ About
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              📧 Contact
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📊 Dashboard
                </Link>
                <Link 
                  href="/chats" 
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  💬 Messages
                </Link>
                <Link 
                  href="/post-experience" 
                  className="block px-4 py-3 bg-white text-blue-600 rounded-full font-bold text-center shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ➕ Post Experience
                </Link>
                <Link 
                  href="/profile" 
                  className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 My Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-lg font-medium"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block px-4 py-3 text-center text-white hover:bg-white/10 rounded-lg font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="block px-4 py-3 text-center bg-white text-blue-600 rounded-full font-bold shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
