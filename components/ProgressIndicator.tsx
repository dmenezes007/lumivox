import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  progress?: number;
  message?: string;
  estimatedTime?: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  status, 
  progress = 0, 
  message,
  estimatedTime 
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 0.1);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setElapsedTime(0);
    }
  }, [status]);

  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full">
      <div className="glass-effect rounded-lg p-4 shadow-2xl border border-primary/20 hover-lift">
        <div className="flex items-start gap-3">
          {status === 'processing' && (
            <Loader2 className="w-6 h-6 text-primary animate-spin flex-shrink-0" />
          )}
          {status === 'success' && (
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
          )}
          {status === 'error' && (
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          )}
          
          <div className="flex-1 space-y-2">
            <p className="font-semibold text-foreground">
              {status === 'processing' && 'Processando Documento'}
              {status === 'success' && 'Processamento Concluído!'}
              {status === 'error' && 'Erro no Processamento'}
            </p>
            
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
            
            {status === 'processing' && (
              <>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill shimmer" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progress)}%</span>
                  <span>
                    {elapsedTime.toFixed(1)}s
                    {estimatedTime && ` / ~${estimatedTime.toFixed(1)}s`}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
