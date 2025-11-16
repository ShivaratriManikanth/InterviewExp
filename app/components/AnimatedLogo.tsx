'use client'

export default function AnimatedLogo({ size = 'normal' }: { size?: 'small' | 'normal' | 'large' }) {
  const sizeClasses = {
    small: 'w-11 h-11',
    normal: 'w-16 h-16',
    large: 'w-24 h-24'
  }

  const textSizeClasses = {
    small: 'text-xl',
    normal: 'text-3xl',
    large: 'text-5xl'
  }

  return (
    <div className={`${sizeClasses[size]} relative group cursor-pointer`}>
      {/* Animated rotating ring */}
      <div className="absolute inset-0 rounded-2xl animate-spin-slow opacity-75">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl blur-sm"></div>
      </div>
      
      {/* Pulsing glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
      
      {/* Main logo container with professional design */}
      <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/50">
        {/* Animated gradient text with professional styling */}
        <div className="relative">
          <span className={`${textSizeClasses[size]} font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x tracking-tight`}>
            IE
          </span>
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-shine"></div>
        </div>
      </div>

      {/* Professional orbiting elements */}
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-bounce"></div>
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full shadow-md animate-pulse" style={{ animationDelay: '0.25s' }}></div>
    </div>
  )
}
