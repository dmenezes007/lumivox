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
      {/* Elegant Icon - Book + Light Bulb Concept */}
      <div className={`relative ${currentSize.container} ${animated ? 'group' : ''}`}>
        {/* Outer Glow */}
        {animated && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-purple-500/20 blur-xl animate-pulse" />
        )}
        
        {/* Main Icon Circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-2xl transition-all duration-300" />
        
        {/* Icon Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 64 64" 
            className={`${currentSize.icon} transition-transform duration-300 ${animated ? 'group-hover:scale-110' : ''}`}
            fill="none"
          >
            <defs>
              <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="lightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            
            {/* Open Book Base */}
            <path 
              d="M 16 36 L 16 48 C 16 48 24 44 32 44 C 40 44 48 48 48 48 L 48 36 C 48 36 40 32 32 32 C 24 32 16 36 16 36 Z"
              fill="url(#bookGradient)"
              stroke="#475569"
              strokeWidth="1"
            />
            
            {/* Book Pages Left */}
            <path 
              d="M 16 36 C 16 36 24 32 32 32 L 32 44 C 24 44 16 48 16 48 Z"
              fill="#64748b"
              opacity="0.3"
            />
            
            {/* Book Center Line */}
            <line 
              x1="32" 
              y1="32" 
              x2="32" 
              y2="48" 
              stroke="#1e293b" 
              strokeWidth="1.5"
            />
            
            {/* Light Bulb Above Book */}
            <g transform="translate(32, 10)">
              {/* Bulb Glass */}
              <circle 
                cx="0" 
                cy="0" 
                r="10" 
                fill="url(#lightGradient)"
                opacity="0.9"
              />
              
              {/* Bulb Shine */}
              <ellipse 
                cx="-3" 
                cy="-3" 
                rx="4" 
                ry="6" 
                fill="#ffffff" 
                opacity="0.5"
              />
              
              {/* Bulb Base */}
              <rect 
                x="-4" 
                y="10" 
                width="8" 
                height="4" 
                rx="1"
                fill="#64748b"
              />
              
              {/* Connection to Book */}
              <line 
                x1="0" 
                y1="14" 
                x2="0" 
                y2="22" 
                stroke="#fbbf24" 
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              
              {/* Light Rays */}
              <g opacity="0.5" className={animated ? 'animate-pulse' : ''}>
                <line x1="-12" y1="-8" x2="-16" y2="-12" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="-8" x2="16" y2="-12" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                <line x1="-14" y1="0" x2="-18" y2="0" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="0" x2="18" y2="0" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              </g>
            </g>
            
            {/* Sparkles */}
            {animated && (
              <g opacity="0.7">
                <circle cx="12" cy="28" r="1.5" fill="#fbbf24" className="animate-ping" />
                <circle cx="52" cy="28" r="1.5" fill="#a78bfa" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                <circle cx="32" cy="52" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDelay: '1s' }} />
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

