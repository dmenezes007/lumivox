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
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Logo } from './Logo';

export interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  onUploadNew?: () => void;
  onLogout?: () => void;
  userEmail?: string;
  className?: string;
  isCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView = 'home', 
  onViewChange,
  onUploadNew,
  onLogout,
  userEmail,
  className,
  isCollapsed: externalCollapsed,
  onToggle
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile viewport
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync with external state if provided
  React.useEffect(() => {
    if (externalCollapsed !== undefined) {
      setIsCollapsed(externalCollapsed);
    }
  }, [externalCollapsed]);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle?.(newState);
  };

  const handleMenuItemClick = (viewId: string) => {
    onViewChange?.(viewId);
    // Auto-close sidebar on mobile after selection
    if (isMobile) {
      const newState = true;
      setIsCollapsed(newState);
      onToggle?.(newState);
    }
  };
  
  const menuItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'translate', icon: Languages, label: 'Tradução' },
    { id: 'summary', icon: BookOpen, label: 'Resumo' },
    { id: 'insights', icon: Lightbulb, label: 'Insights' },
    { id: 'audio', icon: Volume2, label: 'Áudio' },
    { id: 'analytics', icon: BarChart3, label: 'Análises' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => {
            setIsCollapsed(true);
            onToggle?.(true);
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col shadow-xl transition-all duration-300 z-50",
        isCollapsed ? "w-20" : "w-64",
        // Mobile: slide from left
        isMobile && isCollapsed && "-translate-x-full md:translate-x-0",
        className
      )}>
      {/* Logo Component */}
      <div className="p-6 border-b border-border bg-gradient-to-br from-card to-muted/20 relative">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 mb-2">
            <Logo iconSize={24} showText={true} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Logo iconSize={24} showText={false} />
          </div>
        )}
        
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all hover-lift",
                isCollapsed && "justify-center px-0",
                isActive 
                  ? "brand-gradient text-white shadow-lg scale-[1.02]" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-sm")} />
              {!isCollapsed && (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full pulse-slow" />
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border bg-gradient-to-t from-muted/20 to-transparent">
        <Button 
          variant="default" 
          className={`w-full ${isCollapsed ? 'justify-center' : 'justify-start gap-3'} brand-gradient hover:opacity-90 transition-opacity shadow-md`}
          onClick={onUploadNew}
          title={isCollapsed ? "Novo Upload" : undefined}
        >
          <Upload className="w-4 h-4" />
          {!isCollapsed && "Novo Upload"}
        </Button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
