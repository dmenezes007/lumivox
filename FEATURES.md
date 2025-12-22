# 📋 Documentação de Funcionalidades - LumiVox

## 🎨 Design System

### Paleta de Cores (Dark Mode)

```css
/* Background Principal */
--background: #362151  /* Roxo escuro (baseado na logo) */

/* Cards e Superfícies */
--card: #ffffff  /* Branco para contraste */

/* Cores Primárias */
--primary: hsl(264, 70%, 65%)  /* Roxo primário */

/* Borders e Divisores */
--border: hsl(264, 20%, 30%)  /* Roxo escuro suave */
```

### Componentes UI Implementados

#### 1. **Card Component** (`components/ui/card.tsx`)
- Baseado no shadcn/ui
- Variantes: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Estilo: Fundo branco, bordas arredondadas (12px), sombras suaves

#### 2. **Badge Component** (`components/ui/badge.tsx`)
- Badges coloridos com fundos pastéis
- Variantes: default, secondary, destructive, outline, success, warning, info
- Uso: Indicação de status, categorias, tags

#### 3. **Button Component** (`components/ui/button.tsx`)
- Variantes: default, destructive, outline, secondary, ghost, link
- Tamanhos: sm, default, lg, icon
- Transições suaves e estados de hover/focus

## 🏗️ Componentes Principais

### 1. **Sidebar** (`components/Sidebar.tsx`)

**Características:**
- Fixa à esquerda (64px de largura: w-64)
- Navegação com ícones Lucide React
- Highlight visual para item ativo
- Logo e branding no topo
- Ações rápidas no rodapé

**Menu Items:**
- Home (🏠)
- Tradução (🌐)
- Resumo (📖)
- Insights (💡)
- Áudio (🔊)
- Analytics (📊)
- Configurações (⚙️)

### 2. **StatCard** (`components/StatCard.tsx`)

**Características:**
- Valor principal em fonte grande e bold (3xl)
- Indicador de tendência (verde ↑, vermelho ↓, cinza →)
- Ícone opcional no canto superior direito
- Subtítulo descritivo
- Hover effect com shadow

**Exemplo de Uso:**
```tsx
<StatCard
  title="Documentos Processados"
  value={42}
  trend="up"
  trendValue="+12%"
  subtitle="Este mês"
  icon={<FileText className="w-6 h-6" />}
/>
```

### 3. **BentoGrid** (`components/BentoGrid.tsx`)

**Características:**
- Layout em grid responsivo
- Breakpoints: 1 col (mobile), 2 cols (md), 3 cols (lg)
- Suporte a items que ocupam múltiplas colunas
- Gap uniforme de 4 unidades (1rem)

**Spans Disponíveis:**
- `single`: 1 coluna
- `double`: 2 colunas (md)
- `triple`: 3 colunas (lg)

### 4. **AnalyticsChart** (`components/AnalyticsChart.tsx`)

**Tipos de Gráficos:**

#### Line Chart
- Linha suave (monotone)
- Pontos de dados destacados
- Grid com linhas tracejadas

#### Area Chart
- Gradiente de preenchimento
- Área sob a curva colorida
- Visual moderno e elegante

#### Bar Chart
- Barras com bordas arredondadas no topo
- Cores consistentes com o tema
- Ideal para comparações

**Configurações:**
- Responsivo (100% width)
- Altura padrão: 300px
- Tooltip customizado
- Eixos X e Y com labels
- Cores do tema aplicadas

## 🎯 Funcionalidades Principais

### 1. Upload de Documentos

**Formatos Suportados:**
- PDF (via PDF.js)
- DOCX (via Mammoth.js)
- TXT (nativo)

**Recursos:**
- Drag & drop
- Click para selecionar
- Validação de tipo de arquivo
- Feedback visual de progresso

### 2. Processamento com IA

**Modos de Análise:**

#### Tradução Completa
- Tradução integral do documento
- 8 idiomas disponíveis
- Preservação de formatação
- Contexto acadêmico

#### Resumo Acadêmico
- Extração dos principais pontos
- Estrutura organizada
- Metodologia destacada
- Conclusões resumidas

#### Extração de Insights
- Principais descobertas
- Pontos de destaque
- Implicações práticas
- Recomendações

### 3. Text-to-Speech (TTS)

**Características:**
- Síntese de voz natural (Gemini AI)
- Suporte multi-idioma
- Controles de play/pause
- Indicador visual de reprodução
- Buffer automático de áudio

**Implementação:**
- Web Audio API
- Taxa de amostragem: 24kHz
- Decodificação em tempo real
- Gerenciamento de memória otimizado

### 4. Dashboard de Analytics

**KPIs Exibidos:**
- Total de documentos processados
- Tempo médio de processamento
- Taxa de sucesso
- Horas de áudio gerado

**Visualizações:**
- Gráfico de linha: Documentos por mês
- Gráfico de área: Tendências temporais
- Gráfico de barras: Performance comparativa

## 🔧 Configurações Técnicas

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
{
  darkMode: ["class"],  // Dark mode via classe CSS
  theme: {
    extend: {
      colors: {
        // Sistema de cores HSL para fácil customização
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... mais cores
      },
      borderRadius: {
        lg: "var(--radius)",  // 0.5rem
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      }
    }
  }
}
```

### Vite Configuration

```typescript
// vite.config.ts
{
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  define: {
    'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
}
```

## 📱 Responsividade

### Breakpoints Tailwind

- **sm**: 640px - Tablets pequenos
- **md**: 768px - Tablets
- **lg**: 1024px - Desktops
- **xl**: 1280px - Desktops grandes

### Layout Adaptável

#### Mobile (< 768px)
- Sidebar oculta (pode-se adicionar menu hamburger)
- Cards em coluna única
- Padding reduzido
- Fonte ajustada

#### Tablet (768px - 1024px)
- 2 colunas no BentoGrid
- Sidebar visível
- Navegação completa

#### Desktop (> 1024px)
- 3 colunas no BentoGrid
- Sidebar fixa
- Layout otimizado
- Espaçamentos generosos

## 🚀 Performance

### Otimizações Implementadas

1. **Code Splitting**
   - Lazy loading de componentes pesados
   - Dynamic imports para rotas

2. **Asset Optimization**
   - Imagens otimizadas
   - Fonts preloaded
   - CSS minificado

3. **Caching**
   - Service Worker (pode-se adicionar)
   - LocalStorage para preferências
   - SessionStorage para dados temporários

4. **Bundle Size**
   - Tree-shaking automático
   - Dead code elimination
   - Minificação em produção

## 🔐 Segurança

### Variáveis de Ambiente

```env
# .env.local (não commitar!)
GEMINI_API_KEY=sua_chave_aqui
```

### Boas Práticas

- API Key nunca exposta no frontend
- Validação de inputs
- Sanitização de dados
- Headers de segurança no Vercel

## 📊 Métricas e Monitoramento

### Sugestões de Implementação

1. **Analytics**
   - Google Analytics 4
   - Vercel Analytics
   - Plausible (privacy-friendly)

2. **Error Tracking**
   - Sentry
   - LogRocket
   - Bugsnag

3. **Performance Monitoring**
   - Lighthouse CI
   - Web Vitals
   - Bundle Analyzer

## 🎓 Próximos Passos Sugeridos

### Features Futuras

1. **Autenticação**
   - Login social (Google, GitHub)
   - Perfis de usuário
   - Histórico de documentos

2. **Colaboração**
   - Compartilhamento de documentos
   - Comentários e anotações
   - Trabalho em equipe

3. **Exportação**
   - PDF com tradução
   - DOCX formatado
   - Markdown export

4. **Integração**
   - Google Drive
   - Dropbox
   - OneDrive

5. **Melhorias de IA**
   - Detecção automática de idioma
   - Sugestões contextuais
   - Comparação de versões

## 📚 Recursos Adicionais

- [Documentação do Gemini AI](https://ai.google.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Recharts Documentation](https://recharts.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

---

**Última Atualização:** Dezembro 2024  
**Versão:** 1.0.0  
**Autor:** Davison Menezes
