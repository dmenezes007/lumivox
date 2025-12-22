import React, { useState, useCallback, useEffect } from 'react';
import { DocumentContent, Language, LANGUAGES, AnalysisMode } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import AnalyticsModule from './components/AnalyticsModule';
import TranslateModule from './components/TranslateModule';
import SummaryModule from './components/SummaryModule';
import InsightsModule from './components/InsightsModule';
import AudioModule from './components/AudioModule';
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
import { cn } from './lib/utils';
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [documentHistory, setDocumentHistory] = useState<any[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [insights, setInsights] = useState<string>('');
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  
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
    const wordCount = text.split(/\s+/).length;
    setDoc({
      title: filename,
      originalText: text,
    });
    
    // Reset processed data when new file is loaded
    setSummary('');
    setInsights('');
    setAudioGenerated(false);
    
    setActiveView('translate');
    setTotalProcessed(prev => prev + 1);
    
    // Add to document history
    const newDoc = {
      id: Date.now().toString(),
      filename,
      date: new Date(),
      status: 'processing' as const,
      processingTime: 0,
      wordCount,
      language: selectedLang.name
    };
    setDocumentHistory(prev => [...prev, newDoc]);
    
    addToast('success', 'Arquivo Carregado', `${filename} foi carregado com sucesso!`);
  };

  const handleTranslate = async () => {
    if (!doc) return;
    setLoading(true);
    setProcessStatus('processing');
    setProcessProgress(0);
    const startTime = Date.now();
    
    try {
      const progressInterval = setInterval(() => {
        setProcessProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const result = await translateAndAnalyze(doc.originalText, selectedLang, 'translate');
      
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
      
      setDocumentHistory(prev => prev.map(d => 
        d.filename === doc.title && d.status === 'processing'
          ? { ...d, status: 'success' as const, processingTime: timeElapsed }
          : d
      ));
      
      setProcessStatus('success');
      addToast('success', 'Tradução Concluída!', `Documento traduzido em ${timeElapsed.toFixed(1)}s`);
      
      setTimeout(() => setProcessStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      
      setDocumentHistory(prev => prev.map(d => 
        d.filename === doc.title && d.status === 'processing'
          ? { ...d, status: 'error' as const, processingTime: 0 }
          : d
      ));
      
      setProcessStatus('error');
      addToast('error', 'Erro na Tradução', 'Não foi possível traduzir o documento. Tente novamente.');
      setTimeout(() => setProcessStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSummary = async () => {
    if (!doc) return;
    setLoading(true);
    setProcessStatus('processing');
    setProcessProgress(0);
    const startTime = Date.now();
    
    try {
      const progressInterval = setInterval(() => {
        setProcessProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const result = await translateAndAnalyze(doc.originalText, selectedLang, 'summarize');
      
      clearInterval(progressInterval);
      setProcessProgress(100);
      
      setSummary(result);
      
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      
      setProcessStatus('success');
      addToast('success', 'Resumo Gerado!', `Resumo criado em ${timeElapsed.toFixed(1)}s`);
      
      setTimeout(() => setProcessStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setProcessStatus('error');
      addToast('error', 'Erro no Resumo', 'Não foi possível gerar o resumo. Tente novamente.');
      setTimeout(() => setProcessStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleInsights = async () => {
    if (!doc) return;
    setLoading(true);
    setProcessStatus('processing');
    setProcessProgress(0);
    const startTime = Date.now();
    
    try {
      const progressInterval = setInterval(() => {
        setProcessProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const result = await translateAndAnalyze(doc.originalText, selectedLang, 'analyze');
      
      clearInterval(progressInterval);
      setProcessProgress(100);
      
      setInsights(result);
      
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      
      setProcessStatus('success');
      addToast('success', 'Insights Extraídos!', `Análise concluída em ${timeElapsed.toFixed(1)}s`);
      
      setTimeout(() => setProcessStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setProcessStatus('error');
      addToast('error', 'Erro nos Insights', 'Não foi possível extrair insights. Tente novamente.');
      setTimeout(() => setProcessStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAudio = async () => {
    const textToRead = doc?.translatedText || doc?.originalText;
    if (!textToRead) return;

    setLoading(true);
    setProcessStatus('processing');
    addToast('info', 'Gerando Áudio', 'Convertendo texto em fala...');
    
    try {
      const base64Audio = await generateSpeech(textToRead, selectedLang.code);
      if (base64Audio) {
        setAudioGenerated(true);
        addToast('success', 'Áudio Gerado!', 'Conversão concluída com sucesso.');
        setProcessStatus('success');
        setTimeout(() => setProcessStatus('idle'), 3000);
      }
    } catch (err) {
      console.error(err);
      setProcessStatus('error');
      addToast('error', 'Erro no Áudio', 'Não foi possível gerar o áudio.');
      setTimeout(() => setProcessStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = handleTranslate; // Mantém para compatibilidade

  const handleTTS = async () => {
    if (isSpeaking) {
      // Pause/Stop
      if (audioSource) {
        audioSource.stop();
        setAudioSource(null);
      }
      setIsSpeaking(false);
      addToast('info', 'Áudio Pausado', 'A reprodução foi interrompida.');
      return;
    }

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
          setAudioSource(null);
          addToast('success', 'Áudio Concluído', 'A reprodução foi finalizada.');
        };
        source.start();
        setAudioSource(source);
        addToast('success', 'Reproduzindo Áudio', 'O texto está sendo narrado.');
      }
    } catch (err) {
      console.error(err);
      setIsSpeaking(false);
      setAudioSource(null);
      addToast('error', 'Erro no Áudio', 'Não foi possível gerar o áudio.');
    }
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3">
          <span className="text-gradient">Bem-vindo ao IluminaVox</span>
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

  const renderAnalytics = () => (
    <AnalyticsModule documents={documentHistory} />
  );

  const renderTranslate = () => {
    if (!doc) return renderHome();
    return (
      <TranslateModule
        doc={doc}
        selectedLang={selectedLang}
        loading={loading}
        onProcess={handleTranslate}
        onLanguageChange={setSelectedLang}
        languages={LANGUAGES}
      />
    );
  };

  const renderSummary = () => {
    if (!doc) return renderHome();
    return (
      <SummaryModule
        doc={doc}
        loading={loading}
        summary={summary}
        onProcess={handleSummary}
      />
    );
  };

  const renderInsights = () => {
    if (!doc) return renderHome();
    return (
      <InsightsModule
        doc={doc}
        loading={loading}
        insights={insights}
        onProcess={handleInsights}
      />
    );
  };

  const renderAudio = () => {
    if (!doc) return renderHome();
    return (
      <AudioModule
        doc={doc}
        selectedLang={selectedLang}
        loading={loading}
        isSpeaking={isSpeaking}
        audioGenerated={audioGenerated}
        onProcess={handleGenerateAudio}
        onPlayPause={handleTTS}
        onLanguageChange={setSelectedLang}
        languages={LANGUAGES}
      />
    );
  };

  // Main App Content
  return (
    <div className="min-h-screen gradient-bg dark">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
      
      <Sidebar 
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          setIsSidebarCollapsed(false);
        }}
        onUploadNew={() => {
          setDoc(null);
          setActiveView('home');
        }}
        onLogout={handleLogout}
        userEmail={user?.email}
      />
      
      <Header 
        userEmail={user?.email}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
      />
      
      <main className={cn(
        "p-8 pt-24 transition-all duration-300",
        isSidebarCollapsed ? "ml-20" : "ml-64"
      )}>
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
          {activeView === 'translate' && renderTranslate()}
          {activeView === 'summary' && renderSummary()}
          {activeView === 'insights' && renderInsights()}
          {activeView === 'audio' && renderAudio()}
          {activeView === 'analytics' && renderAnalytics()}
        </div>
      </main>

      <footer className={cn(
        "border-t border-border bg-card/50 backdrop-blur-sm py-6 text-center text-sm text-muted-foreground transition-all duration-300",
        isSidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        <p className="flex items-center justify-center gap-2">
          &copy; 2025 IluminaVox - Powered by
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
