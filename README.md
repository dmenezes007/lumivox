# 🎯 LumiVox - AI Document Assistant

<div align="center">

![LumiVox Banner](https://img.shields.io/badge/LumiVox-AI%20Powered-blueviolet?style=for-the-badge&logo=react)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

**Traduza, analise e ouça seus documentos acadêmicos com inteligência artificial**

[Demo](https://lumivox.vercel.app) · [Reportar Bug](https://github.com/dmenezes007/lumivox/issues) · [Solicitar Feature](https://github.com/dmenezes007/lumivox/issues)

</div>

---

## ✨ Funcionalidades

- 🌐 **Tradução Multilíngue**: Traduza documentos para 8 idiomas diferentes
- 📝 **Resumo Inteligente**: Gere resumos acadêmicos concisos e precisos
- 💡 **Extração de Insights**: Identifique os principais pontos e insights do documento
- 🔊 **Text-to-Speech**: Ouça seus documentos com síntese de voz natural
- 📊 **Analytics Dashboard**: Visualize estatísticas e métricas de uso
- 🎨 **Dark Mode**: Interface moderna com tema escuro baseado na cor #362151
- 📱 **Responsivo**: Design adaptável para todos os dispositivos

## 🚀 Tech Stack

### Core
- **Framework**: [React 19.2.3](https://react.dev) com TypeScript
- **Build Tool**: [Vite 6.2](https://vitejs.dev)
- **AI Engine**: [Google Gemini AI](https://ai.google.dev)

### UI/UX
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com)
- **Components**: Baseados em [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Charts**: [Recharts 2.12](https://recharts.org)

### Utilities
- **Class Management**: `clsx` + `tailwind-merge`
- **Variants**: `class-variance-authority`
- **Document Processing**: PDF.js + Mammoth.js

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Chave de API do Google Gemini

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/dmenezes007/lumivox.git
cd lumivox
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave de API:
```env
GEMINI_API_KEY=sua_chave_api_aqui
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 🏗️ Build e Deploy

### Build Local
```bash
npm run build
npm run preview
```

### Deploy no Vercel

1. **Instale a CLI do Vercel**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Configure a variável de ambiente**
No dashboard do Vercel, adicione:
- `GEMINI_API_KEY`: Sua chave de API do Gemini

### Deploy Automático
Conecte seu repositório GitHub ao Vercel para deploy automático em cada push.

## 🎨 Estrutura do Projeto

```
lumivox/
├── components/          # Componentes React
│   ├── ui/             # Componentes base shadcn/ui
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── button.tsx
│   ├── AnalyticsChart.tsx
│   ├── BentoGrid.tsx
│   ├── FileUpload.tsx
│   ├── Sidebar.tsx
│   └── StatCard.tsx
├── lib/                # Utilitários
│   └── utils.ts
├── services/           # Serviços e APIs
│   └── geminiService.ts
├── App.tsx             # Componente principal
├── types.ts            # Definições TypeScript
├── index.css           # Estilos globais
├── index.tsx           # Entrada da aplicação
├── tailwind.config.js  # Configuração Tailwind
├── vite.config.ts      # Configuração Vite
└── vercel.json         # Configuração Vercel
```

## 🎯 Uso

### 1. Upload de Documento
- Clique em "Escolher Arquivo" ou arraste um documento
- Formatos suportados: PDF, DOCX, TXT

### 2. Escolha o Tipo de Análise
- **Tradução Completa**: Traduz todo o documento
- **Resumo Acadêmico**: Gera um resumo estruturado
- **Principais Insights**: Extrai os pontos-chave

### 3. Selecione o Idioma
- Escolha entre 8 idiomas disponíveis
- Clique em "Processar"

### 4. Ouça o Resultado
- Clique no botão "Ouvir" para síntese de voz
- Funciona tanto para original quanto para tradução

## 🎨 Temas e Customização

O projeto usa um sistema de design baseado em variáveis CSS:

```css
/* Dark Mode (Padrão) */
--background: #362151;  /* Cor de fundo principal */
--primary: hsl(264 70% 65%);
--card: #ffffff;  /* Cards com fundo branco */
```

Para customizar cores, edite `index.css`.

## 📊 Componentes Principais

### StatCard
```tsx
<StatCard
  title="Documentos Processados"
  value={42}
  trend="up"
  trendValue="+12%"
  icon={<FileText />}
/>
```

### BentoGrid
```tsx
<BentoGrid>
  <BentoGridItem span="double">
    <AnalyticsChart data={data} type="area" />
  </BentoGridItem>
</BentoGrid>
```

### AnalyticsChart
```tsx
<AnalyticsChart
  title="Performance"
  data={chartData}
  type="line" // ou "area", "bar"
/>
```

## 🔧 Configuração Avançada

### Adicionar Novos Idiomas

Edite `types.ts`:
```typescript
export const LANGUAGES: Language[] = [
  // ... idiomas existentes
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];
```

### Customizar Análises

Edite `geminiService.ts` para ajustar prompts do Gemini AI.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature incrível'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Davison Menezes**
- GitHub: [@dmenezes007](https://github.com/dmenezes007)

## 🙏 Agradecimentos

- [Google Gemini AI](https://ai.google.dev) pela API de IA
- [shadcn/ui](https://ui.shadcn.com) pela biblioteca de componentes
- [Lucide](https://lucide.dev) pelos ícones
- [Recharts](https://recharts.org) pelos gráficos

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Made with ❤️ by [Davison Menezes](https://github.com/dmenezes007)

</div>
