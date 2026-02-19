
## Centralizar ultima linha de cards nas secoes Prerequisites e Committee

### Problema
Em desktop (lg+), quando a ultima linha do grid nao preenche todas as colunas, os cards ficam alinhados a esquerda, causando desequilibrio visual.

### Solucao: Fine Grid com col-start dinamico

Usar grids com o dobro de colunas e fazer cada card ocupar 2x, permitindo centralizar a ultima linha com `col-start`.

### Mudancas necessarias

**1. tailwind.config.ts** - Estender gridTemplateColumns para suportar 16 colunas (Secao B precisa):

Adicionar em `extend`:
```
gridTemplateColumns: {
  '16': 'repeat(16, minmax(0, 1fr))',
},
```

**2. src/components/sections/Prerequisites.tsx** - Minima alteracao no grid:

- Trocar classe do grid container de `grid md:grid-cols-2 lg:grid-cols-3` para `grid md:grid-cols-2 lg:grid-cols-6`
- Cada card recebe `lg:col-span-2` (3 cards por linha = 6 colunas)
- Para o primeiro card da ultima linha incompleta (index 3, pois 5 % 3 = 2 remainder), aplicar `lg:col-start-2` para centralizar os 2 ultimos
- Remover a classe especial `index === 4 ? 'md:col-span-2 lg:col-span-1' : ''`

Calculo: remainder=2, leftover=1, offset=(1*2)/2=1, colStart=1+1=2

**3. src/components/sections/Committee.tsx** - Minima alteracao no grid:

- Trocar classe do grid container de `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` para `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-16`
- Cada card recebe `lg:col-span-4` (4 cards por linha = 16 colunas)
- Para o primeiro card da ultima linha (index 8, pois 11 % 4 = 3 remainder), aplicar `lg:col-start-3` para centralizar os 3 ultimos
- Calculo: remainder=3, leftover=1, offset=(1*4)/2=2, colStart=2+1=3

### Validacao
- Em lg+ (1280px, 1440px): Secao A tera 3+2(centralizados), Secao B tera 4+4+3(centralizados)
- Em sm/md: nenhuma alteracao, mantendo grids originais
- Nenhuma alteracao visual alem do alinhamento horizontal

### Detalhes tecnicos
- O calculo sera feito de forma dinamica via `map` index para suportar futuras mudancas no numero de itens
- Gaps e espacamentos existentes serao mantidos
- Apenas classes Tailwind serao usadas, sem CSS customizado adicional
