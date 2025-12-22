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
  Upload
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

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
      "fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col",
      className
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">LumiVox</h1>
            <p className="text-xs text-muted-foreground">AI Document Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange?.(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3"
          onClick={onUploadNew}
        >
          <Upload className="w-4 h-4" />
          Novo Upload
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3"
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
