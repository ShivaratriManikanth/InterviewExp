'use client'

import Navbar from '../components/Navbar'
import Link from 'next/link'
import { 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Professional Team/Learning Background Image - Minimal */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Professional Dot Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">InterviewExp</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A professional platform dedicated to empowering students through shared knowledge and authentic interview experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-16 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            InterviewExp is committed to democratizing access to interview preparation resources. We provide a structured platform where students can share authentic experiences, learn from peers, and develop effective strategies for placement success. Our mission is to reduce information asymmetry and help every student approach interviews with confidence and preparation.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How the Platform Works</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            InterviewExp provides a streamlined process for sharing and accessing interview experiences. Follow these steps to get started:
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-blue-600 font-bold text-sm mb-2">STEP 1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Register</h3>
              <p className="text-gray-600 leading-relaxed">
                Create a free account using your institutional email. Join a professional community of students committed to mutual growth and success.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200 hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <MagnifyingGlassIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-purple-600 font-bold text-sm mb-2">STEP 2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore & Research</h3>
              <p className="text-gray-600 leading-relaxed">
                Access comprehensive interview experiences filtered by company, role, and institution. Analyze patterns and develop targeted preparation strategies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-200 hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <PencilSquareIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-blue-600 font-bold text-sm mb-2">STEP 3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contribute</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your interview experiences to help fellow students. Provide detailed insights including questions asked, difficulty level, and preparation tips.
              </p>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <DocumentTextIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Knowledge</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Document comprehensive interview experiences including company details, role specifications, and interview dates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Share technical questions, coding challenges, and behavioral assessment details</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Provide strategic preparation advice and resource recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Contribute insights on effective and ineffective preparation approaches</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Network & Collaborate</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Engage in professional discussions through comments and experience reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Connect directly with peers for personalized guidance and mentorship</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Utilize advanced filters to find relevant experiences by company, role, and institution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Expand your professional network across leading educational institutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose InterviewExp?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Free Forever</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Real</div>
              <div className="text-blue-100">Authentic Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Access Anytime</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Begin Your Journey</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a growing community of students leveraging shared knowledge for placement success. Start accessing authentic interview experiences today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/dashboard" 
              className="px-10 py-4 bg-white text-gray-800 rounded-xl border-2 border-gray-300 font-bold text-lg hover:shadow-xl hover:border-blue-500 hover:scale-105 transition-all"
            >
              Browse Experiences
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
