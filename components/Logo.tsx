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
      {/* Icon in Rounded Rectangle */}
      <div className={`relative ${currentSize.container} ${animated ? 'group' : ''}`}>
        {/* Outer Glow */}
        {animated && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-600/20 blur-md animate-pulse" />
        )}
        
        {/* Main Rectangle with Gradient */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-xl transition-all duration-300" />
        
        {/* Icon Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 64 64" 
            className={`${currentSize.icon} transition-transform duration-300 ${animated ? 'group-hover:scale-110' : ''}`}
            fill="none"
          >
            <defs>
              <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
            
            {/* Simple Document Icon */}
            <g transform="translate(16, 8)">
              {/* Document Background */}
              <rect 
                x="0" 
                y="0" 
                width="32" 
                height="44" 
                rx="2"
                fill="url(#iconGradient)"
                stroke="#475569"
                strokeWidth="1.5"
              />
              
              {/* Document Lines */}
              <line x1="6" y1="10" x2="26" y2="10" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="16" x2="26" y2="16" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="22" x2="22" y2="22" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="28" x2="24" y2="28" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="34" x2="20" y2="34" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Sparkle/Star accent */}
              <circle cx="16" y="5" r="2" fill="#fbbf24" opacity="0.8" />
              <path 
                d="M 16 3 L 16 7 M 14 5 L 18 5" 
                stroke="#fef3c7" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
            </g>
            
            {/* Animated Sparkles */}
            {animated && (
              <g opacity="0.6">
                <circle cx="8" cy="32" r="1.5" fill="#fbbf24" className="animate-ping" />
                <circle cx="56" cy="32" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDelay: '0.5s' }} />
              </g>
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

