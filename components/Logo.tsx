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
    sm: { height: 'h-8', text: 'text-sm' },
    md: { height: 'h-12', text: 'text-base' },
    lg: { height: 'h-16', text: 'text-xl' },
    xl: { height: 'h-24', text: 'text-3xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${animated ? 'hover-lift' : ''} ${className}`}>
      {/* Bird Icon with Golden Circle */}
      <div className="relative">
        <div className={`${currentSize.height} aspect-square rounded-full bg-gradient-to-br from-[#E49B10] to-[#F5C344] flex items-center justify-center shadow-lg`}>
          <svg 
            viewBox="0 0 100 100" 
            className="w-3/5 h-3/5"
            fill="currentColor"
          >
            <path 
              d="M70 40 L80 25 L75 40 L70 40 Z M65 42 C65 42 60 35 55 32 C50 29 45 28 40 30 C35 32 32 37 32 42 C32 47 35 52 40 54 L40 70 C40 73 42 75 45 75 L55 75 C58 75 60 73 60 70 L60 54 C65 52 68 47 68 42 Z M42 65 L42 55 C42 55 40 54 40 52 C40 50 42 49 42 49 L58 49 C58 49 60 50 60 52 C60 54 58 55 58 55 L58 65 Z" 
              fill="#3B2667"
              className="drop-shadow-md"
            />
          </svg>
        </div>
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#E49B10] opacity-20 blur-xl animate-pulse" />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold ${currentSize.text} bg-gradient-to-r from-[#E49B10] to-[#F5C344] bg-clip-text text-transparent`}>
            ILUMINA
          </span>
          <span className={`font-bold ${currentSize.text} text-[#3B2667] dark:text-[#8B7BB8]`}>
            MIND
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

