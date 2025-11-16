'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { experienceAPI, utils } from '../lib/api'
import { User } from '../types/api'
import { BuildingOfficeIcon, BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline'

interface CompanyExperienceCount {
  companyId: string
  companyName: string
  companySlug: string
  companyLogo?: string
  companyTier: string
  companyCategory: string
  experienceCount: number
  internshipCount: number
  fullTimeCount: number
  selectedCount: number
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [companies, setCompanies] = useState<CompanyExperienceCount[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedBranch, setSelectedBranch] = useState<string>('all')

  useEffect(() => {
    if (!utils.isAuthenticated()) {
      router.push('/login')
      return
    }

    const userData = utils.getUser()
    setUser(userData)
  }, [router])

  useEffect(() => {
    if (user) {
      loadCompanyExperiences()
    }
  }, [user])

  const loadCompanyExperiences = async () => {
    try {
      setLoading(true)
      const response = await experienceAPI.getExperiences({ 
        limit: 1000,
        status: 'approved'
      })

      console.log('Dashboard - Total approved experiences:', response.data?.experiences?.length)

      if (response.success && response.data) {
        // Show all experiences without college filtering
        const filteredExperiences = response.data.experiences
        
        const companyMap = new Map<string, CompanyExperienceCount>()
        
        filteredExperiences.forEach((exp: any) => {
          if (!exp.companies) {
            console.log('Dashboard - Experience without company:', exp.id)
            return
          }
          
          const companyId = exp.companies.id
          if (!companyMap.has(companyId)) {
            companyMap.set(companyId, {
              companyId,
              companyName: exp.companies.name,
              companySlug: exp.companies.slug,
              companyLogo: exp.companies.logo_url,
              companyTier: exp.companies.tier || 'Other',
              companyCategory: exp.companies.category || 'Other',
              experienceCount: 0,
              internshipCount: 0,
              fullTimeCount: 0,
              selectedCount: 0
            })
          }
          
          const company = companyMap.get(companyId)!
          company.experienceCount++
          
          if (exp.experience_type === 'Internship') {
            company.internshipCount++
          } else if (exp.experience_type === 'Full-Time') {
            company.fullTimeCount++
          }
          
          if (exp.result === 'Selected') {
            company.selectedCount++
          }
        })
        
        const companiesArray = Array.from(companyMap.values())
          .sort((a, b) => b.experienceCount - a.experienceCount)
        
        console.log('Dashboard - Companies found:', companiesArray.length)
        setCompanies(companiesArray)
      }
    } catch (error) {
      console.error('Error loading experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredCompanies = () => {
    return companies.filter(company => {
      const matchesSearch = company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      // Year and Branch filters will be implemented when backend supports filtering by experience year and user branch
      return matchesSearch
    })
  }

  const getTierBadge = (tier: string) => {
    const badges: any = {
      'FAANG': { bg: 'bg-orange-100', text: 'text-orange-700', label: '⭐ FAANG', border: 'border-orange-300' },
      'Tier 1': { bg: 'bg-green-100', text: 'text-green-700', label: '🏆 Tier 1', border: 'border-green-300' },
      'Tier 2': { bg: 'bg-blue-100', text: 'text-blue-700', label: '💼 Tier 2', border: 'border-blue-300' },
      'Unicorn': { bg: 'bg-purple-100', text: 'text-purple-700', label: '🦄 Unicorn', border: 'border-purple-300' },
      'Startup': { bg: 'bg-pink-100', text: 'text-pink-700', label: '🚀 Startup', border: 'border-pink-300' }
    }
    // Don't show badge for "Other" or unspecified tiers
    if (!tier || tier === 'Other' || tier === 'Unspecified') {
      return null
    }
    return badges[tier] || { bg: 'bg-gray-100', text: 'text-gray-700', label: tier, border: 'border-gray-300' }
  }

  const filteredCompanies = getFilteredCompanies()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Professional Dashboard Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&q=80)',
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
      
      {/* Hero Section with Professional Background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        {/* Professional Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.5) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Welcome back, <span className="text-blue-300">{user?.name}</span>
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                Explore interview experiences from your college community
              </p>
              {user?.college && (
                <div className="inline-flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <BuildingOfficeIcon className="w-5 h-5 mr-2 text-white" />
                  <span className="text-white font-semibold">{user.college}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => loadCompanyExperiences()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-12">
        {/* Stats Overview */}

        {/* Stats Overview - Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BuildingOfficeIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Companies</p>
                <p className="text-4xl font-bold text-gray-900">{companies.length}</p>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-gray-100">
              <p className="text-sm text-gray-600">Total companies with experiences</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BriefcaseIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Experiences</p>
                <p className="text-4xl font-bold text-gray-900">
                  {companies.reduce((sum, c) => sum + c.experienceCount, 0)}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-gray-100">
              <p className="text-sm text-gray-600">Shared by your peers</p>
            </div>
          </div>
          
          <div className="group bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Success Stories</p>
                <p className="text-4xl font-bold text-gray-900">
                  {companies.reduce((sum, c) => sum + c.selectedCount, 0)}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-gray-100">
              <p className="text-sm text-gray-600">Students got selected</p>
            </div>
          </div>
        </div>

        {/* Filters - Professional Design */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Find Companies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Search Companies</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by company name..."
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="all">All Branches</option>
                <option value="CSE">CSE</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EEE">Electrical Engineering</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
                <option value="AIML">AI & ML</option>
              </select>
            </div>
          </div>
          
          {(searchQuery || selectedYear !== 'all' || selectedBranch !== 'all') && (
            <div className="mt-6 flex items-center justify-between pt-6 border-t-2 border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-700 font-medium">
                  Showing <span className="font-bold text-blue-600 text-lg">{filteredCompanies.length}</span> of <span className="font-semibold">{companies.length}</span> companies
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedYear('all')
                  setSelectedBranch('all')
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-white hover:bg-blue-600 border-2 border-blue-600 rounded-lg font-semibold transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Company Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-xl border-2 border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedYear('all')
                setSelectedBranch('all')
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => {
              const tierBadge = getTierBadge(company.companyTier)
              return (
                <Link
                  key={company.companyId}
                  href={`/company/${company.companySlug}`}
                  className="group bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
                >
                  {/* Company Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-md">
                      {company.companyName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1 break-words group-hover:text-blue-600 transition-colors line-clamp-2">
                        {company.companyName}
                      </h3>
                      {tierBadge && (
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${tierBadge.bg} ${tierBadge.text}`}>
                          {tierBadge.label}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Stats Section - Compact */}
                  <div className="space-y-2">
                    {/* Total Experiences */}
                    <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                      <span className="text-xs text-gray-700 font-medium">Total</span>
                      <span className="text-lg font-bold text-blue-600">{company.experienceCount}</span>
                    </div>
                    
                    {/* Internships & Full-Time */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-600 font-medium mb-0.5">Internships</p>
                        <p className="text-lg font-bold text-green-700">{company.internshipCount}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-600 font-medium mb-0.5">Full-Time</p>
                        <p className="text-lg font-bold text-orange-700">{company.fullTimeCount}</p>
                      </div>
                    </div>
                    
                    {/* Success Rate */}
                    <div className="bg-purple-50 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 font-medium">Success Rate</p>
                        <span className="text-base font-bold text-purple-600">
                          {company.experienceCount > 0 
                            ? Math.round((company.selectedCount / company.experienceCount) * 100)
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-blue-600 group-hover:text-purple-600 transition-colors">
                      <span className="font-semibold text-xs">View Experiences</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

