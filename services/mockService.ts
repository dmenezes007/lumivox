// Mock service para demonstração sem API
export const mockTranslations = {
  'en': 'This is a simulated translation to English. In production mode, this would be powered by Google Gemini AI for accurate, context-aware translations of academic documents.',
  'pt': 'Esta é uma tradução simulada para Português. No modo de produção, isso seria alimentado pelo Google Gemini AI para traduções precisas e contextuais de documentos acadêmicos.',
  'es': 'Esta es una traducción simulada al español. En modo de producción, esto estaría impulsado por Google Gemini AI para traducciones precisas y contextuales de documentos académicos.',
  'fr': 'Ceci est une traduction simulée en français. En mode production, cela serait alimenté par Google Gemini AI pour des traductions précises et contextuelles de documents académiques.',
};

export const mockSummary = `
RESUMO EXECUTIVO (MODO DEMO)

Este é um resumo simulado do documento. No modo de produção com a API do Gemini, você teria:

• Análise contextual profunda
• Extração de metodologia
• Identificação de resultados principais
• Conclusões e implicações

PRINCIPAIS PONTOS:
- Análise baseada em IA generativa
- Compreensão do contexto acadêmico
- Síntese precisa e concisa

NOTA: Para funcionalidade completa, configure a GEMINI_API_KEY nas variáveis de ambiente.
`;

export const mockInsights = `
PRINCIPAIS INSIGHTS (MODO DEMO)

📊 Insight 1: Metodologia Inovadora
Simulação de análise de metodologia utilizada no documento.

💡 Insight 2: Resultados Significativos
Simulação de identificação de resultados principais.

🎯 Insight 3: Implicações Práticas
Simulação de análise de aplicações práticas.

⚠️ MODO DEMONSTRAÇÃO ATIVO
Configure a GEMINI_API_KEY para análises reais com IA.
`;

export async function mockTranslateAndAnalyze(
  text: string,
  targetLang: { code: string; name: string },
  mode: 'translate' | 'summarize' | 'analyze'
): Promise<string> {
  // Simula delay de processamento
  await new Promise(resolve => setTimeout(resolve, 1500));

  switch (mode) {
    case 'translate':
      return mockTranslations[targetLang.code as keyof typeof mockTranslations] || mockTranslations['en'];
    case 'summarize':
      return mockSummary;
    case 'analyze':
      return mockInsights;
    default:
      return 'Modo não suportado';
  }
}

export async function mockGenerateSpeech(
  text: string,
  languageCode: string
): Promise<string | null> {
  console.warn('⚠️ MODO DEMO: Text-to-Speech requer GEMINI_API_KEY');
  alert('🎤 Funcionalidade de áudio requer a API do Gemini.\n\nPara ativar:\n1. Obtenha uma chave gratuita em https://ai.google.dev\n2. Configure GEMINI_API_KEY no Vercel');
  return null;
}

// Usa a mesma variável que geminiService.ts
export const isDemoMode = !process.env.API_KEY || process.env.API_KEY === "";
