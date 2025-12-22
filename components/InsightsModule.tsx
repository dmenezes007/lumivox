import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Lightbulb, Download, Loader2, Sparkles } from 'lucide-react';
import { DocumentContent } from '../types';

interface InsightsModuleProps {
  doc: DocumentContent;
  loading: boolean;
  insights?: string;
  onProcess: () => void;
}

const InsightsModule: React.FC<InsightsModuleProps> = ({
  doc,
  loading,
  insights,
  onProcess
}) => {
  const handleDownload = () => {
    if (!insights) return;
    
    const content = `${doc.title}\n${'='.repeat(60)}\n\nPrincipais Insights\n\n${insights}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_insights.txt`;
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
            <Lightbulb className="inline-block w-8 h-8 mr-3 text-primary" />
            Principais Insights
          </h1>
          <p className="text-muted-foreground">
            Extraia os pontos-chave e ideias principais do documento
          </p>
        </div>
        <Button 
          onClick={onProcess}
          disabled={loading}
          size="lg"
          className="shadow-lg hover-lift brand-gradient"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Extraindo Insights...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Extrair Insights
            </>
          )}
        </Button>
      </div>

      {/* Info */}
      <div className="flex items-center gap-2">
        <Badge variant="info">
          {doc.originalText.split(' ').length} palavras analisadas
        </Badge>
        {insights && (
          <Badge variant="success">
            Insights extraídos com sucesso
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

        {/* Insights */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Principais Insights
            </CardTitle>
            {insights && (
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
            {insights ? (
              <div className="academic-text text-foreground whitespace-pre-line space-y-4">
                {insights}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Lightbulb className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Aguardando análise</p>
                <p className="text-sm">Clique em "Extrair Insights" para identificar pontos-chave</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsModule;
