import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import Logo from './Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0F0A1F] via-[#1a1332] to-[#2d1b4e] transition-all duration-800 ${isClicked ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} overflow-hidden`}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, #e49b10, #fbbf24)' 
                : 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
              opacity: 0.4 + Math.random() * 0.6,
              boxShadow: i % 2 === 0 
                ? '0 0 20px rgba(228, 155, 16, 0.5)' 
                : '0 0 20px rgba(139, 92, 246, 0.5)'
            }}
          />
        ))}
        
        {/* Large Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center space-y-12 transition-all duration-500 ${isClicked ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Logo with Dynamic Glow */}
        <div className="flex justify-center">
          <div className={`relative transition-all duration-700 ${isHovering ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}>
            {/* Rotating Glow Ring */}
            <div className={`absolute inset-0 transition-all duration-700 ${isHovering ? 'blur-3xl opacity-80' : 'blur-2xl opacity-50'}`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 animate-spin-slow" />
            </div>
            
            {/* Logo Component */}
            <div className="relative">
              <Logo size="xl" animated={true} />
            </div>
          </div>
        </div>

        {/* Title with Enhanced Gradient */}
        <div className="space-y-4">
          <h1 className="text-7xl font-black tracking-tight">
            <span className="inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              LumiVox
            </span>
          </h1>
          <p className="text-2xl text-gray-300 font-light flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            AI-Powered Document Intelligence
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </p>
        </div>

        {/* Creative Dynamic Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            disabled={isClicked}
            className="group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity animate-gradient-border bg-[length:200%_auto]" />
            <div className={`absolute inset-[3px] bg-gradient-to-br from-[#1a1332] to-[#2d1b4e] rounded-2xl transition-all duration-300 ${isHovering ? 'inset-[4px]' : 'inset-[3px]'}`} />
            
            {/* Button Content */}
            <div className="relative px-14 py-6 flex items-center gap-4">
              {/* Left Icon with Spark Effect */}
              <div className="relative">
                <Zap className={`w-7 h-7 text-amber-400 transition-all duration-500 ${isHovering ? 'rotate-12 scale-125' : 'rotate-0 scale-100'}`} />
                {isHovering && (
                  <div className="absolute inset-0 blur-xl bg-amber-400 opacity-50 animate-ping" />
                )}
              </div>
              
              {/* Text with Gradient */}
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                Começar Agora
              </span>
              
              {/* Right Arrow with Motion */}
              <ArrowRight className={`w-7 h-7 text-purple-400 transition-all duration-500 ${isHovering ? 'translate-x-3 scale-110' : 'translate-x-0 scale-100'}`} />
            </div>

            {/* Hover Ripple Effect */}
            {isHovering && (
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-amber-400/30 to-purple-500/30 animate-pulse" />
              </div>
            )}
          </button>
        </div>

        {/* Call to Action */}
        <div className="pt-4 space-y-2">
          <p className={`text-sm font-medium transition-all duration-300 ${isHovering ? 'text-amber-300 scale-105' : 'text-gray-400'}`}>
            {isHovering ? '✨ Clique para descobrir o poder da IA' : 'Passe o mouse e clique para continuar'}
          </p>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full bg-amber-400 transition-all duration-300 ${isHovering ? 'opacity-100 scale-150' : 'opacity-30'}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(15px) rotate(5deg); }
          50% { transform: translateY(-50px) translateX(-15px) rotate(-5deg); }
          75% { transform: translateY(-30px) translateX(10px) rotate(3deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        
        .animate-gradient-border {
          animation: gradient-border 3s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
