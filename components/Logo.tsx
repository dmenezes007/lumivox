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
    sm: { container: 'h-12 w-12', text: 'text-[6px]', bird: 'w-4 h-4' },
    md: { container: 'h-20 w-20', text: 'text-[10px]', bird: 'w-6 h-6' },
    lg: { container: 'h-28 w-28', text: 'text-xs', bird: 'w-8 h-8' },
    xl: { container: 'h-40 w-40', text: 'text-sm', bird: 'w-12 h-12' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center justify-center ${animated ? 'hover-lift' : ''} ${className}`}>
      <div className="relative">
        {/* Circular Badge Container */}
        <div className={`${currentSize.container} rounded-full relative overflow-hidden`}
             style={{
               background: 'linear-gradient(135deg, #E49B10 0%, #F5C344 50%, #E49B10 100%)',
               boxShadow: '0 8px 32px rgba(228, 155, 16, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.2)'
             }}>
          
          {/* Inner Circle Background */}
          <div className="absolute inset-[3px] rounded-full bg-white dark:bg-[#1a1625] flex items-center justify-center"
               style={{
                 boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.1)'
               }}>
            
            {/* Content Container */}
            <div className="flex flex-col items-center justify-center gap-0 relative z-10">
              {/* Bird Icon */}
              <svg 
                viewBox="0 0 100 100" 
                className={currentSize.bird}
                fill="none"
              >
                {/* Detailed bird */}
                <g transform="translate(50, 35)">
                  {/* Head */}
                  <ellipse cx="0" cy="0" rx="10" ry="12" fill="#3B2667" />
                  
                  {/* Eyes */}
                  <circle cx="-4" cy="-2" r="2" fill="white" />
                  <circle cx="4" cy="-2" r="2" fill="white" />
                  <circle cx="-3.5" cy="-2" r="1" fill="#E49B10" />
                  <circle cx="4.5" cy="-2" r="1" fill="#E49B10" />
                  
                  {/* Beak */}
                  <path d="M 0,-6 L -2,-8 L 2,-8 Z" fill="#E49B10" />
                  
                  {/* Body */}
                  <ellipse cx="0" cy="15" rx="14" ry="16" fill="#3B2667" />
                  
                  {/* Wings */}
                  <path d="M -10,10 Q -20,12 -22,18 Q -20,16 -12,14 Z" fill="#4B3677" />
                  <path d="M 10,10 Q 20,12 22,18 Q 20,16 12,14 Z" fill="#4B3677" />
                  
                  {/* Tail */}
                  <path d="M -4,28 L -6,35 L -2,32 Z" fill="#3B2667" />
                  <path d="M 4,28 L 6,35 L 2,32 Z" fill="#3B2667" />
                  <path d="M 0,28 L 0,36 Z" stroke="#3B2667" strokeWidth="2" />
                  
                  {/* Feet */}
                  <path d="M -6,30 L -6,34 M -6,34 L -8,35 M -6,34 L -4,35" stroke="#E49B10" strokeWidth="1" fill="none" />
                  <path d="M 6,30 L 6,34 M 6,34 L 8,35 M 6,34 L 4,35" stroke="#E49B10" strokeWidth="1" fill="none" />
                </g>
              </svg>

              {/* Text Labels */}
              {showText && (
                <div className="flex flex-col items-center leading-none mt-1">
                  <span className={`font-black ${currentSize.text} tracking-wider`}
                        style={{
                          color: '#3B2667',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          letterSpacing: '0.05em'
                        }}>
                    ILUMINA
                  </span>
                  <span className={`font-black ${currentSize.text} tracking-wider`}
                        style={{
                          background: 'linear-gradient(135deg, #E49B10 0%, #F5C344 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          letterSpacing: '0.05em'
                        }}>
                    VOX
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#E49B10] opacity-30 blur-lg animate-pulse" />
      </div>
    </div>
  );
};

export default Logo;

