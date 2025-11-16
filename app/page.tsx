'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import StudentImagesSection from './components/StudentImagesSection'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import RecentExperiences from './components/RecentExperiences'
import FeaturedCompanies from './components/FeaturedCompanies'
import WhyUseSection from './components/WhyUseSection'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <RecentExperiences />
      <FeaturedCompanies />
      <WhyUseSection />
      <StudentImagesSection />
    </div>
  )
}