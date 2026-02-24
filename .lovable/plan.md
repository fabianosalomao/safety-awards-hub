

## Plano: Exibir campos no Admin + Adicionar Participantes 2 e 3

### Resumo

Exibir no Admin os campos ja coletados (Pais/DDI e Incentivador), adicionar campos opcionais para Participante 2 e 3 (nome + cargo) no formulario, salvar no banco e exibir no Admin. Tudo sem quebrar os 9 registros existentes.

---

### Etapa 1 -- Migracao SQL (banco de dados)

Adicionar 4 colunas NULLABLE na tabela `submissions`:

```sql
ALTER TABLE public.submissions ADD COLUMN name_2 text;
ALTER TABLE public.submissions ADD COLUMN job_title_2 text;
ALTER TABLE public.submissions ADD COLUMN name_3 text;
ALTER TABLE public.submissions ADD COLUMN job_title_3 text;
```

Os 9 registros existentes terao NULL nessas colunas -- sem impacto.

---

### Etapa 2 -- Validacao front (`src/lib/validations.ts`)

Adicionar ao `submissionSchema` os 4 campos opcionais:

- `name_2`: optional, trim, max 120
- `job_title_2`: optional, trim, max 120
- `name_3`: optional, trim, max 120
- `job_title_3`: optional, trim, max 120

Sem exigir "par perfeito" (pode preencher so nome ou so cargo).

---

### Etapa 3 -- Formulario (`src/components/forms/SubmissionFormModal.tsx`)

1. Ajustar labels do participante 1:
   - PT: "Nome completo 1 *" / "Cargo 1 *"
   - ES: "Nombre completo 1 *" / "Cargo 1 *"

2. Inserir abaixo do par Nome/Cargo 1, dois novos pares em grid 2 colunas:
   - Participante 2 (opcionais): "Nome completo 2" / "Cargo 2" (PT) e "Nombre completo 2" / "Cargo 2" (ES)
   - Participante 3 (opcionais): "Nome completo 3" / "Cargo 3" (PT) e "Nombre completo 3" / "Cargo 3" (ES)

3. Atualizar payload do submit para incluir `name_2`, `job_title_2`, `name_3`, `job_title_3` (enviando `null` quando vazio).

---

### Etapa 4 -- Edge Function (`supabase/functions/create-submission/index.ts`)

- Aceitar `name_2`, `job_title_2`, `name_3`, `job_title_3` como campos opcionais via `validateOptionalString`.
- Incluir no objeto de insert na tabela `submissions`.
- Nenhuma outra alteracao (CORS, rate limit, campos existentes intactos).

---

### Etapa 5 -- Admin Dashboard (`src/pages/admin/Dashboard.tsx`)

1. Expandir a interface `Submission` com os campos:
   - `country_iso2`, `country_dial_code`, `incentivador` (ja existentes no banco)
   - `name_2`, `job_title_2`, `name_3`, `job_title_3` (novos)

2. No modal "Detalhes da Submissao", na secao "Dados Pessoais":
   - Apos o Telefone, renderizar condicionalmente:
     - **Pais**: ex. "Brasil (BR) +55" -- so se `country_iso2` existir
     - **Incentivador**: so se `incentivador` existir
   - Apos a secao principal, renderizar condicionalmente:
     - **Participante 2**: mostrar nome e/ou cargo se `name_2` ou `job_title_2` existir
     - **Participante 3**: mostrar nome e/ou cargo se `name_3` ou `job_title_3` existir

3. Query ja usa `select('*')` -- nao precisa alterar.
4. Registros antigos com campos NULL nao exibem as linhas extras, sem erros.

---

### Arquivos alterados

| Arquivo | O que muda |
|---|---|
| Migracao SQL (nova) | 4 colunas nullable |
| `src/lib/validations.ts` | 4 campos opcionais no schema |
| `src/components/forms/SubmissionFormModal.tsx` | Labels participante 1, campos participante 2/3, payload |
| `supabase/functions/create-submission/index.ts` | Aceitar e inserir 4 campos opcionais |
| `src/pages/admin/Dashboard.tsx` | Interface + renderizacao no modal de detalhes |

### O que NAO muda

- Upload de arquivos, storage, RLS, policies
- Colunas existentes (name, job_title, company, email, phone, etc.)
- Fluxo de submit, mensagem de sucesso, CORS, rate limiting
- Textos em PT (exceto labels renomeados de "Nome completo" para "Nome completo 1")

