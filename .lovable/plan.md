

## ES-only text corrections in 3 sections

All changes are minimal ES string updates in `t()` calls. No PT, layout, or backend changes.

### Files and changes

**1. `src/components/sections/About.tsx`** (1 edit, line 83)
- Change: `'Los Safety Innovation Awards es la manera'` -> `'Los Safety Innovation Awards son la manera'`
- Just replacing "es" with "son"

**2. `src/components/sections/Manifesto.tsx`** (2 edits)
- Lines 53-54 (title): Currently split as `t('Por que este prêmio', 'Por qué este premio')` + `t('existe', 'existe')`. Will change to `t('Por que este prêmio', '¿Por qué MSA creó los')` and `t('existe', 'Safety Innovation Awards?')` to preserve the gold-highlighted span structure. The gold span will highlight "Safety Innovation Awards?" in ES and "existe" in PT.
- Lines 58-61 (subtitle): Change ES string from `'Creemos que reconocer la excelencia en seguridad inspira a toda una industria a evolucionar.'` to `'En MSA creemos que reconocer la excelencia en seguridad inspira a las industrias a evolucionar.'`

**3. `src/components/sections/Eligibility.tsx`** (2 edits)
- Line 48: Change ES from `'Quién puede'` to `'¿Quién puede'` and line 49: from `'participar'` to `'participar?'`
- Lines 53-56 (subtitle): Change ES string from `'La participación es libre para todos los perfiles. Cada empresa puede tener máximo 1 proyecto finalista.'` to `'La convocatoria esta abierta para todos los perfiles y solo podrá haber un proyecto finalista por empresa.'`

### What does NOT change
- All Portuguese (PT) strings remain identical
- Layout, CSS, icons, order, component structure unchanged
- Backend, edge functions, forms, admin, RLS, storage untouched
