'use client'

import { useState, useEffect } from 'react'
import { ClockIcon, BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Experience {
  id: number | string
  company: string
  role: string
  author: string
  college: string
  date: string
  excerpt: string
  difficulty: string
  result: string
  companyColor: string
}

export default function RecentExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/experiences?limit=6')
      const data = await response.json()
      
      if (data.success) {
        // Transform API data to match component format
        const transformedExperiences = data.data.experiences.map((exp: any) => ({
          id: exp.id,
          company: exp.companies?.name || 'Unknown Company',
          role: exp.role,
          author: exp.users?.name || 'Anonymous',
          college: exp.users?.college || 'Not Specified',
          date: getRelativeTime(exp.created_at),
          excerpt: `${exp.experience_type} position. Result: ${exp.result}. ${exp.location ? `Location: ${exp.location}` : ''}`,
          difficulty: 'Medium', // Default since API doesn't provide this
          result: exp.result,
          companyColor: getCompanyColor(exp.companies?.name)
        }))
        setExperiences(transformedExperiences)
      }
    } catch (error) {
      console.error('Error fetching experiences:', error)
      // Fallback to hardcoded data if API fails
      setExperiences(fallbackExperiences)
    } finally {
      setLoading(false)
    }
  }

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return '1 day ago'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 14) return '1 week ago'
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const getCompanyColor = (companyName: string) => {
    const colors: { [key: string]: string } = {
      'Google': 'from-red-500 to-yellow-500',
      'Microsoft': 'from-blue-500 to-cyan-500',
      'Amazon': 'from-orange-500 to-yellow-600',
      'Infosys': 'from-blue-600 to-blue-800',
      'Capgemini': 'from-blue-500 to-purple-600',
    }
    return colors[companyName] || 'from-gray-600 to-gray-800'
  }

  const fallbackExperiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      author: "Rahul Kumar",
      college: "IIT Delhi",
      date: "2 days ago",
      excerpt: "Had 3 rounds - coding, system design, and behavioral. The coding round focused on DSA problems including graphs and dynamic programming...",
      difficulty: "Hard",
      result: "Selected",
      companyColor: "from-red-500 to-yellow-500"
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE Intern",
      author: "Priya Sharma",
      college: "BITS Pilani",
      date: "5 days ago",
      excerpt: "The interview process was smooth. Started with an online assessment followed by 2 technical rounds. Questions were mainly on arrays and strings...",
      difficulty: "Medium",
      result: "Selected",
      companyColor: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      company: "Amazon",
      role: "SDE-1",
      author: "Arjun Patel",
      college: "NIT Trichy",
      date: "1 week ago",
      excerpt: "4 rounds total including 1 HR round. Technical rounds covered data structures, algorithms, and Amazon's leadership principles...",
      difficulty: "Medium",
      result: "Selected",
      companyColor: "from-orange-500 to-yellow-600"
    },
    {
      id: 4,
      company: "Flipkart",
      role: "Software Developer",
      author: "Sneha Reddy",
      college: "VIT Vellore",
      date: "1 week ago",
      excerpt: "Great experience! 2 coding rounds and 1 managerial round. Focus was on problem-solving and system design basics...",
      difficulty: "Medium",
      result: "Selected",
      companyColor: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      company: "Adobe",
      role: "Software Engineer",
      author: "Vikram Singh",
      college: "DTU Delhi",
      date: "2 weeks ago",
      excerpt: "The interview was challenging but fair. Questions ranged from basic DSA to advanced algorithms. Also had a design round...",
      difficulty: "Hard",
      result: "Selected",
      companyColor: "from-red-500 to-pink-600"
    },
    {
      id: 6,
      company: "Swiggy",
      role: "Backend Developer",
      author: "Ananya Gupta",
      college: "NSUT Delhi",
      date: "2 weeks ago",
      excerpt: "Focused on backend technologies and system design. Asked about scalability, databases, and API design patterns...",
      difficulty: "Medium",
      result: "Selected",
      companyColor: "from-orange-500 to-red-500"
    }
  ]

  if (loading) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            Recent Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experiences</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Learn from real interview experiences shared by students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((exp) => (
            <div 
              key={exp.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Company Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${exp.companyColor} rounded-lg flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-base">{exp.company.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base">{exp.company}</h3>
                  <p className="text-xs text-gray-600">{exp.role}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  exp.result === 'Selected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {exp.result}
                </span>
              </div>

              {/* Excerpt */}
              <p className="text-gray-700 text-xs mb-3 line-clamp-2">
                {exp.excerpt}
              </p>

              {/* Metadata */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <UserIcon className="w-3 h-3" />
                  <span>{exp.author} • {exp.college}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    <ClockIcon className="w-3 h-3" />
                    <span>{exp.date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    exp.difficulty === 'Hard' ? 'bg-red-100 text-red-700' : 
                    exp.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {exp.difficulty}
                  </span>
                </div>
              </div>

              {/* Read More Button */}
              <Link 
                href="/login"
                className="block w-full text-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Read Full Experience
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            href="/login"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base hover:shadow-xl hover:scale-105 transition-all"
          >
            View All Experiences
          </Link>
        </div>
      </div>
    </section>
  )
}
