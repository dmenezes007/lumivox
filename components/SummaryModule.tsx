import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, BookOpen, Download, Loader2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { DocumentContent } from '../types';

interface SummaryModuleProps {
  doc: DocumentContent;
  loading: boolean;
  summary?: string;
  onProcess: () => void;
}

const SummaryModule: React.FC<SummaryModuleProps> = ({
  doc,
  loading,
  summary,
  onProcess
}) => {
  const [isDocumentExpanded, setIsDocumentExpanded] = useState(false);
  
  const handleDownload = () => {
    if (!summary) return;
    
    const content = `${doc.title}\n${'='.repeat(60)}\n\nResumo Acadêmico\n\n${summary}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_resumo.txt`;
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
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3 text-primary" />
            Resumo Acadêmico
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Gere um resumo estruturado e conciso do seu documento
          </p>
        </div>
        
        {/* Botão */}
        <div>
          <Button 
            onClick={onProcess}
            disabled={loading}
            size="default"
            className="w-full md:w-auto shadow-lg hover-lift brand-gradient"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 md:mr-2 animate-spin" />
                <span className="hidden sm:inline">Gerando Resumo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                <span className="sm:inline">Gerar Resumo</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-2">
        <Badge variant="info">
          {doc.originalText.split(' ').length} palavras no original
        </Badge>
        {summary && (
          <Badge variant="success">
            {summary.split(' ').length} palavras no resumo
          </Badge>
        )}
      </div>

      {/* Document Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <Card className={`flex flex-col ${isDocumentExpanded ? 'h-[600px]' : 'h-auto'}`}>
          <CardHeader 
            className="border-b border-border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setIsDocumentExpanded(!isDocumentExpanded)}
          >
            <CardTitle className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-muted-foreground" />
                Documento Original
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {doc.originalText.split(' ').length} palavras
                </Badge>
                {isDocumentExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardTitle>
          </CardHeader>
          {isDocumentExpanded && (
            <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <div className="academic-text text-foreground whitespace-pre-line">
                {doc.originalText}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Summary */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Resumo Acadêmico
            </CardTitle>
            {summary && (
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
            {summary ? (
              <div className="academic-text text-foreground whitespace-pre-line">
                {summary}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Aguardando resumo</p>
                <p className="text-sm">Clique em "Gerar Resumo" para processar o documento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryModule;
