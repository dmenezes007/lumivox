import React from 'react';
import { cn } from '../lib/utils';

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: 'single' | 'double' | 'triple';
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr",
      className
    )}>
      {children}
    </div>
  );
};

const BentoGridItem: React.FC<BentoGridItemProps> = ({ 
  children, 
  className, 
  span = 'single' 
}) => {
  const spanClasses = {
    single: '',
    double: 'md:col-span-2',
    triple: 'lg:col-span-3'
  };

  return (
    <div className={cn(
      "min-h-[200px]",
      spanClasses[span],
      className
    )}>
      {children}
    </div>
  );
};

export { BentoGrid, BentoGridItem };
