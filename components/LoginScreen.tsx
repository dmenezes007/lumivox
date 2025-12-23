import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Chrome, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup, loginWithGoogle, resetPassword, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      console.error('Erro de autenticação:', err);
      console.error('Código do erro:', err.code);
      console.error('Mensagem do erro:', err.message);
      
      const errorMessage = err.code === 'auth/user-not-found' 
        ? 'Usuário não encontrado. Verifique o email.'
        : err.code === 'auth/wrong-password'
        ? 'Senha incorreta. Tente novamente.'
        : err.code === 'auth/email-already-in-use'
        ? 'Email já cadastrado. Tente fazer login.'
        : err.code === 'auth/weak-password'
        ? 'Senha muito fraca (mínimo 6 caracteres)'
        : err.code === 'auth/invalid-email'
        ? 'Email inválido. Verifique o formato.'
        : err.code === 'auth/invalid-credential'
        ? 'Credenciais inválidas. Verifique email e senha.'
        : err.code === 'auth/network-request-failed'
        ? 'Erro de conexão. Verifique sua internet.'
        : err.code === 'auth/too-many-requests'
        ? 'Muitas tentativas. Aguarde alguns minutos.'
        : err.code === 'auth/configuration-not-found'
        ? 'Firebase não configurado. Verifique as variáveis de ambiente.'
        : err.code === 'auth/api-key-not-valid'
        ? 'Chave API inválida. Configure VITE_FIREBASE_API_KEY.'
        : `Erro: ${err.code || 'desconhecido'} - ${err.message || 'Tente novamente.'}`;
      
      setLocalError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError('');
    setIsSubmitting(true);
    
    try {
      await loginWithGoogle();
      onLoginSuccess();
    } catch (err: any) {
      setLocalError('Erro ao fazer login com Google');
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorToShow = localError || authError;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-[#0F0A1F] via-[#1a1332] to-[#2d1b4e] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float blur-xl"
            style={{
              width: `${50 + Math.random() * 150}px`,
              height: `${50 + Math.random() * 150}px`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(228, 155, 16, 0.4), transparent)' 
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-16">
          <div className="relative group">
            {/* Rotating Glow Ring */}
            <div className="absolute -inset-8 blur-2xl opacity-50 transition-all duration-700 group-hover:blur-3xl group-hover:opacity-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 animate-spin-slow" />
            </div>
            
            {/* Logo Component */}
            <div className="relative scale-[3] transform transition-transform duration-700 group-hover:scale-[3.3]">
              <Logo iconSize={32} showText={false} />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
                {isLogin ? 'Bem-vindo de Volta' : 'Criar Conta'}
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Faça login para continuar' : 'Crie sua conta para começar'}
            </p>
          </div>

          {/* Error Alert */}
          {errorToShow && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in slide-in-from-top">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{errorToShow}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-gray-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Forgot Password Link */}
              {isLogin && (
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!email) {
                        setLocalError('Digite seu email para recuperar a senha');
                        return;
                      }
                      try {
                        await resetPassword(email);
                        setLocalError('');
                        alert(`✅ Email de recuperação enviado para ${email}\n\nVerifique sua caixa de entrada e spam.`);
                      } catch (err) {
                        setLocalError('Erro ao enviar email. Verifique o endereço.');
                      }
                    }}
                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                isLogin ? 'Entrar' : 'Criar Conta'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1a1332] text-gray-400">ou continue com</span>
            </div>
          </div>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            variant="outline"
            className="w-full h-12 border-2 border-white/20 hover:border-white/40 hover:bg-white/5"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </Button>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setLocalError('');
              }}
              className="text-sm text-gray-400 hover:text-amber-400 transition-colors"
            >
              {isLogin ? (
                <>
                  Não tem uma conta? <span className="font-semibold">Cadastre-se</span>
                </>
              ) : (
                <>
                  Já tem uma conta? <span className="font-semibold">Faça login</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-500">
          Protegido por autenticação Firebase
        </p>
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
};

export default LoginScreen;
