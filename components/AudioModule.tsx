import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Volume2, Loader2, Play, Pause, Sparkles, User } from 'lucide-react';
import { DocumentContent, Language, Voice } from '../types';

interface AudioModuleProps {
  doc: DocumentContent;
  selectedLang: Language;
  loading: boolean;
  isSpeaking: boolean;
  audioGenerated: boolean;
  selectedVoice: Voice;
  voices: Voice[];
  audioQuotaUsed: number;
  audioQuotaLimit: number;
  onProcess: () => void;
  onPlayPause: () => void;
  onLanguageChange: (lang: Language) => void;
  onVoiceChange: (voice: Voice) => void;
  languages: Language[];
}

const AudioModule: React.FC<AudioModuleProps> = ({
  doc,
  selectedLang,
  loading,
  isSpeaking,
  audioGenerated,
  selectedVoice,
  voices,
  audioQuotaUsed,
  audioQuotaLimit,
  onProcess,
  onPlayPause,
  onLanguageChange,
  onVoiceChange,
  languages
}) => {
  const textToNarrate = doc.translatedText || doc.originalText;
  const quotaRemaining = audioQuotaLimit - audioQuotaUsed;
  const quotaPercentage = (audioQuotaUsed / audioQuotaLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <Volume2 className="inline-block w-8 h-8 mr-3 text-primary" />
            Conversão para Áudio
          </h1>
          <p className="text-muted-foreground">
            Transforme seu documento em narração com vozes premium
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedLang.code}
            onChange={(e) => onLanguageChange(languages.find(l => l.code === e.target.value) || languages[0])}
            className="bg-card border-2 border-border hover:border-primary rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm hover:shadow-md"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
            ))}
          </select>
          
          <select 
            value={selectedVoice.id}
            onChange={(e) => onVoiceChange(voices.find(v => v.id === e.target.value) || voices[0])}
            className="bg-card border-2 border-border hover:border-primary rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm hover:shadow-md"
            title={selectedVoice.description}
          >
            {voices.map(voice => (
              <option key={voice.id} value={voice.id}>
                {voice.gender === 'male' ? '👨' : '👩'} {voice.name}
              </option>
            ))}
          </select>
          
          <Button 
            onClick={onProcess}
            disabled={loading || quotaRemaining <= 0}
            size="lg"
            className="shadow-lg hover-lift brand-gradient"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Gerando Áudio...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Áudio
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Info + Quota Indicator */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info">
          {textToNarrate.split(' ').length} palavras
        </Badge>
        <Badge variant="outline">
          Idioma: {selectedLang.name}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <User className="w-3 h-3" />
          Voz: {selectedVoice.name}
        </Badge>
        {audioGenerated && (
          <Badge variant="success">
            Áudio pronto
          </Badge>
        )}
        
        {/* Quota Status */}
        <div className="ml-auto flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            Quota Diária:
          </div>
          {quotaRemaining > 0 ? (
            <Badge 
              variant={quotaRemaining <= 3 ? "warning" : "default"} 
              className="text-xs font-mono"
            >
              {quotaRemaining}/{audioQuotaLimit} disponíveis
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs animate-pulse">
              ⚠️ Quota esgotada - Aguarde até amanhã
            </Badge>
          )}
          
          {/* Progress Bar */}
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                quotaPercentage >= 100 ? 'bg-red-500' :
                quotaPercentage >= 70 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${quotaPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Documento Original
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            <div className="academic-text text-foreground whitespace-pre-line">
              {doc.originalText}
            </div>
          </CardContent>
        </Card>

        {/* Audio Player */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Reprodutor de Áudio
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {audioGenerated ? (
              <div className="space-y-6">
                {/* Audio Player Controls */}
                <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-xl border border-border">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E49B10] to-[#F5C344] flex items-center justify-center mb-6 shadow-xl">
                    <Volume2 className="w-16 h-16 text-[#3B2667]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Narração em {selectedLang.name} • Voz {selectedVoice.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    {selectedVoice.description}
                  </p>
                  <Button 
                    onClick={onPlayPause}
                    size="lg"
                    className="w-48 shadow-lg hover-lift brand-gradient"
                  >
                    {isSpeaking ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Reproduzir
                      </>
                    )}
                  </Button>
                </div>

                {/* Transcript */}
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                    Transcrição
                  </h4>
                  <div className="academic-text text-foreground whitespace-pre-line">
                    {textToNarrate}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Volume2 className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Aguardando conversão</p>
                <p className="text-sm">Selecione a voz e clique em "Gerar Áudio"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudioModule;
