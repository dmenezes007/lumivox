# 🔑 Opções de API para LumiVox

## ❓ Por que o LumiVox precisa de uma API de IA?

O LumiVox é um **assistente inteligente de documentos** que oferece:

1. 🌐 **Tradução contextual** de documentos acadêmicos
2. 📝 **Resumos inteligentes** com análise de metodologia
3. 💡 **Extração de insights** principais
4. 🔊 **Síntese de voz** (Text-to-Speech)

Todas essas funcionalidades dependem de **IA Generativa** para funcionar corretamente.

---

## 🎯 3 Opções Disponíveis

### ✅ **Opção 1: API Gratuita do Gemini (RECOMENDADO)**

#### Por que escolher?
- ✅ **Completamente GRATUITA**
- ✅ **Sem cartão de crédito**
- ✅ **Limite generoso**: 60 req/min, 1.500 req/dia
- ✅ **IA de última geração**
- ✅ **Suporte oficial do Google**

#### Como obter (5 minutos):

**Passo 1:** Acesse o site
```
https://ai.google.dev/
```

**Passo 2:** Faça login com conta Google

**Passo 3:** Clique em "Get API Key" ou "Get Started"

**Passo 4:** Copie sua chave (formato: AIzaSy...)

**Passo 5:** Configure no Vercel
1. Vá para o Dashboard do projeto
2. Settings → Environment Variables
3. Adicione:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Cole sua chave
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

**Passo 6:** Redeploy
```bash
# Via dashboard: Deployments → Redeploy
# Ou via CLI:
vercel --prod
```

#### Limites do Tier Gratuito

| Métrica | Limite |
|---------|--------|
| Requisições por minuto | 60 |
| Requisições por dia | 1,500 |
| Tokens por minuto | 1M |
| Custo | **$0.00** |

**Para uso pessoal ou pequenos projetos, é MAIS que suficiente!**

---

### 🎭 **Opção 2: Modo Demonstração (Já Implementado)**

#### O que funciona no Modo Demo?

✅ **Interface completa**
- Navegação
- Upload de arquivos
- Visualização de documentos
- Dashboard e analytics
- Gráficos (com dados mockados)

✅ **Funcionalidades simuladas**
- Traduções com texto de exemplo
- Resumos genéricos
- Insights simulados

❌ **O que NÃO funciona:**
- Tradução real de documentos
- Resumos personalizados
- Insights contextuais
- Text-to-Speech (síntese de voz)

#### Quando usar?
- ✅ Para **demonstrar** a interface
- ✅ Para **testar** o layout e navegação
- ✅ Para **desenvolvimento** sem gastar quotas de API
- ❌ **NÃO** para uso real com documentos

#### Como ativar?
**Já está ativo automaticamente quando não há GEMINI_API_KEY configurada!**

O app detecta e mostra um banner amarelo informando que está em modo demo.

---

### 💰 **Opção 3: API Paga do Gemini (Para Produção Grande)**

#### Quando migrar para pago?

- Mais de 1.500 documentos por dia
- Mais de 60 documentos por minuto
- Uso comercial em grande escala

#### Custos (Gemini 2.5 Flash)

| Tipo | Preço |
|------|-------|
| Input (por 1M tokens) | $0.30 |
| Output (por 1M tokens) | $1.20 |

**Exemplo prático:**
- 1 documento de 2.000 palavras ≈ 2.700 tokens
- 1.000 documentos ≈ $3-5
- **MUITO barato!**

#### Como configurar?

1. No Google AI Studio, habilite faturamento
2. Adicione método de pagamento
3. Use a mesma API key
4. Automaticamente passa do tier gratuito para pago

---

## 🚀 Comparação Rápida

| Recurso | Demo | API Gratuita | API Paga |
|---------|------|--------------|----------|
| **Custo** | $0 | $0 | ~$0.003/doc |
| **Traduções reais** | ❌ | ✅ | ✅ |
| **Resumos personalizados** | ❌ | ✅ | ✅ |
| **Insights contextuais** | ❌ | ✅ | ✅ |
| **Text-to-Speech** | ❌ | ✅ | ✅ |
| **Limite diário** | ∞ | 1,500 | ∞ |
| **Ideal para** | Testes | Pessoal/Pequeno | Comercial |

---

## 🎓 Minha Recomendação

### Para você (Davison):

**Use a API Gratuita do Gemini!**

**Por quê?**
1. ✅ É **gratuita** e sem compromisso
2. ✅ Você terá **todas as funcionalidades**
3. ✅ 1.500 documentos/dia é MUITO (equivale a ~50/hora)
4. ✅ Qualidade de tradução **excelente**
5. ✅ Sem custo de manutenção

**Leva 5 minutos para configurar e você terá um app completo funcionando!**

---

## 📋 Passo a Passo Simplificado

### Configure em 5 minutos:

```bash
# 1. Obtenha a API Key
Acesse: https://ai.google.dev/
Clique em "Get API Key"
Copie a chave (AIzaSy...)

# 2. Configure no Vercel
Dashboard → Settings → Environment Variables
Add: GEMINI_API_KEY = sua_chave_aqui

# 3. Redeploy
Dashboard → Deployments → Redeploy
Ou: vercel --prod

# 4. Teste!
Acesse seu app e faça upload de um documento
```

---

## 🆘 Troubleshooting

### "Environment Variable references Secret that does not exist"
✅ **RESOLVIDO!** Atualizei o `vercel.json` para não usar secrets.

### Como saber se estou em modo demo?
🎭 Você verá um banner amarelo no topo dizendo "Modo Demonstração Ativo"

### A API gratuita expira?
❌ Não! Ela continua gratuita indefinidamente dentro dos limites.

### Posso trocar depois?
✅ Sim! Basta adicionar/remover a GEMINI_API_KEY e redesenhar.

### E se eu atingir o limite gratuito?
- A API retorna erro 429 (Too Many Requests)
- O app alterna automaticamente para modo demo
- No dia seguinte, o limite reseta

---

## 🎁 Bônus: Alternativas Futuras

Se no futuro você quiser experimentar outras IAs:

| API | Gratuito | Tradução | TTS |
|-----|----------|----------|-----|
| **Gemini** | ✅ Sim | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| OpenAI GPT | Pago (~$0.01/doc) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Anthropic Claude | Pago (~$0.02/doc) | ⭐⭐⭐⭐⭐ | ❌ |
| DeepL | Freemium | ⭐⭐⭐⭐⭐ | ❌ |

**Gemini é a melhor escolha para este projeto!**

---

## 📞 Precisa de Ajuda?

**Já configurei tudo para você:**
- ✅ Modo demo funcionando
- ✅ Fallback automático em caso de erro
- ✅ Banner informativo
- ✅ Vercel.json corrigido

**Próximo passo:**
1. Obtenha a chave gratuita
2. Configure no Vercel
3. Redeploy

**E pronto! Todas as funcionalidades estarão ativas! 🚀**

---

**Criado em:** 22 de Dezembro de 2024  
**Atualizado:** Após correção do erro de deploy  
**Status:** ✅ Pronto para produção com ou sem API
