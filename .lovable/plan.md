## Objetivo
Gerar um arquivo Excel (`.xlsx`) com os 19 finalistas, contendo: nome do projeto, empresa, nome de cada inscrito da equipe com seu respectivo e-mail (quando disponível) e o incentivador (quando houver).

## Fonte dos dados
1. **Lista oficial dos 19 finalistas**: `src/data/finalists.ts` — define títulos, empresas, países, equipe e incentivador.
2. **E-mails**: tabela `submissions` no banco — contém `email` apenas do inscrito principal (campo `name`). Os campos `name_2` e `name_3` (demais membros da equipe) **não possuem e-mail individual** no banco.

## Estratégia de cruzamento
Como os títulos no banco têm pequenas variações (capitalização, acentos, espaços), o match será feito por **empresa + nome do inscrito principal** (normalizado), com fallback por similaridade de título quando necessário. Cada finalista será verificado manualmente contra o resultado.

## Estrutura do Excel
Uma linha por **integrante da equipe** (formato longo, fácil de ler e filtrar):

| Projeto | Empresa | País | Papel | Nome | E-mail | Incentivador |
|---|---|---|---|---|---|---|
| Connect bot... | Vale | Brasil | Inscrito principal | Flávio Ravier... | flavio@... | — |
| Connect bot... | Vale | Brasil | Membro da equipe | Marcos Lourenço | (não disponível) | — |
| ... | | | | | | |

- O e-mail só aparece preenchido para o **inscrito principal** (limitação dos dados existentes).
- Para `name_2` e `name_3` o campo e-mail ficará como "não disponível".
- Incentivador é repetido em todas as linhas do mesmo projeto.

## Entrega
Arquivo salvo em `/mnt/documents/finalistas-sia-2026.xlsx` e disponibilizado via tag de artefato para download.

## Observação importante
Se você precisar dos e-mails dos demais membros da equipe (`name_2` e `name_3`), eles **não estão no banco** — a inscrição original capturou apenas o e-mail do inscrito principal. Posso, alternativamente, gerar uma segunda aba apenas com o inscrito principal de cada projeto se preferir um relatório mais enxuto.