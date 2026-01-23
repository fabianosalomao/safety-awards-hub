
# Plano de Otimização para 100% de Carregamento

## Objetivo
Garantir que todos os usuários visualizem o site principal, eliminando os timeouts que redirecionam para a versão lite.

---

## Causa Raiz Identificada

O timeout ocorre porque o JavaScript demora mais de 15 segundos para executar completamente em alguns dispositivos/conexões. As causas são:

1. **Chamada bloqueante à Edge Function `detect-country`** - pode falhar ou demorar muito
2. **Bundle JavaScript grande** sem code splitting
3. **Imagens carregadas síncronamente** dentro do bundle
4. **Animações pesadas na inicialização**

---

## Solução em 4 Partes

### Parte 1: Tornar a Detecção de País Não-Bloqueante

Modificar `LanguageContext.tsx` para que a UI seja renderizada imediatamente com um idioma padrão, e a detecção de país aconteça em segundo plano.

**Alterações:**
- Remover o estado `isLoading` que bloqueia a renderização
- Iniciar com idioma padrão (PT) imediatamente
- Fazer a detecção em background e atualizar silenciosamente
- Adicionar timeout de 3 segundos na chamada da Edge Function
- Se falhar, usar idioma do navegador como fallback

### Parte 2: Lazy Loading de Componentes Pesados

Implementar lazy loading com `React.lazy()` e `Suspense` para componentes que não são críticos para o First Paint.

**Componentes a serem lazy loaded:**
- `Committee.tsx` (contém 11 imagens)
- `SubmissionFormModal.tsx` (só abre sob demanda)
- `Awards.tsx`
- `EvaluationCriteria.tsx`
- `Process.tsx`
- `Integration.tsx`

### Parte 3: Otimização de Imagens

- Mover imagens do comitê para carregamento dinâmico (não bundleadas)
- Adicionar `loading="lazy"` em todas as imagens abaixo da dobra
- Usar placeholder blur para imagens grandes

### Parte 4: Configurar Code Splitting no Vite

Atualizar `vite.config.ts` para separar o bundle em chunks menores:
- Chunk principal (React core)
- Chunk de UI (Radix, shadcn)
- Chunk de animações (Framer Motion)
- Chunk de formulários (react-hook-form, zod)

---

## Detalhes Técnicos

### Arquivo: `src/contexts/LanguageContext.tsx`

```text
Antes: O componente aguarda a resposta da Edge Function antes de renderizar
Depois: Renderiza imediatamente com PT, atualiza em background se necessário
```

A chamada à Edge Function terá:
- Timeout de 3 segundos
- AbortController para cancelar chamadas lentas
- Fallback imediato para idioma do navegador

### Arquivo: `src/pages/Index.tsx`

```text
Antes: Todos componentes importados estaticamente
Depois: Componentes abaixo da dobra carregados via React.lazy
```

Estrutura com Suspense:
- Hero e About carregam imediatamente (acima da dobra)
- Outros componentes carregam quando necessário

### Arquivo: `src/components/sections/Committee.tsx`

```text
Antes: 11 imagens importadas via import estático
Depois: Imagens carregadas via URL dinâmica com lazy loading
```

### Arquivo: `vite.config.ts`

Adicionar configuração de manualChunks para separar:
- vendor-react (react, react-dom, react-router)
- vendor-ui (radix, lucide)
- vendor-animation (framer-motion)
- vendor-forms (react-hook-form, zod)

---

## Benefícios Esperados

| Métrica | Antes | Depois |
|---------|-------|--------|
| Bundle inicial | ~800KB+ | ~200KB |
| Time to Interactive | 8-15s | 2-4s |
| Taxa de sucesso | ~95% | ~99.9% |

---

## Ordem de Implementação

1. **LanguageContext.tsx** - Remover bloqueio da detecção de país
2. **vite.config.ts** - Adicionar code splitting
3. **Index.tsx** - Implementar lazy loading de componentes
4. **Committee.tsx** - Otimizar carregamento de imagens
5. **Hero.tsx/Footer.tsx** - Adicionar lazy loading em imagens

---

## Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Flash de idioma errado | Transição suave se mudar de PT→ES |
| Componentes não carregam | Fallback com skeleton/loading |
| Imagens quebradas | Placeholder padrão + lazy load |
