# 🔐 Guia de Configuração Firebase - IluminaVox

## 🚀 Passo a Passo

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `iluminavox` (ou outro nome)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**

### 2. Configurar Autenticação

1. No menu lateral, vá em **"Authentication"** (Autenticação)
2. Clique em **"Get Started"** (Começar)
3. Ative os provedores de login:

#### Email/Senha:
- Clique em **"Email/Password"**
- Ative **"Email/Password"**
- Clique em **"Salvar"**

#### Google (Opcional):
- Clique em **"Google"**
- Ative o provedor
- Configure email de suporte
- Clique em **"Salvar"**

### 3. Obter Credenciais

1. Clique no ícone de **engrenagem** (⚙️) ao lado de **"Visão geral do projeto"**
2. Selecione **"Configurações do projeto"**
3. Na aba **"Geral"**, role até **"Seus aplicativos"**
4. Clique no ícone **"</>"** (Web)
5. Registre o app:
   - Apelido: `iluminavox-web`
   - **NÃO** marque Firebase Hosting
   - Clique em **"Registrar app"**

6. **Copie as credenciais** que aparecem:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "iluminavox-xxxxx.firebaseapp.com",
  projectId: "iluminavox-xxxxx",
  storageBucket: "iluminavox-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

### 4. Configurar Variáveis de Ambiente

#### Desenvolvimento Local:

Crie o arquivo \`.env\` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=iluminavox-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=iluminavox-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=iluminavox-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx

# Gemini API (já configurado)
GEMINI_API_KEY=your_existing_key
```

#### Produção (Vercel):

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto **iluminavox**
3. Vá em **Settings** → **Environment Variables**
4. Adicione cada variável:
   - \`VITE_FIREBASE_API_KEY\`
   - \`VITE_FIREBASE_AUTH_DOMAIN\`
   - \`VITE_FIREBASE_PROJECT_ID\`
   - \`VITE_FIREBASE_STORAGE_BUCKET\`
   - \`VITE_FIREBASE_MESSAGING_SENDER_ID\`
   - \`VITE_FIREBASE_APP_ID\`
5. Clique em **"Redeploy"** após adicionar todas

### 5. Testar Localmente

\`\`\`bash
npm run dev
\`\`\`

A aplicação deve:
1. ✅ Mostrar splash screen
2. ✅ Exibir tela de login
3. ✅ Permitir cadastro com email/senha
4. ✅ Permitir login com Google
5. ✅ Redirecionar para app após autenticação

### 6. Adicionar Usuários de Teste (Opcional)

No Firebase Console:
1. **Authentication** → **Users**
2. Clique em **"Add user"**
3. Digite email e senha
4. Use essas credenciais para testar

## 🔧 Funcionalidades Implementadas

### ✅ Autenticação:
- ✉️ Login com Email/Senha
- 🔐 Cadastro de novos usuários
- 🔒 Login com Google
- 🚪 Logout
- 👤 Gerenciamento de sessão
- ⚠️ Mensagens de erro personalizadas

### ✅ Proteção de Rotas:
- Splash screen → Login → App
- Redirecionamento automático após logout
- Persistência de sessão (refresh mantém login)

### ✅ UI/UX:
- Indicadores de loading
- Toasts de sucesso/erro
- Email do usuário no sidebar
- Botão de logout com confirmação visual

## 🛡️ Segurança

### Regras de Firestore (Opcional):

Se precisar adicionar banco de dados futuramente:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /documents/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
\`\`\`

### Firebase Storage Rules:

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
\`\`\`

## 📊 Monitoramento

No Firebase Console:
- **Authentication → Users**: Ver usuários cadastrados
- **Usage**: Monitorar uso de autenticação
- **Settings → Service accounts**: Gerenciar permissões

## 🐛 Troubleshooting

### Erro: "Firebase App not initialized"
**Solução:** Verifique se as variáveis de ambiente estão corretas

### Erro: "auth/configuration-not-found"
**Solução:** Ative Email/Password no Firebase Console → Authentication

### Erro: "auth/popup-blocked"
**Solução:** Permita pop-ups do navegador para login com Google

### Erro: "Missing API key"
**Solução:** Verifique se \`VITE_FIREBASE_API_KEY\` está configurado

## 📚 Recursos Úteis

- [Documentação Firebase Auth](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🎯 Próximos Passos

1. ✅ Implementar recuperação de senha
2. ✅ Adicionar verificação de email
3. 📱 Implementar perfil de usuário
4. 💾 Adicionar histórico de documentos por usuário
5. 🌐 Multi-tenant (organizações)

---

**🔒 Autenticação configurada com sucesso!**
