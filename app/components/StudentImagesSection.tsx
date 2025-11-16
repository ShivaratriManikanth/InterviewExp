'use client'

export default function StudentImagesSection() {
  const activities = [
    { icon: '💼', title: 'Interview Experiences', subtitle: 'Real Stories', color: 'from-blue-400 to-blue-600' },
    { icon: '🎯', title: 'Company Insights', subtitle: 'Top Companies', color: 'from-purple-400 to-purple-600' },
    { icon: '📝', title: 'Share Your Story', subtitle: 'Help Others', color: 'from-green-400 to-green-600' },
    { icon: '🔍', title: 'Search & Filter', subtitle: 'Find Experiences', color: 'from-orange-400 to-orange-600' },
    { icon: '⭐', title: 'Success Tips', subtitle: 'Learn & Prepare', color: 'from-pink-400 to-pink-600' },
    { icon: '👥', title: 'Student Network', subtitle: 'Connect & Learn', color: 'from-cyan-400 to-cyan-600' },
    { icon: '📊', title: 'Interview Trends', subtitle: 'Stay Updated', color: 'from-indigo-400 to-indigo-600' }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Explore Interview Experiences
          </h2>
          <p className="text-base text-gray-600">
            Learn from real interview stories shared by students
          </p>
        </div>

        {/* Student Activities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className={`aspect-square bg-gradient-to-br ${activity.color} flex items-center justify-center p-4`}>
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">{activity.icon}</div>
                  <p className="font-bold text-sm">{activity.title}</p>
                  <p className="text-xs opacity-90">{activity.subtitle}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
