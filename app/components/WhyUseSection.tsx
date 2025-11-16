'use client'

import { 
  AcademicCapIcon, 
  LightBulbIcon, 
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export default function WhyUseSection() {
  const reasons = [
    {
      icon: AcademicCapIcon,
      title: "Evidence-Based Learning",
      description: "Read real interview experiences from students who got jobs at top companies.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: LightBulbIcon,
      title: "Comprehensive Insights",
      description: "Learn about interview questions, process, difficulty level, and tips to succeed.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: UserGroupIcon,
      title: "Professional Networking",
      description: "Connect with other students and get advice from those who already cleared interviews.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: ClockIcon,
      title: "Efficient Preparation",
      description: "Optimize your preparation strategy by focusing on high-impact areas identified through collective experience analysis.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: ShieldCheckIcon,
      title: "Verified Content",
      description: "All experiences are contributed by authenticated students. We maintain strict quality standards with no sponsored content.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: TrophyIcon,
      title: "Proven Results",
      description: "Students utilizing our platform demonstrate measurably higher success rates in securing interview offers.",
      color: "from-pink-500 to-pink-600"
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">InterviewExp?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A professional platform designed to optimize your interview preparation through data-driven insights and peer collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
