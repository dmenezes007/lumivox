import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Languages, Download, Loader2 } from 'lucide-react';
import { DocumentContent, Language } from '../types';

interface TranslateModuleProps {
  doc: DocumentContent;
  selectedLang: Language;
  loading: boolean;
  onProcess: () => void;
  onLanguageChange: (lang: Language) => void;
  languages: Language[];
}

const TranslateModule: React.FC<TranslateModuleProps> = ({
  doc,
  selectedLang,
  loading,
  onProcess,
  onLanguageChange,
  languages
}) => {
  const handleDownload = () => {
    if (!doc.translatedText) return;
    
    // Create text content for download
    const content = `${doc.title}\n${'='.repeat(60)}\n\nTraduzido para: ${doc.targetLanguage}\n\n${doc.translatedText}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_traduzido.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header - Reorganizado para Mobile */}
      <div className="flex flex-col space-y-4">
        {/* Título e Subtítulo */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center">
            <Languages className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-primary" />
            Tradução de Documento
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Traduza seu documento de forma completa e precisa
          </p>
        </div>
        
        {/* Botões lado a lado no mobile */}
        <div className="flex items-center gap-2 md:gap-3">
          <select 
            value={selectedLang.code}
            onChange={(e) => onLanguageChange(languages.find(l => l.code === e.target.value) || languages[0])}
            className="flex-1 bg-card border-2 border-border hover:border-primary rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm hover:shadow-md"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
            ))}
          </select>
          <Button 
            onClick={onProcess}
            disabled={loading}
            size="default"
            className="shadow-lg hover-lift brand-gradient whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 md:mr-2 animate-spin" />
                <span className="hidden md:inline">Traduzindo...</span>
              </>
            ) : (
              <>
                <Languages className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                <span className="hidden sm:inline">Traduzir</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Info */}
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

        {/* Translation */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              Tradução Completa
            </CardTitle>
            {doc.translatedText && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download TXT
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {doc.translatedText ? (
              <div className="academic-text text-foreground whitespace-pre-line">
                {doc.translatedText}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Languages className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Aguardando tradução</p>
                <p className="text-sm">Selecione o idioma e clique em "Traduzir"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranslateModule;
