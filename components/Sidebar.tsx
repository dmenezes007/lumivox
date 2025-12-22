import React from 'react';
import { 
  FileText, 
  Languages, 
  BookOpen, 
  Lightbulb, 
  Volume2, 
  Home,
  BarChart3,
  Settings,
  Upload,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import Logo from './Logo';

export interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  onUploadNew?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView = 'home', 
  onViewChange,
  onUploadNew,
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
    <aside className={cn(
      "fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col shadow-xl",
      className
    )}>
      {/* Logo Component */}
      <div className="p-6 border-b border-border bg-gradient-to-br from-card to-muted/20">
        <div className="flex items-center gap-3 mb-2">
          <Logo size="sm" animated={false} />
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-gradient">LumiVox</span>
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Document Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange?.(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all hover-lift",
                isActive 
                  ? "brand-gradient text-white shadow-lg scale-[1.02]" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-sm")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full pulse-slow" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border bg-gradient-to-t from-muted/20 to-transparent space-y-2">
        <Button 
          variant="default" 
          className="w-full justify-start gap-3 brand-gradient hover:opacity-90 transition-opacity shadow-md"
          onClick={onUploadNew}
        >
          <Upload className="w-4 h-4" />
          Novo Upload
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={() => onViewChange?.('settings')}
        >
          <Settings className="w-4 h-4" />
          Configurações
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
