
import { GoogleGenAI, Modality } from "@google/genai";
import { Language } from "../types";
import { mockTranslateAndAnalyze, mockGenerateSpeech, isDemoMode } from "./mockService";

const API_KEY = process.env.API_KEY || "";

// Verifica se a API está disponível
const hasApiKey = !!API_KEY && API_KEY !== "";

// Log de diagnóstico (apenas em desenvolvimento)
if (typeof window !== 'undefined') {
  console.log('🔑 Status da API:', hasApiKey ? '✅ Configurada' : '⚠️ Não configurada (MODO DEMO)');
}

export const translateAndAnalyze = async (
  text: string, 
  targetLang: Language,
  mode: 'translate' | 'summarize' | 'analyze'
) => {
  // Se não tiver API key, usa modo demo
  if (!hasApiKey) {
    console.warn('⚠️ MODO DEMO ATIVO: Configure GEMINI_API_KEY para funcionalidade completa');
    return mockTranslateAndAnalyze(text, targetLang, mode);
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstructions = `
    You are an expert academic research assistant. 
    Your goal is to provide high-quality, precise translations or analysis of scholarly documents.
    Always maintain the formal academic tone, preserve technical terminology correctly, and respect the original context.
  `;

  let prompt = "";
  if (mode === 'translate') {
    prompt = `Translate the following academic text into ${targetLang.name}. Provide ONLY the translated text.\n\nText: ${text.substring(0, 15000)}`;
  } else if (mode === 'summarize') {
    prompt = `Summarize the following academic text in ${targetLang.name}. Focus on the objective, methodology, and key findings. Format with markdown headers.\n\nText: ${text.substring(0, 15000)}`;
  } else {
    prompt = `Extract the key insights, main arguments, and potential limitations of this research in ${targetLang.name}. Use bullet points.\n\nText: ${text.substring(0, 15000)}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstructions,
        temperature: 0.3,
      },
    });

    return response.text;
  } catch (error) {
    console.error('❌ Erro na API do Gemini:', error);
    console.warn('⚠️ Alternando para modo demo devido a erro na API');
    return mockTranslateAndAnalyze(text, targetLang, mode);
  }
};

export const generateSpeech = async (text: string, languageCode: string) => {
  // Se não tiver API key, usa modo demo
  if (!hasApiKey) {
    console.warn('⚠️ generateSpeech: API Key não configurada, usando modo demo');
    return mockGenerateSpeech(text, languageCode);
  }

  try {
    console.log('🎤 Gerando áudio com Gemini API...');
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Mapping some common codes to voices
    const voiceName = languageCode === 'pt' ? 'Kore' : 'Zephyr';

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text.substring(0, 1000) }] }], // Limit to 1000 chars for demo TTS
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      console.error('❌ API retornou resposta mas sem dados de áudio');
      console.log('📊 Resposta completa:', response);
      return null;
    }
    
    console.log('✅ Áudio gerado com sucesso, tamanho:', base64Audio.length);
    return base64Audio;
  } catch (error: any) {
    // Tratamento específico para erro de quota
    if (error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      console.error('🚫 Limite de quota da API Gemini TTS excedido');
      console.warn('📊 Limite gratuito: 10 requisições/dia');
      console.info('💡 Aguarde 24h ou atualize para plano pago');
      
      // Retorna erro específico que será tratado no App
      throw new Error('QUOTA_EXCEEDED');
    }
    
    console.error('❌ Erro ao gerar áudio com API:', error);
    return null;
  }
};

// Audio decoding helper
export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
