import React from 'react';
import { Logo } from './Logo';

export function SplashPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="animate-pulse flex flex-col items-center gap-6">
        <Logo iconSize={80} className="scale-125" />
        <div className="h-1 w-32 bg-muted overflow-hidden rounded-full mt-8">
          <div className="h-full w-1/2 bg-primary animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}