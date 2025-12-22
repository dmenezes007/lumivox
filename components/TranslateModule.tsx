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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <Languages className="inline-block w-8 h-8 mr-3 text-primary" />
            Tradução de Documento
          </h1>
          <p className="text-muted-foreground">
            Traduza seu documento de forma completa e precisa
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
                Traduzindo...
              </>
            ) : (
              <>
                <Languages className="w-5 h-5 mr-2" />
                Traduzir
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
