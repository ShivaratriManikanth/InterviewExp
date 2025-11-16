'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { utils } from '../lib/api'

export default function HeroSection() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(utils.isAuthenticated())
  }, [])

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Image - More Visible */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Professional Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Your Gateway to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Interview Success</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          A professional platform connecting students through authentic interview experiences. Learn from real placement stories and prepare effectively for your dream career.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
          {!isLoggedIn ? (
            <>
              <Link 
                href="/register" 
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Get Started Free</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <button
                onClick={handleBrowseClick}
                className="px-10 py-4 bg-white text-gray-800 rounded-xl border-2 border-gray-300 font-bold text-lg hover:shadow-xl hover:border-blue-500 hover:scale-105 transition-all"
              >
                Browse Experiences
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/dashboard" 
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
              >
                <span>View Dashboard</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/post-experience"
                className="px-10 py-4 bg-white text-gray-800 rounded-xl border-2 border-gray-300 font-bold text-lg hover:shadow-xl hover:border-blue-500 hover:scale-105 transition-all"
              >
                Share Your Experience
              </Link>
            </>
          )}
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full shadow-md border border-blue-200">
          <SparklesIcon className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-gray-800">Trusted by 50+ Students</span>
        </div>

        {/* Professional Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-3">100+</div>
            <div className="text-gray-700 font-semibold text-lg">Interview Experiences</div>
            <div className="text-gray-500 text-sm mt-2">Real stories from students</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">25+</div>
            <div className="text-gray-700 font-semibold text-lg">Top Companies</div>
            <div className="text-gray-500 text-sm mt-2">From startups to Fortune 500</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">200+</div>
            <div className="text-gray-700 font-semibold text-lg">Active Students</div>
            <div className="text-gray-500 text-sm mt-2">Growing community daily</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Experiences</h3>
            <p className="text-gray-600">Access verified interview experiences shared by students from leading institutions across India.</p>
          </div>
          <div className="p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Preparation</h3>
            <p className="text-gray-600">Gain insights into interview patterns, technical questions, and company-specific preparation strategies.</p>
          </div>
          <div className="p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Network</h3>
            <p className="text-gray-600">Build meaningful connections with peers and leverage collective knowledge for career success.</p>
          </div>
        </div>
      </div>
    </section>
  )
}