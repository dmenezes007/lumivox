import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowRight, Chrome, Github } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticação
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0A1F] via-[#1a1332] to-[#2d1b4e] flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Bento Grid Layout */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side - Bento Cards */}
        <div className="lg:col-span-7 space-y-6 hidden lg:block">
          {/* Large Feature Card */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 hover-lift">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Traduções Inteligentes</h3>
                <p className="text-gray-400">Powered by Gemini AI</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Traduza documentos acadêmicos com precisão contextual usando inteligência artificial de última geração.
            </p>
          </div>

          {/* Small Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent hover-lift">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <div className="text-3xl">🎯</div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Resumos Precisos</h4>
              <p className="text-sm text-gray-400">Extraia os pontos principais em segundos</p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-gradient-to-br from-amber-500/10 to-transparent hover-lift">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <div className="text-3xl">🎤</div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Text-to-Speech</h4>
              <p className="text-sm text-gray-400">Ouça seus documentos traduzidos</p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 hover-lift">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text">1M+</div>
                <div className="text-sm text-gray-400 mt-1">Documentos</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">50+</div>
                <div className="text-sm text-gray-400 mt-1">Idiomas</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text">98%</div>
                <div className="text-sm text-gray-400 mt-1">Precisão</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:col-span-5">
          <div className="glass-card p-8 lg:p-10 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Logo size="md" animated={true} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
              <p className="text-gray-400">Entre para continuar sua jornada</p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all hover-lift">
                <Chrome className="w-5 h-5" />
                Continuar com Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all hover-lift">
                <Github className="w-5 h-5" />
                Continuar com GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-400 bg-[#1a1332]">ou continue com email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-300 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded" />
                  Lembrar-me
                </label>
                <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Não tem uma conta?{' '}
              <a href="#" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                Criar conta gratuita
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
