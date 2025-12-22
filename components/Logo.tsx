import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showIcon = true,
  animated = true,
  className = '' 
}) => {
  const sizes = {
    sm: {
      container: 'w-12 h-12',
      text: 'text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      container: 'w-16 h-16',
      text: 'text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      container: 'w-24 h-24',
      text: 'text-lg',
      icon: 'w-5 h-5'
    },
    xl: {
      container: 'w-32 h-32',
      text: 'text-2xl',
      icon: 'w-6 h-6'
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={`${currentSize.container} flex items-center justify-center relative ${animated ? 'hover-lift' : ''} ${className}`}>
      <img 
        src="/iluminavox-logo.svg" 
        alt="IluminaVox" 
        className="w-full h-full object-contain drop-shadow-xl"
      />
      
      {/* Glossy Overlay */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
        }}
      />
    </div>
  );
};

export default Logo;

