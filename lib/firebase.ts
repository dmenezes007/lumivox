import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração Firebase - Use variáveis de ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID
};

// Validação de configuração (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('🔥 Firebase Config Status:');
  console.log('API Key:', firebaseConfig.apiKey ? '✅ Configurado' : '❌ Faltando');
  console.log('Auth Domain:', firebaseConfig.authDomain ? '✅ Configurado' : '❌ Faltando');
  console.log('Project ID:', firebaseConfig.projectId ? '✅ Configurado' : '❌ Faltando');
  
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.error('⚠️ FIREBASE NÃO CONFIGURADO! Crie um arquivo .env com as variáveis:');
    console.error('VITE_FIREBASE_API_KEY=...');
    console.error('VITE_FIREBASE_AUTH_DOMAIN=...');
    console.error('VITE_FIREBASE_PROJECT_ID=...');
    console.error('Consulte FIREBASE_SETUP.md para mais informações.');
  }
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);

export default app;
