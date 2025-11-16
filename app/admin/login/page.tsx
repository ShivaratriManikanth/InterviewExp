'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Import API function
      const { authAPI } = await import('../../lib/api')
      
      const response = await authAPI.adminLogin(formData)

      if (response.success) {
        alert('✅ Admin login successful! Welcome to admin panel!')
        router.push('/admin/dashboard')
      } else {
        alert('❌ ' + (response.message || 'Login failed. Please check your credentials.'))
      }
    } catch (error) {
      console.error('Admin login error:', error)
      alert('❌ Login failed. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navbar isLoggedIn={false} user={null} />
      
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-2xl">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-600 text-lg">Placement Cell / TPO Access</p>
          </div>

          {/* Admin Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-orange-200">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 mb-6 border border-orange-300">
              <p className="text-sm text-gray-700 text-center font-medium">
                🛡️ Authorized Personnel Only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="admin@college.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="Enter admin password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Signing In...' : 'Admin Sign In'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <Link href="/login" className="text-sm text-gray-500 hover:text-orange-600 font-medium transition-colors">
                ← Back to Student Login
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 All admin activities are logged and monitored
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}