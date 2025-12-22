import React, { useState, useCallback, useEffect } from 'react';
import { DocumentContent, Language, LANGUAGES, AnalysisMode } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { BentoGrid, BentoGridItem } from './components/BentoGrid';
import AnalyticsChart from './components/AnalyticsChart';
import ProgressIndicator from './components/ProgressIndicator';
import { ToastContainer, ToastProps } from './components/Toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { translateAndAnalyze, generateSpeech, decode, decodeAudioData } from './services/geminiService';
import { isDemoMode } from './services/mockService';
import { useAuth } from './hooks/useAuth';
import { 
  FileText, 
  Languages as LanguagesIcon, 
  BookOpen, 
  Volume2,
  Play,
  Pause,
  BarChart3,
  Clock,
  FileCheck,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

type ProcessStatus = 'idle' | 'processing' | 'success' | 'error';
type AppScreen = 'splash' | 'login' | 'app';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const { user, loading: authLoading, logout } = useAuth();
  
  const [doc, setDoc] = useState<DocumentContent | null>(null);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[1]); // Default to PT
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<string>('home');
  const [analysisType, setAnalysisType] = useState<AnalysisMode>(AnalysisMode.FullTranslation);
  const [showDemoBanner, setShowDemoBanner] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);
  
  // Progress & Toast States
  const [processStatus, setProcessStatus] = useState<ProcessStatus>('idle');
  const [processProgress, setProcessProgress] = useState(0);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Handle authentication flow
  useEffect(() => {
    if (!authLoading) {
      if (user && currentScreen === 'login') {
        setCurrentScreen('app');
      } else if (!user && currentScreen === 'app') {
        setCurrentScreen('login');
      }
    }
  }, [user, authLoading]);

  // Handle splash complete
  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  // Handle login success
  const handleLoginSuccess = () => {
    setCurrentScreen('app');
    addToast('success', 'Login realizado!', `Bem-vindo, ${user?.email || 'Usuário'}`);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setCurrentScreen('login');
      addToast('info', 'Logout realizado', 'Até logo!');
    } catch (err) {
      addToast('error', 'Erro ao sair', 'Tente novamente');
    }
  };

  // Render splash screen
  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Render login screen (or if not authenticated)
  if (currentScreen === 'login' || !user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Toast utility function
  const addToast = (type: ToastProps['type'], title: string, message?: string) => {
    const id = Date.now().toString();
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      onClose: (toastId) => setToasts(prev => prev.filter(t => t.id !== toastId))
    };
    setToasts(prev => [...prev, newToast]);
  };

  // Mock data for analytics
  const mockAnalyticsData = [
    { name: 'Jan', value: 12 },
    { name: 'Fev', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Abr', value: 25 },
    { name: 'Mai', value: 22 },
    { name: 'Jun', value: 30 }
  ];

  const handleFileLoaded = (text: string, filename: string) => {
    setDoc({
      title: filename,
      originalText: text,
    });
    setActiveView('translate');
    setTotalProcessed(prev => prev + 1);
    addToast('success', 'Arquivo Carregado', `${filename} foi carregado com sucesso!`);
  };

  const handleProcess = async () => {
    if (!doc) return;
    setLoading(true);
    setProcessStatus('processing');
    setProcessProgress(0);
    const startTime = Date.now();
    
    try {
      const mode = analysisType === AnalysisMode.FullTranslation ? 'translate' : 
                   analysisType === AnalysisMode.Summary ? 'summarize' : 'analyze';
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProcessProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const result = await translateAndAnalyze(doc.originalText, selectedLang, mode);
      
      clearInterval(progressInterval);
      setProcessProgress(100);
      
      setDoc(prev => prev ? ({
        ...prev,
        translatedText: result,
        targetLanguage: selectedLang.name
      }) : null);
      
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      setProcessingTime(timeElapsed);
      
      setProcessStatus('success');
      addToast('success', 'Processamento Concluído!', `Documento processado em ${timeElapsed.toFixed(1)}s`);
      
      setTimeout(() => setProcessStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setProcessStatus('error');
      addToast('error', 'Erro no Processamento', 'Não foi possível processar o documento. Tente novamente.');
      setTimeout(() => setProcessStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async () => {
    const textToRead = doc?.translatedText || doc?.originalText;
    if (!textToRead) return;

    setIsSpeaking(true);
    addToast('info', 'Gerando Áudio', 'Convertendo texto em fala...');
    
    try {
      const base64Audio = await generateSpeech(textToRead, selectedLang.code);
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decode(base64Audio);
        const buffer = await decodeAudioData(decodedBytes, audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => {
          setIsSpeaking(false);
          addToast('success', 'Áudio Concluído', 'A reprodução foi finalizada.');
        };
        source.start();
        addToast('success', 'Reproduzindo Áudio', 'O texto está sendo narrado.');
      }
    } catch (err) {
      console.error(err);
      setIsSpeaking(false);
      addToast('error', 'Erro no Áudio', 'Não foi possível gerar o áudio.');
    }
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3">
          <span className="text-gradient">Bem-vindo ao LumiVox</span>
          <Sparkles className="inline-block w-8 h-8 ml-2 text-primary animate-pulse" />
        </h1>
        <p className="text-xl text-muted-foreground">
          Traduza, analise e ouça seus documentos acadêmicos com Inteligência Artificial
        </p>
      </div>

      <BentoGrid>
        <BentoGridItem>
          <StatCard
            title="Documentos Processados"
            value={totalProcessed}
            trend="up"
            trendValue="+12%"
            icon={<FileText className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem>
          <StatCard
            title="Tempo Médio"
            value={`${processingTime.toFixed(1)}s`}
            trend="down"
            trendValue="-8%"
            subtitle="Processamento otimizado"
            icon={<Clock className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem>
          <StatCard
            title="Taxa de Sucesso"
            value="98.5%"
            trend="up"
            trendValue="+2.1%"
            icon={<FileCheck className="w-6 h-6" />}
          />
        </BentoGridItem>
      </BentoGrid>

      <div className="mt-8">
        <FileUpload onFileLoaded={handleFileLoaded} isLoading={loading} />
      </div>
    </div>
  );

  const renderDocument = () => {
    if (!doc) return renderHome();

    return (
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              {doc.title}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="info">
                {doc.originalText.split(' ').length} palavras
              </Badge>
              {doc.targetLanguage && (
                <Badge variant="success">
                  Traduzido para {doc.targetLanguage}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={selectedLang.code}
              onChange={(e) => setSelectedLang(LANGUAGES.find(l => l.code === e.target.value) || LANGUAGES[0])}
              className="bg-card border-2 border-border hover:border-primary rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm hover:shadow-md"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
              ))}
            </select>
            <Button 
              onClick={handleProcess}
              disabled={loading}
              size="lg"
              className="shadow-lg hover-lift"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Processando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Processar
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Analysis Type Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Análise</CardTitle>
            <CardDescription>Escolha como processar o documento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: AnalysisMode.FullTranslation, label: 'Tradução Completa', icon: LanguagesIcon, desc: 'Tradução palavra por palavra' },
                { id: AnalysisMode.Summary, label: 'Resumo Acadêmico', icon: BookOpen, desc: 'Resumo estruturado' },
                { id: AnalysisMode.Insights, label: 'Principais Insights', icon: TrendingUp, desc: 'Pontos-chave do texto' },
              ].map(type => {
                const Icon = type.icon;
                const isActive = analysisType === type.id;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setAnalysisType(type.id)}
                    className={`flex flex-col items-start gap-2 p-4 rounded-xl text-sm font-medium transition-all border-2 hover-lift ${
                      isActive 
                        ? 'border-primary brand-gradient text-white shadow-xl scale-105' 
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">{type.label}</div>
                      <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {type.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Document Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documento Original
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <div className="academic-text text-foreground whitespace-pre-line">
                {doc.originalText}
              </div>
            </CardContent>
          </Card>

          {/* Processed */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <LanguagesIcon className="w-5 h-5" />
                {analysisType === AnalysisMode.FullTranslation ? 'Tradução' : 'Análise'}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTTS}
                disabled={isSpeaking || !doc.translatedText}
              >
                {isSpeaking ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Ouvir
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <div className="academic-text text-foreground whitespace-pre-line">
                {doc.translatedText || (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Volume2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Clique em "Processar" para ver o resultado aqui</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Análises e Estatísticas
      </h1>
      
      <BentoGrid>
        <BentoGridItem>
          <StatCard
            title="Total de Documentos"
            value={totalProcessed}
            trend="up"
            trendValue="+15%"
            subtitle="Este mês"
            icon={<FileText className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem>
          <StatCard
            title="Tempo Médio"
            value={`${processingTime.toFixed(1)}s`}
            trend="down"
            trendValue="-8%"
            subtitle="Últimos 30 dias"
            icon={<Clock className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem>
          <StatCard
            title="Áudio Gerado"
            value="142"
            trend="up"
            trendValue="+23%"
            subtitle="Horas de áudio"
            icon={<Volume2 className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem span="double">
          <AnalyticsChart
            title="Documentos Processados"
            description="Últimos 6 meses"
            data={mockAnalyticsData}
            type="area"
          />
        </BentoGridItem>
        <BentoGridItem>
          <AnalyticsChart
            title="Performance"
            description="Tempo médio"
            data={mockAnalyticsData}
            type="bar"
          />
        </BentoGridItem>
      </BentoGrid>
    </div>
  );

  // Main App Content
  return (
    <div className="min-h-screen gradient-bg dark">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        status={processStatus} 
        progress={processProgress}
        message={processStatus === 'processing' ? 'Analisando documento com IA...' : undefined}
      />
      
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        onUploadNew={() => {
          setDoc(null);
          setActiveView('home');
        }}
        onLogout={handleLogout}
        userEmail={user?.email}
      />
      
      <main className="ml-64 p-8">
        {/* Demo Mode Banner */}
        {isDemoMode && showDemoBanner && (
          <div className="max-w-7xl mx-auto mb-6">
            <Card className="border-2 border-yellow-500/50 bg-yellow-500/10 hover-lift backdrop-blur-sm">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-100 mb-2 text-lg flex items-center gap-2">
                    🎭 Modo Demonstração Ativo
                    <Badge variant="warning" className="ml-2">Demo</Badge>
                  </h3>
                  <p className="text-sm text-yellow-200/90 mb-3 leading-relaxed">
                    As funcionalidades de IA estão usando dados simulados. Para acesso completo às traduções, resumos e síntese de voz reais com o Gemini AI:
                  </p>
                  <a 
                    href="https://ai.google.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Obtenha sua chave API gratuita
                  </a>
                </div>
                <button
                  onClick={() => setShowDemoBanner(false)}
                  className="flex-shrink-0 text-yellow-400 hover:text-yellow-200 transition-colors"
                  aria-label="Fechar banner"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {activeView === 'home' && renderHome()}
          {(activeView === 'translate' || activeView === 'summary' || activeView === 'insights') && renderDocument()}
          {activeView === 'analytics' && renderAnalytics()}
          {activeView === 'audio' && doc && renderDocument()}
        </div>
      </main>

      <footer className="ml-64 border-t border-border bg-card/50 backdrop-blur-sm py-6 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          &copy; 2024 LumiVox - Powered by 
          <span className="font-semibold text-gradient">Gemini AI</span>
          <Sparkles className="w-4 h-4 text-primary" />
        </p>
      </footer>

      {/* Progress Indicator */}
      <ProgressIndicator 
        status={processStatus}
        progress={processProgress}
        estimatedTime={5}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default App;
