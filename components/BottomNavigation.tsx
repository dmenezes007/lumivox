import React from 'react';
import { 
  Home,
  Languages, 
  BookOpen, 
  Lightbulb, 
  Volume2, 
  BarChart3
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface BottomNavigationProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  className?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeView = 'home', 
  onViewChange,
  className
}) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'translate', icon: Languages, label: 'Tradução' },
    { id: 'summary', icon: BookOpen, label: 'Resumo' },
    { id: 'insights', icon: Lightbulb, label: 'Insights' },
    { id: 'audio', icon: Volume2, label: 'Áudio' },
    { id: 'analytics', icon: BarChart3, label: 'Análises' },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-md border-t border-border shadow-2xl z-[100] md:hidden",
      className
    )}>
      <div className="h-full flex items-center justify-around px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange?.(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[56px]",
                isActive 
                  ? "text-[#E49B10] scale-110" 
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all",
                isActive && "drop-shadow-[0_0_8px_rgba(228,155,16,0.5)]"
              )} />
              <span className={cn(
                "text-[10px] font-medium transition-all",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#E49B10] rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
