import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  animated = true,
  className = '' 
}) => {
  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'w-8 h-8', textContainer: 'ml-2.5', brand: 'text-lg', tagline: 'text-[9px]' },
    md: { container: 'w-16 h-16', icon: 'w-11 h-11', textContainer: 'ml-3', brand: 'text-2xl', tagline: 'text-[11px]' },
    lg: { container: 'w-24 h-24', icon: 'w-16 h-16', textContainer: 'ml-4', brand: 'text-4xl', tagline: 'text-sm' },
    xl: { container: 'w-40 h-40', icon: 'w-28 h-28', textContainer: 'ml-6', brand: 'text-6xl', tagline: 'text-lg' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Bento Grid Inspired Icon */}
      <div className={`relative ${currentSize.container} ${animated ? 'group' : ''}`}>
        {/* Subtle Glow */}
        {animated && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/10 to-amber-600/10 blur-lg" />
        )}
        
        {/* Main Container with Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[2px]">
          <div className="absolute inset-[2px] rounded-2xl bg-slate-900" />
        </div>
        
        {/* Bento Grid Content */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <svg 
            viewBox="0 0 100 100" 
            className={`${currentSize.icon} transition-transform duration-300 ${animated ? 'group-hover:scale-105' : ''}`}
            fill="none"
          >
            <defs>
              <linearGradient id="card1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="card2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="card3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            
            {/* Bento Grid Layout - 3 Cards */}
            
            {/* Large Card Top */}
            <rect 
              x="10" 
              y="10" 
              width="80" 
              height="35" 
              rx="8"
              fill="url(#card1)"
              className={animated ? 'animate-pulse' : ''}
              style={{ animationDuration: '3s', animationDelay: '0s' }}
            >
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Small Card Bottom Left */}
            <rect 
              x="10" 
              y="55" 
              width="35" 
              height="35" 
              rx="8"
              fill="url(#card2)"
              className={animated ? 'animate-pulse' : ''}
              style={{ animationDuration: '3s', animationDelay: '1s' }}
            >
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur="3s"
                begin="1s"
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Small Card Bottom Right */}
            <rect 
              x="55" 
              y="55" 
              width="35" 
              height="35" 
              rx="8"
              fill="url(#card3)"
              className={animated ? 'animate-pulse' : ''}
              style={{ animationDuration: '3s', animationDelay: '2s' }}
            >
              <animate
                attributeName="opacity"
                values="0.85;1;0.85"
                dur="3s"
                begin="2s"
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Decorative Elements */}
            {/* Document lines in top card */}
            <line x1="20" y1="20" x2="60" y2="20" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <line x1="20" y1="27" x2="70" y2="27" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <line x1="20" y1="34" x2="55" y2="34" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            
            {/* Icon in bottom left card */}
            <circle cx="27.5" cy="72.5" r="8" fill="#1e293b" opacity="0.2" />
            
            {/* Icon in bottom right card */}
            <circle cx="72.5" cy="72.5" r="8" fill="#1e293b" opacity="0.2" />
            
            {/* Sparkle accent */}
            {animated && (
              <>
                <circle cx="85" cy="15" r="2" fill="#fef3c7" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="15" cy="85" r="2" fill="#fef3c7" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="2s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className={`flex flex-col ${currentSize.textContainer} leading-none`}>
          <div className={`font-black ${currentSize.brand} tracking-tight`}>
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Ilumina
            </span>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Vox
            </span>
          </div>
          <span className={`${currentSize.tagline} text-gray-400 tracking-wider font-light mt-0.5 uppercase`}>
            Assistente Inteligente
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

