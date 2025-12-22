# 🔧 Snippets e Exemplos de Uso - LumiVox

## 📦 Importações Comuns

```typescript
// Componentes UI
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

// Componentes Customizados
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { BentoGrid, BentoGridItem } from './components/BentoGrid';
import AnalyticsChart from './components/AnalyticsChart';

// Ícones
import { FileText, Home, Settings, TrendingUp, TrendingDown } from 'lucide-react';

// Utilitários
import { cn } from './lib/utils';
```

---

## 🎨 Exemplos de Componentes

### StatCard

```tsx
// Exemplo básico
<StatCard
  title="Total de Usuários"
  value={1234}
/>

// Com tendência positiva
<StatCard
  title="Documentos Processados"
  value={42}
  trend="up"
  trendValue="+15%"
/>

// Com ícone e subtítulo
<StatCard
  title="Taxa de Sucesso"
  value="98.5%"
  trend="up"
  trendValue="+2.1%"
  subtitle="Últimos 30 dias"
  icon={<TrendingUp className="w-6 h-6" />}
/>

// Tendência negativa (otimização)
<StatCard
  title="Tempo Médio"
  value="3.2s"
  trend="down"
  trendValue="-8%"
  subtitle="Melhoria de performance"
  icon={<Clock className="w-6 h-6" />}
/>
```

### Card

```tsx
// Card simples
<Card>
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
</Card>

// Card completo
<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo principal</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>

// Card com className customizado
<Card className="hover:shadow-lg transition-shadow">
  <CardContent className="p-8">
    <h3 className="text-2xl font-bold">Título</h3>
    <p className="text-muted-foreground">Subtítulo</p>
  </CardContent>
</Card>
```

### Badge

```tsx
// Badges de status
<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="destructive">Erro</Badge>
<Badge variant="info">Informação</Badge>

// Badge padrão
<Badge>Default</Badge>

// Badge com outline
<Badge variant="outline">Outline</Badge>

// Combinando badges
<div className="flex gap-2">
  <Badge variant="success">Traduzido</Badge>
  <Badge variant="info">PT-BR</Badge>
  <Badge>Premium</Badge>
</div>
```

### Button

```tsx
// Variantes
<Button variant="default">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Deletar</Button>
<Button variant="link">Link</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
<Button size="icon"><Settings /></Button>

// Com ícones
<Button>
  <FileText className="w-4 h-4 mr-2" />
  Upload
</Button>

// Disabled
<Button disabled>Processando...</Button>

// Loading state
<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  Aguarde...
</Button>
```

### BentoGrid

```tsx
// Grid básico
<BentoGrid>
  <BentoGridItem>
    <StatCard title="Métrica 1" value={100} />
  </BentoGridItem>
  <BentoGridItem>
    <StatCard title="Métrica 2" value={200} />
  </BentoGridItem>
  <BentoGridItem>
    <StatCard title="Métrica 3" value={300} />
  </BentoGridItem>
</BentoGrid>

// Com spans diferentes
<BentoGrid>
  <BentoGridItem>
    <StatCard title="KPI 1" value={100} />
  </BentoGridItem>
  <BentoGridItem>
    <StatCard title="KPI 2" value={200} />
  </BentoGridItem>
  <BentoGridItem>
    <StatCard title="KPI 3" value={300} />
  </BentoGridItem>
  <BentoGridItem span="double">
    <AnalyticsChart title="Gráfico Grande" data={data} type="area" />
  </BentoGridItem>
  <BentoGridItem>
    <Card>
      <CardContent>Outro widget</CardContent>
    </Card>
  </BentoGridItem>
</BentoGrid>

// Layout complexo
<BentoGrid className="gap-6">
  <BentoGridItem span="triple">
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Principal</CardTitle>
      </CardHeader>
    </Card>
  </BentoGridItem>
  <BentoGridItem span="double">
    <AnalyticsChart data={monthlyData} type="area" />
  </BentoGridItem>
  <BentoGridItem>
    <StatCard title="Total" value={999} trend="up" />
  </BentoGridItem>
</BentoGrid>
```

### AnalyticsChart

```tsx
// Gráfico de linha
<AnalyticsChart
  title="Crescimento Mensal"
  description="Documentos processados por mês"
  data={[
    { name: 'Jan', value: 12 },
    { name: 'Fev', value: 19 },
    { name: 'Mar', value: 15 },
    // ...
  ]}
  type="line"
/>

// Gráfico de área com gradiente
<AnalyticsChart
  title="Tendência de Uso"
  data={chartData}
  type="area"
  dataKey="value"
/>

// Gráfico de barras
<AnalyticsChart
  title="Comparativo de Performance"
  data={performanceData}
  type="bar"
  dataKey="time"
  className="h-[400px]"
/>

// Com múltiplos dataKeys (customização necessária)
const data = [
  { name: 'Jan', uploads: 12, downloads: 8 },
  { name: 'Fev', uploads: 19, downloads: 14 },
];
```

### Sidebar

```tsx
// Uso básico
<Sidebar 
  activeView="home"
  onViewChange={(view) => setActiveView(view)}
  onUploadNew={() => handleUpload()}
/>

// Com controle de estado
const [currentView, setCurrentView] = useState('home');

<Sidebar
  activeView={currentView}
  onViewChange={setCurrentView}
  onUploadNew={() => {
    setDocument(null);
    setCurrentView('home');
  }}
/>
```

---

## 🎯 Padrões de Layout

### Dashboard com KPIs

```tsx
function DashboardView() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <BentoGrid>
        <BentoGridItem>
          <StatCard
            title="Total"
            value={1234}
            trend="up"
            trendValue="+12%"
            icon={<Users className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem>
          <StatCard
            title="Ativo"
            value={567}
            trend="up"
            trendValue="+8%"
            icon={<Activity className="w-6 h-6" />}
          />
        </BentoGridItem>
        <BentoGridItem>
          <StatCard
            title="Taxa"
            value="98%"
            trend="neutral"
            icon={<Target className="w-6 h-6" />}
          />
        </BentoGridItem>
      </BentoGrid>

      <BentoGrid>
        <BentoGridItem span="double">
          <AnalyticsChart
            title="Histórico"
            data={monthlyData}
            type="area"
          />
        </BentoGridItem>
        <BentoGridItem>
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Itens do resumo */}
              </div>
            </CardContent>
          </Card>
        </BentoGridItem>
      </BentoGrid>
    </div>
  );
}
```

### Página de Detalhes

```tsx
function DocumentDetail() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Título do Documento</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="success">Processado</Badge>
            <Badge variant="info">PT-BR</Badge>
          </div>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Original</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {/* Conteúdo */}
          </CardContent>
        </Card>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle>Tradução</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {/* Conteúdo */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 🎨 Utilitários e Helpers

### Classe cn() - Merge de Classes

```tsx
import { cn } from './lib/utils';

// Uso básico
<div className={cn("base-class", "additional-class")} />

// Com condicionais
<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class"
)} />

// Com Tailwind merge
<div className={cn(
  "px-4 py-2",  // será substituído
  "px-6",       // prevalece
  "bg-red-500", // será substituído
  "bg-blue-500" // prevalece
)} />

// Em componentes
function MyComponent({ className, ...props }) {
  return (
    <div
      className={cn(
        "default-styles here",
        className // permite override externo
      )}
      {...props}
    />
  );
}
```

### Estados de Loading

```tsx
// Loading com Spinner
{loading && (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
)}

// Loading Overlay
{loading && (
  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
      <p className="text-muted-foreground">Processando...</p>
    </div>
  </div>
)}

// Skeleton Loading
<Card>
  <CardContent className="space-y-3">
    <div className="h-4 bg-muted rounded animate-pulse" />
    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
  </CardContent>
</Card>
```

### Estados Vazios

```tsx
// Empty State
<div className="flex flex-col items-center justify-center p-12 text-center">
  <FileX className="w-16 h-16 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold mb-2">Nenhum documento</h3>
  <p className="text-muted-foreground mb-4">
    Faça upload de um documento para começar
  </p>
  <Button>
    <Upload className="w-4 h-4 mr-2" />
    Upload
  </Button>
</div>
```

---

## 🔤 Variáveis CSS Customizadas

```css
/* Adicionar em index.css */

/* Novas cores */
:root {
  --custom-color: 200 50% 50%;
}

.dark {
  --custom-color: 200 70% 60%;
}

/* Usar em Tailwind */
<div className="bg-[hsl(var(--custom-color))]" />

/* Novas animações */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.3s ease-out;
}
```

---

## 📱 Responsividade

```tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* items */}
</div>

// Padding responsivo
<div className="p-4 md:p-6 lg:p-8">
  {/* conteúdo */}
</div>

// Texto responsivo
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Título
</h1>

// Ocultar em mobile
<div className="hidden md:block">
  {/* visível apenas em tablet+ */}
</div>

// Mostrar apenas em mobile
<div className="block md:hidden">
  {/* visível apenas em mobile */}
</div>
```

---

## 🎯 Dicas Avançadas

### Componente com Forwarded Ref

```tsx
import React from 'react';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ title, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("base-styles", className)} {...props}>
        <h3>{title}</h3>
      </div>
    );
  }
);

MyComponent.displayName = "MyComponent";
```

### Hook Customizado para Dados

```typescript
function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await api.getDocuments();
      setDocuments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, loading, error, refetch: fetchDocuments };
}

// Uso
const { documents, loading } = useDocuments();
```

---

**💡 Dica:** Consulte [FEATURES.md](FEATURES.md) para documentação técnica completa!
