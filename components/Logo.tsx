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
    sm: { container: 'h-12 w-12', text: 'text-[6px]', icon: 'w-5 h-5' },
    md: { container: 'h-20 w-20', text: 'text-[10px]', icon: 'w-8 h-8' },
    lg: { container: 'h-28 w-28', text: 'text-xs', icon: 'w-12 h-12' },
    xl: { container: 'h-40 w-40', text: 'text-sm', icon: 'w-16 h-16' }
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
              {/* Microphone Icon */}
              <svg 
                viewBox="0 0 24 24" 
                className={currentSize.icon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#3B2667' }}
              >
                {/* Microphone capsule */}
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="#3B2667" stroke="#E49B10" />
                
                {/* Sound waves left */}
                <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="#E49B10" strokeWidth="2.5" fill="none" />
                <path d="M3 9v3a9 9 0 0 0 18 0V9" stroke="#E49B10" strokeWidth="1.5" fill="none" opacity="0.6" />
                
                {/* Stand */}
                <line x1="12" y1="19" x2="12" y2="23" stroke="#3B2667" strokeWidth="2.5" />
                <line x1="8" y1="23" x2="16" y2="23" stroke="#3B2667" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Highlights on mic */}
                <ellipse cx="10.5" cy="4" rx="1" ry="2" fill="#E49B10" opacity="0.5" />
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

