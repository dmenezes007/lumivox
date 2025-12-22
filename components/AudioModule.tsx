import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Volume2, Download, Loader2, Play, Pause, Sparkles } from 'lucide-react';
import { DocumentContent, Language } from '../types';

interface AudioModuleProps {
  doc: DocumentContent;
  selectedLang: Language;
  loading: boolean;
  isSpeaking: boolean;
  audioGenerated: boolean;
  onProcess: () => void;
  onPlayPause: () => void;
  onLanguageChange: (lang: Language) => void;
  languages: Language[];
}

const AudioModule: React.FC<AudioModuleProps> = ({
  doc,
  selectedLang,
  loading,
  isSpeaking,
  audioGenerated,
  onProcess,
  onPlayPause,
  onLanguageChange,
  languages
}) => {
  const handleDownload = () => {
    if (!audioGenerated) return;
    
    // In a real implementation, this would download the actual MP3
    // For now, we'll create a placeholder
    const blob = new Blob(['Audio data would be here'], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_audio.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const textToNarrate = doc.translatedText || doc.originalText;

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
            Transforme seu documento em narração de alta qualidade
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
          <Button 
            onClick={onProcess}
            disabled={loading}
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

      {/* Info */}
      <div className="flex items-center gap-2">
        <Badge variant="info">
          {textToNarrate.split(' ').length} palavras
        </Badge>
        <Badge variant="outline">
          Idioma: {selectedLang.name}
        </Badge>
        {audioGenerated && (
          <Badge variant="success">
            Áudio gerado
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
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Áudio Completo
            </CardTitle>
            {audioGenerated && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download MP3
              </Button>
            )}
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
                  <p className="text-sm text-muted-foreground mb-6">
                    Narração em {selectedLang.name}
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
                <p className="text-sm">Selecione o idioma e clique em "Gerar Áudio"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudioModule;
