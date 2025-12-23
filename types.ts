
export interface DocumentContent {
  title: string;
  originalText: string;
  translatedText?: string;
  summary?: string;
  keyInsights?: string[];
  methodology?: string;
  targetLanguage?: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

export enum AnalysisMode {
  Summary = 'SUMMARY',
  FullTranslation = 'TRANSLATION',
  Insights = 'INSIGHTS'
}

export interface DocumentHistory {
  id: string;
  filename: string;
  date: Date;
  status: 'success' | 'error' | 'processing';
  processingTime: number;
  wordCount: number;
  language: string;
  userId: string;
}

export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  language: string;
  description: string;
}

export const GEMINI_VOICES: Voice[] = [
  { id: 'Puck', name: 'Puck', gender: 'male', language: 'en', description: 'Voz masculina expressiva' },
  { id: 'Charon', name: 'Charon', gender: 'male', language: 'en', description: 'Voz masculina profunda' },
  { id: 'Kore', name: 'Kore', gender: 'female', language: 'en', description: 'Voz feminina suave' },
  { id: 'Fenrir', name: 'Fenrir', gender: 'male', language: 'en', description: 'Voz masculina forte' },
  { id: 'Aoede', name: 'Aoede', gender: 'female', language: 'en', description: 'Voz feminina melódica' },
  { id: 'Zephyr', name: 'Zephyr', gender: 'male', language: 'en', description: 'Voz masculina leve' }
];
