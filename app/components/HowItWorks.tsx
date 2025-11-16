'use client'

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Browse Experiences",
      description: "Search and read real interview experiences shared by students from top companies.",
      icon: "🔍",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "2",
      title: "Learn & Prepare",
      description: "Understand interview patterns, questions asked, and tips to crack your dream job.",
      icon: "📚",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "3",
      title: "Share Your Story",
      description: "After your interview, share your experience to help other students prepare better.",
      icon: "✍️",
      color: "from-green-500 to-green-600"
    },
    {
      number: "4",
      title: "Get Placed",
      description: "Use insights from the community to ace your interviews and land your dream job.",
      icon: "🎯",
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to prepare for your dream job interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Step Number Badge */}
              <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">{step.number}</span>
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{step.icon}</div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
