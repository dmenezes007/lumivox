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
    sm: { container: 'h-12', text: 'text-sm', bird: 'w-14 h-14' },
    md: { container: 'h-16', text: 'text-lg', bird: 'w-20 h-20' },
    lg: { container: 'h-20', text: 'text-2xl', bird: 'w-24 h-24' },
    xl: { container: 'h-32', text: 'text-4xl', bird: 'w-36 h-36' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${animated ? 'hover-lift' : ''} ${className}`}>
      <div className="relative">
        {/* Double Circle Border - Golden outer, Purple inner */}
        <div className={`${currentSize.bird} rounded-full p-[3px] bg-gradient-to-br from-[#E49B10] to-[#F5C344] shadow-xl`}>
          <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-[#3B2667] to-[#4B3677] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#1a1625] flex items-center justify-center">
              {/* Bird SVG */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-[60%] h-[60%]"
                fill="#3B2667"
              >
                {/* Simplified bird silhouette */}
                <path d="M45 25 L55 20 L52 25 L50 25 Z" />
                <ellipse cx="50" cy="35" rx="8" ry="6" />
                <path d="M42 35 C42 35 38 32 35 33 C32 34 30 36 30 39 C30 42 32 44 35 44 L42 44 Z" />
                <path d="M58 35 C58 35 62 32 65 33 C68 34 70 36 70 39 C70 42 68 44 65 44 L58 44 Z" />
                <path d="M50 40 C50 40 46 42 43 48 L43 65 C43 68 44 70 47 70 L53 70 C56 70 57 68 57 65 L57 48 C54 42 50 40 50 40 Z" />
                <ellipse cx="50" cy="58" rx="6" ry="10" />
                <path d="M44 70 L44 75 L40 80 L43 76 L44 75 Z" />
                <path d="M56 70 L56 75 L60 80 L57 76 L56 75 Z" />
                <circle cx="47" cy="33" r="1.5" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#E49B10] opacity-20 blur-xl animate-pulse" />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className={`flex flex-col leading-none ${currentSize.container}`}>
          <span className={`font-black ${currentSize.text} tracking-tight bg-gradient-to-r from-[#E49B10] to-[#F5C344] bg-clip-text text-transparent drop-shadow-sm`}>
            ILUMINA
          </span>
          <span className={`font-black ${currentSize.text} tracking-tight text-[#3B2667] dark:text-[#8B7BB8] drop-shadow-sm -mt-1`}>
            VOX
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

