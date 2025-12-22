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
    sm: { container: 'w-10 h-10', icon: 'w-6 h-6', textContainer: 'ml-2', brand: 'text-base', tagline: 'text-[8px]' },
    md: { container: 'w-14 h-14', icon: 'w-8 h-8', textContainer: 'ml-3', brand: 'text-xl', tagline: 'text-[10px]' },
    lg: { container: 'w-20 h-20', icon: 'w-12 h-12', textContainer: 'ml-4', brand: 'text-3xl', tagline: 'text-xs' },
    xl: { container: 'w-32 h-32', icon: 'w-20 h-20', textContainer: 'ml-6', brand: 'text-5xl', tagline: 'text-base' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* Modern Icon Container */}
      <div className={`relative ${currentSize.container} ${animated ? 'group' : ''}`}>
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-purple-500 opacity-90 transition-all duration-300"
          style={{
            transform: animated ? 'rotate(-5deg)' : 'none',
            boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)'
          }}
        />
        
        {/* Inner Glow */}
        <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 transition-all duration-300" />
        
        {/* Floating Particles Effect */}
        {animated && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-400 animate-ping" style={{ animationDelay: '1s' }} />
          </>
        )}
        
        {/* Microphone Icon - Modern & Minimalist */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 32 32" 
            className={`${currentSize.icon} transition-transform duration-300 ${animated ? 'group-hover:scale-110' : ''}`}
            fill="none"
          >
            {/* Mic Body with Gradient */}
            <defs>
              <linearGradient id="micGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Sound Waves - Animated */}
            <g opacity="0.4">
              <path 
                d="M 4 14 Q 4 20 8 22" 
                stroke="url(#glowGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                className={animated ? 'animate-pulse' : ''}
              />
              <path 
                d="M 28 14 Q 28 20 24 22" 
                stroke="url(#glowGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                className={animated ? 'animate-pulse' : ''}
                style={{ animationDelay: '0.3s' }}
              />
              <path 
                d="M 2 13 Q 2 21 7 24" 
                stroke="url(#glowGradient)" 
                strokeWidth="1" 
                strokeLinecap="round"
                className={animated ? 'animate-pulse' : ''}
                style={{ animationDelay: '0.6s' }}
              />
              <path 
                d="M 30 13 Q 30 21 25 24" 
                stroke="url(#glowGradient)" 
                strokeWidth="1" 
                strokeLinecap="round"
                className={animated ? 'animate-pulse' : ''}
                style={{ animationDelay: '0.9s' }}
              />
            </g>
            
            {/* Mic Capsule */}
            <rect 
              x="12" 
              y="6" 
              width="8" 
              height="12" 
              rx="4" 
              fill="url(#micGradient)"
              stroke="#fef3c7"
              strokeWidth="0.5"
            />
            
            {/* Highlight */}
            <ellipse 
              cx="14" 
              cy="9" 
              rx="1.5" 
              ry="3" 
              fill="#fef3c7" 
              opacity="0.4"
            />
            
            {/* Mic Stand */}
            <line 
              x1="16" 
              y1="18" 
              x2="16" 
              y2="24" 
              stroke="url(#micGradient)" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Base */}
            <line 
              x1="11" 
              y1="24" 
              x2="21" 
              y2="24" 
              stroke="url(#micGradient)" 
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Center Glow */}
            <circle 
              cx="16" 
              cy="12" 
              r="3" 
              fill="#fbbf24" 
              opacity="0.2"
              className={animated ? 'animate-pulse' : ''}
            />
          </svg>
        </div>
        
        {/* Hover Glow Effect */}
        {animated && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        )}
      </div>

      {/* Brand Text */}
      {showText && (
        <div className={`flex flex-col ${currentSize.textContainer} leading-none`}>
          <div className={`font-black ${currentSize.brand} tracking-tight`}>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent bg-[length:200%_auto]">
              Ilumina
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]">
              Vox
            </span>
          </div>
          <span className={`${currentSize.tagline} text-gray-400 tracking-wide font-medium mt-0.5`}>
            AI Document Assistant
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

