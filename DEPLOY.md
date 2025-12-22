# 🚀 Guia Rápido de Deploy

## Pré-requisitos

- Node.js 18+
- Conta no GitHub
- Conta no Vercel

## Passo 1: Preparar o Repositório

```bash
# Inicializar git (se ainda não estiver inicializado)
git init

# Adicionar todos os arquivos
git add .

# Fazer o commit inicial
git commit -m "feat: Implementação completa do LumiVox com dark mode"

# Adicionar repositório remoto (substitua pelo seu)
git remote add origin https://github.com/dmenezes007/lumivox.git

# Push para o GitHub
git push -u origin main
```

## Passo 2: Deploy no Vercel

### Opção A: Via CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Opção B: Via Dashboard

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente:
   - `GEMINI_API_KEY`: Sua chave de API do Google Gemini
5. Clique em "Deploy"

## Passo 3: Configurar Variáveis de Ambiente

No Dashboard do Vercel:

1. Vá em "Settings" > "Environment Variables"
2. Adicione:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua chave de API
   - **Environment**: Production, Preview, Development

## Passo 4: Verificar Deploy

- Seu app estará disponível em: `https://seu-projeto.vercel.app`
- Cada commit na branch `main` criará um novo deploy automático

## Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Verificar erros TypeScript
npx tsc --noEmit

# Verificar erros do Tailwind
npx tailwindcss -i ./index.css -o ./dist/output.css --watch
```

## Solução de Problemas

### Erro: "GEMINI_API_KEY não definida"
- Verifique se a variável está configurada no Vercel
- Reforce o deploy após adicionar a variável

### Erro de Build
- Verifique se todas as dependências estão no package.json
- Execute `npm install` localmente
- Teste o build local: `npm run build`

### Erro de Import
- Certifique-se de que todos os imports usam caminhos relativos corretos
- Verifique se não há imports circulares

## Estrutura de Branches (Recomendado)

```
main          # Produção
├── develop   # Desenvolvimento
├── feature/* # Features específicas
└── hotfix/*  # Correções urgentes
```

## Variáveis de Ambiente Necessárias

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `GEMINI_API_KEY` | Chave da API do Google Gemini | ✅ Sim |

## Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Vite](https://vitejs.dev)
- [Documentação Gemini AI](https://ai.google.dev)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)

## Suporte

Para problemas ou dúvidas:
- Abra uma [Issue no GitHub](https://github.com/dmenezes007/lumivox/issues)
- Consulte a [Documentação](README.md)
