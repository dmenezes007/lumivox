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
    <div 
      className={`${currentSize.container} rounded-2xl p-4 flex items-center justify-center relative overflow-hidden shadow-2xl ${animated ? 'hover-lift' : ''} ${className}`}
      style={{
        background: 'linear-gradient(135deg, #9b6b3d 0%, #6b4fa3 50%, #4a3a7a 100%)',
        boxShadow: '0 20px 60px -15px rgba(155, 107, 61, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Animated Background Orbs */}
      {animated && (
        <>
          <div 
            className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-30 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(155, 107, 61, 0.6) 0%, transparent 70%)',
              animation: 'pulse-slow 3s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              background: 'radial-gradient(circle at 20% 80%, rgba(155, 107, 61, 0.4) 0%, transparent 50%)',
            }}
          />
        </>
      )}
      
      {/* Logo Content */}
      <div className="relative z-10 text-center">
        <div className={`font-bold text-white ${currentSize.text} tracking-tight drop-shadow-lg`}>
          LumiVox
        </div>
        {showIcon && (
          <Sparkles 
            className={`${currentSize.icon} text-amber-300 mx-auto mt-1 ${animated ? 'animate-pulse' : ''}`} 
          />
        )}
      </div>

      {/* Glossy Overlay */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default Logo;
