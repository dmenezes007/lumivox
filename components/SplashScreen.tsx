import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0F0A1F] via-[#1a1332] to-[#2d1b4e] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-amber-500/10 rounded-full blur-[100px] animate-spin-slow" />
      </div>

      {/* Logo and Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo Container */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-purple-600" />
          </div>
          <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-purple-600 flex items-center justify-center shadow-2xl hover-lift">
            <img 
              src="/logo.svg" 
              alt="LumiVox" 
              className="w-20 h-20 animate-float"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">
              LumiVox
            </span>
          </h1>
          <p className="text-lg text-gray-400 font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            AI Document Assistant
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-3">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">{progress}%</p>
        </div>

        {/* Loading Text */}
        <div className="text-gray-500 text-sm font-medium animate-pulse">
          Carregando experiência premium...
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
