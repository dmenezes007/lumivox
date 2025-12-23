import React from 'react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col items-center text-center space-y-6">
          
          {/* Logo Application - Same as Splash Screen */}
          <div className="flex flex-col items-center gap-6 py-2">
            <div className="relative group">
              {/* Rotating Glow Ring */}
              <div className="absolute -inset-8 blur-2xl opacity-50 transition-all duration-700 group-hover:blur-3xl group-hover:opacity-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 animate-spin-slow" />
              </div>
              
              {/* Logo Component */}
              <div className="relative scale-[2.5] transform transition-transform duration-700 group-hover:scale-[2.7]">
                <Logo iconSize={32} showText={false} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Bem-vindo de volta</h2>
            <p className="text-sm text-muted-foreground">
              Entre com suas credenciais para acessar o IluminaVox
            </p>
          </div>

          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button className="w-full brand-gradient text-white font-semibold shadow-md hover:opacity-90 transition-opacity">
              Entrar
            </Button>
          </form>
          
          <div className="text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Esqueceu sua senha?</a>
          </div>
        </div>
        <div className="bg-muted/50 p-4 text-center text-xs text-muted-foreground border-t border-border">
          &copy; {new Date().getFullYear()} IluminaVox. Todos os direitos reservados.
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}