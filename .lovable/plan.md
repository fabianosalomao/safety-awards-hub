

## Correções de conteúdo na seção "Compartilhe e Divulgue"

Todas as mudanças serão feitas em um único arquivo: `src/components/sections/Integration.tsx`, que já usa o sistema `t(pt, es)` para i18n.

### Mudanças

**1. Textos em Espanhol (ES) - atualizar segundo argumento do `t()`:**

| Local | Atual (ES) | Novo (ES) |
|-------|-----------|-----------|
| Titulo H2 (parte 1) | "Comparta y" | "Pasa la" |
| Titulo H2 (parte 2, gradient) | "Difunda" | "voz" |
| Subtitulo | "Ayude a difundir sobre el Safety Innovation Awards." | "Ayudanos a compartir para conocer mas iniciativas que han ayudado a crecer la cultura de seguridad y poder reconocerlas." |
| Card LinkedIn titulo | "Siganos en LinkedIn" | "Siguenos en LinkedIn" |
| Card QR titulo | "QR Code para Difusion" | "Codigo QR para compartir" |

**2. Remover descricoes em cinza dos cards (PT e ES):**

Remover os dois blocos `<p className="text-muted-foreground mb-6">` dos cards LinkedIn e QR. Isso elimina as frases descritivas em ambos idiomas sem alterar layout.

### Detalhes tecnicos

- Arquivo unico: `src/components/sections/Integration.tsx`
- Nenhuma mudanca de layout, estilos ou estrutura
- Apenas atualizacao dos argumentos ES nas chamadas `t()` e remocao de 2 paragrafos `<p>`

