
## Implementacao das 4 melhorias no formulario

### Escopo: 4 arquivos + 1 migracao SQL (admin NAO sera alterado)

---

### Passo 1 -- Migracao de banco de dados

Adicionar 3 colunas NULLABLE na tabela `submissions`:

```text
ALTER TABLE public.submissions ADD COLUMN country_iso2 text;
ALTER TABLE public.submissions ADD COLUMN country_dial_code text;
ALTER TABLE public.submissions ADD COLUMN incentivador text;
```

Todas nullable, sem constraints. Inserts existentes e dados anteriores nao sao afetados.

---

### Passo 2 -- `src/lib/validations.ts`

Mudancas no `submissionSchema`:

- **phone**: trocar `.optional().or(z.literal(''))` por `.min(1, 'Telefone e obrigatorio')` -- torna obrigatorio
- **country_iso2**: novo campo, `z.enum(['AR','MX','BR','PE','CO','CL'], { required_error: 'Pais e obrigatorio' })`
- **country_dial_code**: novo campo, `z.string().min(1)` -- sera preenchido automaticamente pelo dropdown
- **incentivador**: novo campo, `z.string().trim().max(100).optional().or(z.literal(''))` -- opcional

Nenhum campo existente renomeado.

---

### Passo 3 -- `supabase/functions/create-submission/index.ts`

Mudancas minimas na edge function:

- **validatePhone**: remover o early return de null quando vazio; chamar `validateString` para tornar obrigatorio
- **Nova constante**: `VALID_COUNTRIES` -- mapa ISO2 -> DDI para os 6 paises
- **Novo bloco de validacao**: `country_iso2` deve estar em VALID_COUNTRIES; `country_dial_code` deve corresponder ao ISO2
- **incentivador**: usar `validateOptionalString` (pode ser null, max 500 chars)
- **validatedData**: incluir `country_iso2`, `country_dial_code` e `incentivador` no objeto que vai para o insert

Nenhuma mudanca em CORS, rate limiting, upload, hashIP, nem nas validacoes de campos existentes.

---

### Passo 4 -- `src/components/forms/SubmissionFormModal.tsx`

**Novos imports**: `Select, SelectContent, SelectItem, SelectTrigger, SelectValue`

**Constante COUNTRIES** (6 paises com iso, dialCode, nomes PT/ES)

**useForm**: adicionar `setValue` e `watch` ao destructuring para controlar Select e auto-prefixo DDI

**Layout da secao "Dados Pessoais" (grid 2 colunas):**

```text
Nome completo *      | Cargo *
Empresa *            | Incentivador (opcional)
Email *              | Pais *  (dropdown Select)
Telefone *           | (campo sozinho ou vazio)
```

**Campo Pais (Select controlado via Controller/setValue):**
- Label: `t('Pais', 'Pais') + ' *'`
- Opcoes renderizadas como: `t(country.pt, country.es) + ' (' + country.dialCode + ')'`
- Valor armazenado: ISO2 (ex: "BR")
- No onChange: `setValue('country_iso2', iso)`, `setValue('country_dial_code', dialCode)`, e se phone estiver vazio, `setValue('phone', dialCode + ' ')`

**Campo Telefone:**
- Label muda para: `t('Telefone', 'Telefono') + ' *'` (com asterisco)
- Continua usando `register('phone')`

**Campo Incentivador:**
- Input de texto opcional
- Label: `t('Incentivador', 'Impulsor')`
- Placeholder: `t('Quem incentivou (opcional)', 'Quien impulso (opcional)')`

**Payload no onSubmit (linhas 122-137):**
- Adicionar: `country_iso2: data.country_iso2`, `country_dial_code: data.country_dial_code`, `incentivador: data.incentivador || null`
- Alterar: `phone: data.phone` (remover `|| null`, agora e obrigatorio)

**Mensagem de sucesso (substituir bloco linhas 197-219):**

```text
<CheckCircle ... />
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

### O que NAO muda

- `upload-submission-file` edge function -- intocada
- Bucket `submissions-files` e storage -- intocados
- RLS policies -- intocadas
- CORS da edge function -- intocado
- Rate limiting -- intocado
- Admin Dashboard -- intocado (nenhum arquivo do admin sera editado)
- Nenhum campo existente renomeado no payload ou banco
