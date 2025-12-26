import React, { useState, useCallback, useEffect } from 'react';
import { DocumentContent, Language, LANGUAGES, AnalysisMode, Voice, GEMINI_VOICES, DocumentHistory } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [documentHistory, setDocumentHistory] = useState<DocumentHistory[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [insights, setInsights] = useState<string>('');
  const [audioGenerated, setAudioGenerated] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [generatedAudioBase64, setGeneratedAudioBase64] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<Voice>(GEMINI_VOICES[0]);
  const [audioQuotaUsed, setAudioQuotaUsed] = useState(0);
  const [audioQuotaLimit] = useState(10);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Progress & Toast States
  const [processStatus, setProcessStatus] = useState<ProcessStatus>('idle');
  const [processProgress, setProcessProgress] = useState(0);
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Load document history from localStorage on mount
  useEffect(() => {
    if (!user) {
      setDocumentHistory([]);
      return;
    }
    
    const savedHistory = localStorage.getItem('documentHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Filtrar apenas documentos do usuário logado
        const userDocs = parsed
          .filter((doc: any) => doc.userId === user.uid)
          .map((doc: any) => ({
            ...doc,
            date: new Date(doc.date)
          }));
        setDocumentHistory(userDocs);
      } catch (error) {
        console.error('Error loading document history:', error);
      }
    }
    
    // Carregar contador de quota
    const savedQuota = localStorage.getItem('audioQuotaUsed');
    const savedQuotaDate = localStorage.getItem('audioQuotaDate');
    const today = new Date().toDateString();
    
    if (savedQuotaDate === today && savedQuota) {
      setAudioQuotaUsed(parseInt(savedQuota));
    } else {
      // Resetar quota se for um novo dia
      localStorage.setItem('audioQuotaDate', today);
      localStorage.setItem('audioQuotaUsed', '0');
      setAudioQuotaUsed(0);
    }
  }, [user]);

  // Save document history to localStorage whenever it changes (preserving all users' data)
  useEffect(() => {
    if (!user || documentHistory.length === 0) return;
    
    // Carregar todos os documentos do localStorage
    const savedHistory = localStorage.getItem('documentHistory');
    let allDocs = [];
    
    if (savedHistory) {
      try {
        allDocs = JSON.parse(savedHistory);
      } catch (error) {
        console.error('Error parsing saved history:', error);
      }
    }
    
    // Remover documentos antigos do usuário atual e adicionar os novos
    allDocs = allDocs.filter((d: any) => d.userId !== user.uid);
    allDocs = [...allDocs, ...documentHistory];
    
    localStorage.setItem('documentHistory', JSON.stringify(allDocs));
  }, [documentHistory, user]);

  // Handle authentication flow and clear data on logout
  useEffect(() => {
    if (!authLoading) {
      if (user && currentScreen === 'login') {
        setCurrentScreen('app');
      } else if (!user && currentScreen === 'app') {
        // Limpar dados do usuário ao fazer logout
        setDocumentHistory([]);
        setDoc(null);
        setSummary('');
        setInsights('');
        setAudioGenerated(false);
        setGeneratedAudioBase64('');
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
    setGeneratedAudioBase64('');
    
    setActiveView('translate');
    
    // Add to document history with userId
    const newDoc = {
      id: Date.now().toString(),
      filename,
      date: new Date(),
      status: 'processing' as const,
      processingTime: 0,
      wordCount,
      language: selectedLang.name,
      userId: user?.uid // Associa o documento ao usuário logado
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
      setUnreadNotifications(prev => prev + 1);
      
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
      setUnreadNotifications(prev => prev + 1);
      
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
      setUnreadNotifications(prev => prev + 1);
      
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
    
    // Verificar quota
    if (audioQuotaUsed >= audioQuotaLimit) {
      addToast('warning', 'Quota Diária Atingida', `Você já usou ${audioQuotaLimit} áudios hoje. Aguarde até amanhã para continuar.`);
      return;
    }

    setLoading(true);
    setProcessStatus('processing');
    addToast('info', 'Gerando Áudio', `Convertendo texto com voz ${selectedVoice.name}...`);
    
    try {
      const base64Audio = await generateSpeech(textToRead, selectedVoice.id);
      if (base64Audio && base64Audio.length > 0) {
        console.log('✅ Áudio gerado com sucesso, tamanho:', base64Audio.length);
        setGeneratedAudioBase64(base64Audio);
        setAudioGenerated(true);
        
        // Incrementar contador de quota
        const newQuotaUsed = audioQuotaUsed + 1;
        setAudioQuotaUsed(newQuotaUsed);
        localStorage.setItem('audioQuotaUsed', newQuotaUsed.toString());
        
        addToast('success', 'Áudio Gerado!', `Voz ${selectedVoice.name} aplicada. Quota: ${newQuotaUsed}/${audioQuotaLimit}`);
        setProcessStatus('success');
        setUnreadNotifications(prev => prev + 1);
        setTimeout(() => setProcessStatus('idle'), 3000);
      } else {
        console.warn('⚠️ API não retornou áudio válido');
        setProcessStatus('error');
        addToast('error', 'Áudio não disponível', 'Configure a API Key do Gemini para usar esta funcionalidade.');
        setTimeout(() => setProcessStatus('idle'), 5000);
      }
    } catch (err: any) {
      console.error('❌ Erro ao gerar áudio:', err);
      
      if (err?.message === 'QUOTA_EXCEEDED') {
        setProcessStatus('error');
        setAudioQuotaUsed(audioQuotaLimit);
        localStorage.setItem('audioQuotaUsed', audioQuotaLimit.toString());
        addToast('error', 'Quota Diária Excedida', `Limite de ${audioQuotaLimit} áudios/dia atingido. Redefine às 00h (horário do Google).`);
      } else {
        setProcessStatus('error');
        addToast('error', 'Erro no Áudio', 'Não foi possível gerar o áudio.');
      }
      
      setTimeout(() => setProcessStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = handleTranslate; // Mantém para compatibilidade

  const handleTTS = async () => {
    if (isSpeaking) {
      // Parar
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
      const base64Audio = await generateSpeech(textToRead, selectedVoice.id);
      if (base64Audio && base64Audio.length > 0) {
        console.log('🎵 Iniciando reprodução de áudio...');
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decode(base64Audio);
        console.log('📦 Bytes decodificados:', decodedBytes.length);
        const buffer = await decodeAudioData(decodedBytes, audioCtx, 24000, 1);
        console.log('🎹 Buffer criado, duração:', buffer.duration, 'segundos');
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
        addToast('success', 'Reproduzindo Áudio', `Voz ${selectedVoice.name} sendo narrada.`);
      } else {
        console.warn('⚠️ Áudio não disponível');
        setIsSpeaking(false);
        addToast('error', 'Áudio não disponível', 'Configure a API Key do Gemini para usar esta funcionalidade.');
      }
    } catch (err: any) {
      console.error('❌ Erro na reprodução:', err);
      setIsSpeaking(false);
      setAudioSource(null);
      
      if (err?.message === 'QUOTA_EXCEEDED') {
        addToast('error', 'Quota Diária Excedida', 'Aguarde até amanhã ou atualize seu plano.');
      } else {
        addToast('error', 'Erro no Áudio', 'Não foi possível reproduzir o áudio.');
      }
    }
  };

  const renderHome = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3">
          <span className="text-gradient">Bem-vindo ao IluminaVox</span>
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          Traduza, analise e ouça seus documentos acadêmicos com Inteligência Artificial
        </p>
      </div>

      {/* Upload Section - Destaque Principal */}
      <div className="relative mb-6 md:mb-10">
        {/* Indicador "Começe por aqui" */}
        <div className="flex items-center justify-center mb-3 md:mb-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#E49B10]/20 to-[#F5C344]/20 border border-[#E49B10]/40 backdrop-blur-sm animate-pulse">
            <div className="w-2 h-2 rounded-full bg-[#E49B10] animate-ping" />
            <span className="text-sm font-semibold text-[#F5C344]">
              Comece por aqui
            </span>
            <div className="w-2 h-2 rounded-full bg-[#E49B10] animate-ping" />
          </div>
        </div>
        
        {/* Upload Component com Borda Animada */}
        <div className="relative">
          {/* Border com preenchimento cíclico bidirecional */}
          <div className="absolute -inset-0.5 rounded-2xl overflow-hidden">
            <div className="w-[400%] h-full bg-gradient-to-r from-transparent via-[#E49B10] to-transparent animate-[slide-bidirectional_4s_ease-in-out_infinite]" />
          </div>
          
          {/* Conteúdo */}
          <div className="relative">
            <FileUpload onFileLoaded={handleFileLoaded} isLoading={loading} />
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <BentoGrid>
        <BentoGridItem>
          <StatCard
            title="Documentos Processados"
            value={documentHistory.filter(d => d.status === 'success').length}
            trend={documentHistory.length > 0 ? "up" : "neutral"}
            trendValue={documentHistory.length > 0 ? `${documentHistory.length} total` : "—"}
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
    </div>
  );

  const renderAnalytics = () => {
    // Garantir que só mostra documentos do usuário logado
    const userDocuments = documentHistory.filter(d => d.userId === user?.uid);
    
    return (
      <AnalyticsModule 
        documents={userDocuments} 
        onViewDocument={(docId) => {
          const document = documentHistory.find(d => d.id === docId);
          if (document) {
            addToast('info', 'Visualizar Documento', `Abrindo ${document.filename}...`);
            // Aqui você pode adicionar lógica para visualizar o documento
          }
        }}
        onDownloadDocument={(docId) => {
          const document = documentHistory.find(d => d.id === docId);
          if (document) {
            addToast('success', 'Download Iniciado', `Baixando ${document.filename}...`);
            // Aqui você pode adicionar lógica para download
          }
        }}
      />
    );
  };

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
        loading={loading}
        isSpeaking={isSpeaking}
        audioGenerated={audioGenerated}
        selectedVoice={selectedVoice}
        voices={GEMINI_VOICES}
        onProcess={handleGenerateAudio}
        onPlayPause={handleTTS}
        onVoiceChange={setSelectedVoice}
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
        }}
        onUploadNew={() => {
          setDoc(null);
          setActiveView('home');
        }}
        onLogout={handleLogout}
        userEmail={user?.email}
        isCollapsed={isSidebarCollapsed}
        onToggle={setIsSidebarCollapsed}
      />
      
      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation 
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
        }}
      />
      
      <Header 
        userEmail={user?.email}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        notificationCount={unreadNotifications}
        onNotificationClick={() => {
          setUnreadNotifications(0);
          addToast('info', 'Notificações', `Você tem ${documentHistory.length} documentos processados`);
        }}
        onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onUploadNew={() => {
          setDoc(null);
          setActiveView('home');
          addToast('info', 'Novo Upload', 'Pronto para enviar um novo documento');
        }}
      />
      
      <main className={cn(
        "p-4 md:p-8 pt-20 md:pt-24 pb-20 md:pb-8 transition-all duration-300",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
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
        "border-t border-border bg-card/50 backdrop-blur-sm py-3 md:py-4 text-center text-xs md:text-sm text-muted-foreground transition-all duration-300 mb-16 md:mb-0",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <p className="flex items-center justify-center gap-2">
          &copy; 2025 IluminaVox - Powered by
          <span className="font-semibold text-gradient">Gemini AI</span>
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
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
