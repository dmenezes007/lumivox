import React from 'react';
import { LogOut, User, Bell, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export interface HeaderProps {
  userEmail?: string;
  userName?: string;
  onLogout?: () => void;
  isCollapsed?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  userEmail, 
  userName,
  onLogout, 
  isCollapsed = false,
  className 
}) => {
  // Extract first name from email if no userName provided
  const displayName = userName || userEmail?.split('@')[0] || 'Usuário';
  
  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 shadow-sm transition-all duration-300 z-40",
      isCollapsed ? "left-20" : "left-64",
      className
    )}>
      {/* Page Title / Breadcrumb */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">
          IluminaVox
        </h2>
        <span className="text-muted-foreground text-sm hidden md:block">
          / Dashboard
        </span>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-muted"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* User Info */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E49B10] to-[#F5C344] flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-[#3B2667]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground capitalize">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden md:inline">Sair</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
