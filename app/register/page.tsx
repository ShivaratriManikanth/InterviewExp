'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    college: '',
    degree: '',
    course: '',
    customCourse: '',
    year: ''
  })

  const [availableCourses, setAvailableCourses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const degrees = [
    'B.Tech (Bachelor of Technology)',
    'B.E (Bachelor of Engineering)',
    'BCA (Bachelor of Computer Applications)',
    'B.Sc (Bachelor of Science)',
    'M.Tech (Master of Technology)',
    'M.E (Master of Engineering)',
    'MCA (Master of Computer Applications)',
    'M.Sc (Master of Science)',
    'MBA (Master of Business Administration)',
    'PhD (Doctor of Philosophy)',
    'Other'
  ]

  const coursesByDegree = {
    'B.Tech (Bachelor of Technology)': [
      'Computer Science Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Biotechnology Engineering',
      'Aerospace Engineering',
      'Automobile Engineering',
      'Industrial Engineering',
      'Environmental Engineering'
    ],
    'B.E (Bachelor of Engineering)': [
      'Computer Science Engineering',
      'Information Science Engineering',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Instrumentation Engineering'
    ],
    'BCA (Bachelor of Computer Applications)': [
      'Computer Applications',
      'Software Development',
      'Web Development',
      'Mobile App Development'
    ],
    'B.Sc (Bachelor of Science)': [
      'Computer Science',
      'Information Technology',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Statistics',
      'Data Science'
    ],
    'M.Tech (Master of Technology)': [
      'Computer Science Engineering',
      'Software Engineering',
      'Data Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Cybersecurity',
      'VLSI Design',
      'Embedded Systems'
    ],
    'M.E (Master of Engineering)': [
      'Computer Science Engineering',
      'Software Engineering',
      'Electronics Engineering',
      'Communication Engineering'
    ],
    'MCA (Master of Computer Applications)': [
      'Computer Applications',
      'Software Development',
      'System Administration',
      'Database Management'
    ],
    'M.Sc (Master of Science)': [
      'Computer Science',
      'Information Technology',
      'Data Science',
      'Mathematics',
      'Statistics'
    ],
    'MBA (Master of Business Administration)': [
      'Technology Management',
      'Operations Management',
      'Human Resources',
      'Marketing',
      'Finance'
    ],
    'PhD (Doctor of Philosophy)': [
      'Computer Science',
      'Information Technology',
      'Engineering',
      'Mathematics',
      'Management'
    ]
  }

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Passed Out']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Update available courses when degree changes
    if (name === 'degree') {
      const courses = coursesByDegree[value as keyof typeof coursesByDegree] || []
      setAvailableCourses(courses)
      setFormData(prev => ({ ...prev, course: '', customCourse: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      setIsLoading(false)
      return
    }

    try {
      // Import API function
      const { authAPI } = await import('../lib/api')

      // Prepare registration data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        rollNo: formData.rollNo,
        college: formData.college,
        degree: formData.degree,
        course: formData.course === 'Other' ? formData.customCourse : formData.course,
        year: formData.year
      }

      console.log('Attempting registration with:', registrationData)

      const response = await authAPI.register(registrationData)

      console.log('Registration response:', response)

      if (response.success) {
        alert('Registration successful! Welcome to the platform!')
        router.push('/dashboard')
      } else {
        // Show detailed error message
        if (response.error && typeof response.error === 'object' && Array.isArray(response.error)) {
          const errorMessages = response.error.map((err: any) => `• ${err.field}: ${err.message}`).join('\n')
          alert('❌ Registration Failed:\n\n' + errorMessages)
        } else {
          alert('❌ ' + (response.message || 'Registration failed. Please try again.'))
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('❌ Network Error: Unable to connect to server.\n\nPlease ensure:\n1. Backend server is running on http://localhost:5000\n2. Your internet connection is active\n3. No firewall is blocking the connection')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Professional Registration Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop&q=80)',
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

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Welcome Content */}
          <div className="hidden md:block text-white">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
                  <span className="text-5xl">🚀</span>
                </div>
                <h1 className="text-5xl font-extrabold mb-4">
                  Join the Community
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Start sharing and learning from interview experiences
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Real Interview Experiences</h3>
                    <p className="text-blue-100">Access authentic stories from students at top companies</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Prepare Effectively</h3>
                    <p className="text-blue-100">Learn from detailed insights and success strategies</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Connect & Grow</h3>
                    <p className="text-blue-100">Build your network and help others succeed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 max-h-[85vh] overflow-y-auto">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Create Your Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="e.g., Rahul Kumar or Priya Sharma"
                />
                <p className="text-xs text-gray-500 mt-1">Your full name as per college records</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="your.email@gmail.com or college email"
                />
                <p className="text-xs text-gray-500 mt-1">Any valid email address is accepted</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Roll Number (Optional)
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="e.g., 21BCE1234 or 2021CS001"
                />
                <p className="text-xs text-gray-500 mt-1">Your college roll number or registration number</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  name="college"
                  required
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="e.g., IIT Delhi, VIT Vellore, BITS Pilani"
                />
                <p className="text-xs text-gray-500 mt-1">Your college or university name</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Degree *
                </label>
                <select
                  name="degree"
                  required
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select your degree</option>
                  {degrees.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>

              {formData.degree && (
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Course/Branch *
                  </label>
                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  >
                    <option value="">Select your course</option>
                    {availableCourses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              {formData.course === 'Other' && (
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    name="customCourse"
                    required
                    value={formData.customCourse}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="Enter your course name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Current Year *
                </label>
                <select
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select your current year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="At least 6 characters"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters required</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="Re-enter your password"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">⚠️ Passwords do not match</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-600 mt-1">✓ Passwords match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 font-bold hover:text-purple-600 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}