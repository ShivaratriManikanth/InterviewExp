'use client'

export default function StudentHeroImages() {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Empowering Students Nationwide
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of students preparing for successful careers
          </p>
        </div>

        {/* Professional Student Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Student 1 - Professional Study */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
              {/* Placeholder for real image */}
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm">Collaborative Learning</p>
                  <p className="text-xs opacity-90">Group Study Sessions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student 2 - Interview Preparation */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=500&fit=crop" 
                alt="Student preparing" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm">Focused Preparation</p>
                  <p className="text-xs opacity-90">Individual Study</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student 3 - Campus Success */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/5] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=500&fit=crop" 
                alt="Campus life" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm">Campus Excellence</p>
                  <p className="text-xs opacity-90">Academic Success</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student 4 - Achievement */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/5] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop" 
                alt="Student achievement" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm">Career Success</p>
                  <p className="text-xs opacity-90">Placement Achievement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">Verified Students</p>
              <p className="text-xs text-gray-600">Authentic Community</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">🎓</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">Top Institutions</p>
              <p className="text-xs text-gray-600">Leading Colleges</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">🏆</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">Success Stories</p>
              <p className="text-xs text-gray-600">Proven Results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
