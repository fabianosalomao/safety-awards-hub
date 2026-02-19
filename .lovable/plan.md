

## Adicionar autor na citação da seção Manifesto

### Arquivo: `src/components/sections/Manifesto.tsx`

Dentro do `<blockquote>`, logo após o `<p>` da citação (linha 103), inserir um `<footer>` com nome e cargo centralizados:

```
<footer className="mt-6 text-center">
  <p className="text-sm font-medium text-foreground/80">Maurício Alvares</p>
  <p className="mt-1 text-xs text-foreground/60">MSA-LAR</p>
</footer>
```

### Detalhes
- Nenhuma outra alteração no componente
- Usa `text-foreground/80` e `text-foreground/60` para opacidade sutil que funciona com o tema (em vez de `text-white` hardcoded)
- Responsivo: `text-sm` e `text-xs` já são legíveis em mobile e menores que a citação (`text-2xl md:text-3xl`)
- O nome e cargo não precisam de tradução (são nomes próprios)
