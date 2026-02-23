

## Spanish text updates in the "About" section

Only the ES strings (second argument of each `t()` call) in `src/components/sections/About.tsx` will be changed. No PT text, layout, styles, or any other file is touched.

### Changes (all in `src/components/sections/About.tsx`)

1. **Title** -- Already correct in code (no period after "Safety Innovation Awards"). No change needed.

2. **Paragraph 1 (line 82)** -- Update ES string:
   - From: `'El Safety Innovation Awards es el premio que reconoce y celebra proyectos que están transformando la seguridad laboral en América Latina.'`
   - To: `'Los Safety Innovation Awards es la manera en la que reconocemos y celebramos los proyectos que están transformando la seguridad laboral en Latinoamérica.'`

3. **Paragraph 2 (line 88)** -- Update ES string:
   - From: `'Más que un premio, es un movimiento para destacar profesionales y empresas que ponen la vida de las personas en primer lugar, usando tecnología e innovación como herramientas de protección.'`
   - To: `'Más que un premio, es la manera en la que reconocemos a las empresas y profesionales que priorizan la seguridad, usando la tecnología y la innovación para proteger a las personas.'`

4. **Card "Reconocimiento" description (line 35)** -- Update ES string:
   - From: `'Premiamos innovaciones implementadas que demostraron resultados tangibles en seguridad.'`
   - To: `'Premiamos soluciones implementadas que han mostrado resultados tangibles en seguridad.'`

5. **Card "Alcance Latinoamericano" description (line 43)** -- Update ES string:
   - From: `'Conectamos innovaciones de seguridad laboral de América Latina en una comunidad de excelencia.'`
   - To: `'Los mejores proyectos de seguridad laboral de la región conectando con nuestra comunidad.'`

6. **Card "Integrado al MSA Safety Summit 2026" description (line 51)** -- Update ES string:
   - From: `'Los finalistas serán homenajeados durante el mayor summit de seguridad laboral de América Latina.'`
   - To: `'Los finalistas serán reconocidos durante el evento de seguridad más importante de Latinoamérica.'`

### What does NOT change
- All PT strings remain identical
- No layout, styles, icons, order, or component structure changes
- No backend, admin, form, or edge function changes
- Single file touched, ~6 line-level edits

