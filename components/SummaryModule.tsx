import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, BookOpen, Download, Loader2, Sparkles } from 'lucide-react';
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
  const handleDownload = () => {
    if (!summary) return;
    
    const content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${doc.title} - Resumo</title>
</head>
<body>
  <h1>${doc.title}</h1>
  <h2>Resumo Acadêmico</h2>
  <p>${summary.replace(/\n/g, '</p><p>')}</p>
</body>
</html>`;
    
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\.[^/.]+$/, '')}_resumo.docx`;
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
            <BookOpen className="inline-block w-8 h-8 mr-3 text-primary" />
            Resumo Acadêmico
          </h1>
          <p className="text-muted-foreground">
            Gere um resumo estruturado e conciso do seu documento
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
              Gerando Resumo...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Gerar Resumo
            </>
          )}
        </Button>
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
                Download DOCX
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
