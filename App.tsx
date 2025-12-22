import React, { useState, useCallback, useEffect } from 'react';
import { DocumentContent, Language, LANGUAGES, AnalysisMode } from './types';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { BentoGrid, BentoGridItem } from './components/BentoGrid';
import AnalyticsChart from './components/AnalyticsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { translateAndAnalyze, generateSpeech, decode, decodeAudioData } from './services/geminiService';
import { isDemoMode } from './services/mockService';
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
  ExternalLink
} from 'lucide-react';

const App: React.FC = () => {
  const [doc, setDoc] = useState<DocumentContent | null>(null);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[1]); // Default to PT
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState<string>('home');
  const [analysisType, setAnalysisType] = useState<AnalysisMode>(AnalysisMode.FullTranslation);
  const [showDemoBanner, setShowDemoBanner] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [totalProcessed, setTotalProcessed] = useState(0);

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
  };

  const handleProcess = async () => {
    if (!doc) return;
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const mode = analysisType === AnalysisMode.FullTranslation ? 'translate' : 
                   analysisType === AnalysisMode.Summary ? 'summarize' : 'analyze';
      
      const result = await translateAndAnalyze(doc.originalText, selectedLang, mode);
      
      setDoc(prev => prev ? ({
        ...prev,
        translatedText: result,
        targetLanguage: selectedLang.name
      }) : null);
      
      const endTime = Date.now();
      setProcessingTime((endTime - startTime) / 1000);
    } catch (err) {
      console.error(err);
      alert('Falha ao processar o documento.');
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async () => {
    const textToRead = doc?.translatedText || doc?.originalText;
    if (!textToRead) return;

    setIsSpeaking(true);
    try {
      const base64Audio = await generateSpeech(textToRead, selectedLang.code);
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decode(base64Audio);
        const buffer = await decodeAudioData(decodedBytes, audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      }
    } catch (err) {
      console.error(err);
      setIsSpeaking(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Bem-vindo ao LumiVox
        </h1>
        <p className="text-lg text-muted-foreground">
          Traduza, analise e ouça seus documentos acadêmicos com IA
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
              className="bg-card border border-border rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
              ))}
            </select>
            <Button 
              onClick={handleProcess}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Processar'}
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
                { id: AnalysisMode.FullTranslation, label: 'Tradução Completa', icon: LanguagesIcon },
                { id: AnalysisMode.Summary, label: 'Resumo Acadêmico', icon: BookOpen },
                { id: AnalysisMode.Insights, label: 'Principais Insights', icon: TrendingUp },
              ].map(type => {
                const Icon = type.icon;
                const isActive = analysisType === type.id;
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setAnalysisType(type.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all border-2 ${
                      isActive 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {type.label}
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

  return (
    <div className="min-h-screen bg-background dark">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        onUploadNew={() => {
          setDoc(null);
          setActiveView('home');
        }}
      />
      
      <main className="ml-64 p-8">
        {/* Demo Mode Banner */}
        {isDemoMode && showDemoBanner && (
          <div className="max-w-7xl mx-auto mb-6">
            <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                    🎭 Modo Demonstração Ativo
                  </h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                    As funcionalidades de IA estão usando dados simulados. Para acesso completo às traduções, resumos e síntese de voz reais:
                  </p>
                  <a 
                    href="https://ai.google.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:underline"
                  >
                    Obtenha sua chave API gratuita do Gemini
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button
                  onClick={() => setShowDemoBanner(false)}
                  className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                  aria-label="Fechar banner"
                >
                  ✕
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

      <footer className="ml-64 border-t border-border bg-card py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 LumiVox - Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
