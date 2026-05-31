## Objetivo

Transformar o topo da home em uma celebração do resultado do Safety Innovation Awards 2026: destacar o grande vencedor (Vale — COR), os dois outros finalistas presentes no evento, com fotos do dia e vídeos das apresentações.

## Mudanças na home (ordem das seções)

```text
Header (sem botão "Ver Top 3")
 └─ Hero  ........................  novo: foco no vencedor + carrossel
 └─ Galeria do evento  ...........  novo: mosaico com fotos de todos.zip
 └─ Outros 2 finalistas  .........  novo: cards lado a lado com fotos + vídeo
 └─ VideoSection (Assista...)  ...  intacto
 └─ About em diante  .............  intacto
```

Seções **removidas** da home: `Fase3Finalists`, `SafetySummit` (PRÓXIMO MOMENTO).

## 1. Hero — "O grande vencedor"

Substitui o Hero atual.

- Selo de topo: "Safety Innovation Awards 2026 · Vencedor"
- Título grande: **Centro de operações remotas (COR) para apoio à descaracterização de barragens**
- Linha de metadados: **Vale · Brasil**
- Time: Larissa Rezende · Rômulo Diniz · Fabiana Souza Ferreira
- Carrossel das 8 fotos do `ganhador.zip` à direita (autoplay suave, navegação por dots/setas)
- 2 botões:
  - Primário verde: "Assistir à apresentação" → scroll para vídeo do vencedor
  - Outline dourado: "Ver os 20 finalistas (Fase 2)" → `/finalistas-fase-2`
- Logo do SIA 2026 mantida no topo, fundo escuro com glow verde/dourado (mantém identidade)
- Bilingue PT/ES via `t()`

Logo abaixo do hero, **vídeo embedado da apresentação do vencedor** (16:9, destaque grande):
`https://www.youtube.com/embed/t13T4zBeRt8?list=PLKUq16ZcXwRruWe2VL2zcdtZGo_sWBOTL`
Legenda: "Apresentação do projeto vencedor no MSA Safety Summit 2026".

## 2. Galeria do evento (novo)

Mosaico responsivo (grid masonry-like) com as 21 fotos de `todos.zip` — registros do dia da premiação. Lazy-loading e lightbox simples (clicar amplia). Header curto: "O dia da premiação · MSA Safety Summit 2026, São Paulo".

## 3. Outros 2 finalistas homenageados (novo)

Dois cards lado a lado (md:grid-cols-2), tom mais discreto que o vencedor, mas honrando a participação. Cada card contém:

- Selo "Finalista Top 3 · Homenageado com placa"
- Empresa · País · Time
- Mini-carrossel das fotos do respectivo zip
- Vídeo embedado (aspect-video, menor que o do vencedor)

Conteúdo:

**Finalista A — Gold Fields Perú (Peru)**
- Título: Gold Fields & Safetymind: IA proactiva para la erradicación de accidentes fatales
- Time: Elizabeth Acuña, Luis Sanchez, Mario Villalobos
- Fotos: `finalista1.zip` (3 fotos)
- Vídeo: `https://www.youtube.com/embed/zVRwp0l-DHE?list=PLKUq16ZcXwRruWe2VL2zcdtZGo_sWBOTL`

**Finalista B — Techgen S.A. de C.V. (México)**
- Título: Implementación tecnológica de dron autónomo y robot cuadrúpedo para detección de peligros y riesgos
- Time: Jose Antonio Torres Moreno, Alan Santiago Alanis Vargas, Mauricio Guerrero Marquez
- Fotos: `finalista2.zip` (2 fotos)
- Vídeo: `https://www.youtube.com/embed/AodOuzGReV0?list=PLKUq16ZcXwRruWe2VL2zcdtZGo_sWBOTL`

## 4. Header

- Remover o botão verde "Ver Top 3" (desktop e mobile)
- Manter todo o resto (Início, Prêmio, Critérios, Comitê, Premiação, Fase 2, Regulamento, toggle PT/ES)

## Detalhes técnicos

- Fotos copiadas para `public/event/winner/`, `public/event/all/`, `public/event/finalist-1/`, `public/event/finalist-2/` (preserva nomes `.webp`)
- Novos componentes:
  - `src/components/sections/WinnerHero.tsx` (substitui uso de Hero na home)
  - `src/components/sections/WinnerVideo.tsx`
  - `src/components/sections/EventGallery.tsx`
  - `src/components/sections/OtherFinalists.tsx`
  - `src/components/ui/PhotoCarousel.tsx` (carrossel reutilizável, usa o `carousel` do shadcn já presente)
- `src/pages/Index.tsx`: trocar `Hero` por `WinnerHero`, inserir `WinnerVideo`, `EventGallery`, `OtherFinalists`; remover `Fase3Finalists` e `SafetySummit` da home
- `Hero.tsx`, `Fase3Finalists.tsx`, `SafetySummit.tsx` permanecem no repo (podem ser reusados em outras rotas) mas saem da home
- Todos os textos bilingues via `useLanguage().t()`
- Animações com Tailwind/CSS nativo (fade-up, transitions); sem bibliotecas novas
- Imagens com `loading="lazy"` (exceto a 1ª do carrossel do vencedor, `eager`)
- Mantida acessibilidade: `alt` descritivo, foco visível, `aria-label` nos controles do carrossel

## Não alterado

- `VideoSection` ("Assista e entenda…") e tudo abaixo na home
- Páginas `/finalistas-fase-2`, `/regulamento`, admin, edge functions, dados em `finalists.ts`
- Menu e idioma
