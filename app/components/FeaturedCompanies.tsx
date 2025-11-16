'use client'

import { BuildingOfficeIcon } from '@heroicons/react/24/outline'

export default function FeaturedCompanies() {
  const companies = [
    { name: "Google", color: "from-red-500 to-yellow-500" },
    { name: "Microsoft", color: "from-blue-500 to-cyan-500" },
    { name: "Amazon", color: "from-orange-500 to-yellow-600" },
    { name: "Meta", color: "from-blue-600 to-purple-600" },
    { name: "Apple", color: "from-gray-700 to-gray-900" },
    { name: "Netflix", color: "from-red-600 to-red-700" },
    { name: "Adobe", color: "from-red-500 to-pink-600" },
    { name: "Salesforce", color: "from-blue-400 to-blue-600" },
    { name: "Oracle", color: "from-red-600 to-orange-600" },
    { name: "IBM", color: "from-blue-700 to-blue-900" },
    { name: "Intel", color: "from-blue-500 to-blue-700" },
    { name: "Cisco", color: "from-blue-600 to-cyan-600" }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <BuildingOfficeIcon className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-900">Featured Companies</span>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Read authentic interview experiences from students at leading companies.
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {companies.map((company, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 hover:border-blue-400 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${company.color} rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform`}>
                <span className="text-white font-bold text-sm">{company.name.charAt(0)}</span>
              </div>
              <div className="text-center font-bold text-gray-800 text-xs group-hover:text-blue-600 transition-colors">
                {company.name}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-extrabold text-blue-600 mb-1">15+</div>
              <div className="text-gray-600 font-medium text-sm">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-purple-600 mb-1">50+</div>
              <div className="text-gray-600 font-medium text-sm">Experiences</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-green-600 mb-1">30+</div>
              <div className="text-gray-600 font-medium text-sm">Roles</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600 mb-1">100+</div>
              <div className="text-gray-600 font-medium text-sm">Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
