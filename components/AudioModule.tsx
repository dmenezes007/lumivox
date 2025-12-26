import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Volume2, Loader2, Play, Pause, Sparkles, User } from 'lucide-react';
import { DocumentContent, Voice } from '../types';

interface AudioModuleProps {
  doc: DocumentContent;
  loading: boolean;
  isSpeaking: boolean;
  audioGenerated: boolean;
  selectedVoice: Voice;
  voices: Voice[];
  onProcess: () => void;
  onPlayPause: () => void;
  onVoiceChange: (voice: Voice) => void;
}

const AudioModule: React.FC<AudioModuleProps> = ({
  doc,
  loading,
  isSpeaking,
  audioGenerated,
  selectedVoice,
  voices,
  onProcess,
  onPlayPause,
  onVoiceChange
}) => {
  const textToNarrate = doc.translatedText || doc.originalText;

  return (
    <div className="space-y-6">
      {/* Header - Reorganizado para Mobile */}
      <div className="flex flex-col space-y-4">
        {/* Título e Subtítulo */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center">
            <Volume2 className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-primary" />
            Conversão para Áudio
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Transforme seu documento em narração com vozes premium
          </p>
        </div>
        
        {/* Botões lado a lado no mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
          <select 
            value={selectedVoice.id}
            onChange={(e) => onVoiceChange(voices.find(v => v.id === e.target.value) || voices[0])}
            className="flex-1 bg-card border-2 border-border hover:border-primary rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm hover:shadow-md"
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
            disabled={loading}
            size="default"
            className="w-full sm:w-auto shadow-lg hover-lift brand-gradient whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 md:mr-2 animate-spin" />
                <span className="hidden sm:inline">Gerando Áudio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                <span className="sm:inline">Gerar Áudio</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Info e Status de Processamento */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info">
          {textToNarrate.split(' ').length} palavras
        </Badge>
        <Badge variant="outline" className="gap-1">
          <User className="w-3 h-3" />
          Voz: {selectedVoice.name}
        </Badge>
        
        {/* Status de Processamento */}
        {loading && (
          <Badge variant="warning" className="gap-2 animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin" />
            Gerando áudio... Aguarde
          </Badge>
        )}
        
        {!loading && audioGenerated && (
          <Badge variant="success" className="gap-1">
            <Play className="w-3 h-3" />
            Áudio pronto para reprodução!
          </Badge>
        )}
        
        {!loading && !audioGenerated && (
          <Badge variant="outline" className="text-muted-foreground">
            Selecione uma voz e clique em "Gerar Áudio"
          </Badge>
        )}
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
                    Narração com voz {selectedVoice.name}
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
