

## Melhorias no formulario de submissao (4 mudancas)

### Resumo

4 arquivos editados + 1 migracao SQL. Nenhuma alteracao em upload, storage, RLS, buckets ou campos existentes.

---

### 1. Migracao de banco de dados

Adicionar 3 colunas NULLABLE na tabela `submissions`:

```text
ALTER TABLE public.submissions ADD COLUMN country_iso2 text;
ALTER TABLE public.submissions ADD COLUMN country_dial_code text;
ALTER TABLE public.submissions ADD COLUMN incentivador text;
```

Todas nullable para nao quebrar inserts existentes nem dados anteriores. Sem constraints, sem NOT NULL.

---

### 2. Validacao front-end - `src/lib/validations.ts`

- `phone`: remover `.optional().or(z.literal(''))`, tornar obrigatorio com `min(1, 'Telefone e obrigatorio')`
- Adicionar `country_iso2`: string obrigatoria, enum restrito a `['AR','MX','BR','PE','CO','CL']`
- Adicionar `country_dial_code`: string obrigatoria
- Adicionar `incentivador`: string opcional, max 100 chars

---

### 3. Edge Function - `supabase/functions/create-submission/index.ts`

Mudancas minimas:

- `validatePhone`: alterar para obrigatorio (chamar `validateString` em vez de retornar null quando vazio)
- Adicionar validacao de `country_iso2` (deve estar em lista de 6 valores permitidos)
- Adicionar validacao de `country_dial_code` (mapa fixo ISO -> DDI, verificar coerencia)
- Adicionar validacao de `incentivador` (opcional, max 500 chars, usa `validateOptionalString`)
- Incluir os 3 novos campos no objeto `validatedData` que vai para o insert

Nenhuma mudanca em CORS, rate limiting, upload, nem nas validacoes de campos existentes.

---

### 4. Formulario - `src/components/forms/SubmissionFormModal.tsx`

**Novos imports:** `Select, SelectContent, SelectItem, SelectTrigger, SelectValue` do shadcn.

**Constante de paises** (dentro do componente):

```text
const COUNTRIES = [
  { iso: 'AR', dialCode: '+54', pt: 'Argentina', es: 'Argentina' },
  { iso: 'MX', dialCode: '+52', pt: 'Mexico', es: 'Mexico' },
  { iso: 'BR', dialCode: '+55', pt: 'Brasil', es: 'Brasil' },
  { iso: 'PE', dialCode: '+51', pt: 'Peru', es: 'Peru' },
  { iso: 'CO', dialCode: '+57', pt: 'Colombia', es: 'Colombia' },
  { iso: 'CL', dialCode: '+56', pt: 'Chile', es: 'Chile' },
]
```

**useForm:** usar `setValue` e `watch` alem de `register` para controlar o Select e o auto-preenchimento do DDI.

**Layout da secao Dados Pessoais (grid 2 colunas):**

```text
Nome completo *    | Cargo *
Empresa *          | Incentivador (opcional)
Email *            | Pais *  (dropdown)
Telefone *         | (vazio ou sozinho)
```

**Campo Pais (Select controlado):**
- Label: `t('Pais', 'Pais') + ' *'`
- Opcoes: `"Brasil (+55)"` etc, localizadas via `t(country.pt, country.es)`
- Valor: ISO2 (AR, MX, etc.)
- `onChange`: setar `country_iso2` e `country_dial_code` via `setValue`; se telefone vazio, prefixar com DDI

**Campo Telefone:**
- Label muda para `t('Telefone', 'Telefono') + ' *'`
- Continua sendo `register('phone')`

**Campo Incentivador:**
- Input de texto opcional
- Label: `t('Incentivador', 'Impulsor')`
- Placeholder: `t('Quem incentivou/embaixador/padrinho (opcional)', 'Quien impulso/embajador/padrino (opcional)')`

**Payload do onSubmit (linha ~122):**
- Adicionar `country_iso2: data.country_iso2`, `country_dial_code: data.country_dial_code`, `incentivador: data.incentivador || null`
- Manter `phone: data.phone` (sem `|| null`, agora e obrigatorio)

**Mensagem de sucesso (substituir bloco existente linhas 197-219):**

```text
<CheckCircle .../>
<p className="text-green-500 text-xl font-bold">
  {t('Obrigado pelo envio.', 'Gracias por el envio.')}
</p>
<p className="text-white text-lg">
  {t('Boa sorte!', 'Buena suerte!')}
</p>
<Button onClick={handleClose}>
  {t('Fechar', 'Cerrar')}
</Button>
```

---

### 5. Admin Dashboard - `src/pages/admin/Dashboard.tsx`

- Adicionar `country_iso2`, `country_dial_code` e `incentivador` (todos `string | null`) na interface `Submission`
- No modal de detalhes, mostrar "Pais" e "Incentivador" quando preenchidos (mesmo padrao condicional dos campos opcionais existentes)
- Nenhuma outra mudanca no admin

---

### O que NAO muda

- `supabase/functions/upload-submission-file/index.ts` -- intocado
- Pipeline de upload, bucket `submissions-files`, storage
- RLS policies, roles, rate limiting
- Campos existentes no banco (nomes, tipos, constraints)
- CORS da edge function
- Nenhum campo existente renomeado

