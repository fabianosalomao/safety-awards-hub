

## Spanish (ES) text corrections across 8 sections

All changes are ES-only string updates in `t()` calls. No PT text, layout, styles, or backend changes.

### Files and changes

**1. `src/components/sections/Manifesto.tsx`** (3 edits)
- Line 17: "Cada innovacion..." -> "Cada solucion que reconocemos nace con una prioridad clara: proteger vidas."
- Line 25: "Las empresas lideres..." -> "Las empresas lideres saben que cuidar a su equipo es una inversion, no un costo operativo."
- Line 33: "...hacen la diferencia..." -> "...marcan la diferencia..."

**2. `src/components/sections/Eligibility.tsx`** (2 edits)
- Line 30 (Equipes): "...desarrollaron soluciones creativas para desafios reales." -> "...desarrollaron soluciones creativas para resolver desafios reales."
- Line 36 (Profissionais): "...lideran iniciativas transformadoras en sus organizaciones." -> "...lideran iniciativas de transformacion dentro de sus organizaciones."

**3. `src/components/sections/Prerequisites.tsx`** (12 edits)
- Line 73: "Prerrequisitos del" -> "Requisitos del"
- Lines 79-81: subtitle -> two-sentence version about "cumplir con todos los puntos solicitados" + incomplete projects note
- Remove the bottom disclaimer paragraph (line 134) in ES by making it empty, with conditional render
- Cards 1-5: update "Item" label to just number ("1.", "2.", etc.), update titles and descriptions per spec

**4. `src/components/sections/EvaluationCriteria.tsx`** (2 edits)
- Line 40: "Impacto Cultural" -> "Cultura de Compromiso"
- Line 60: "Diferencial Tecnologico" -> "Implementacion Tecnologica"

**5. `src/components/sections/Process.tsx`** (4 edits)
- Line 27 (Cierre): description -> empty string in ES; add conditional render so empty description is not rendered
- Line 33: title "1a fase - Evaluacion del Comite" -> "Evaluaciones"
- Line 36: description -> "Analisis detallado de cada proyecto a cargo del comite de especialistas."
- Line 41: date badge "2a Fase: 28/03 hasta 24/04" -> "28/03 hasta 24/04"
- Line 42: title -> "Presentacion de los Finalistas"

**6. `src/components/sections/Committee.tsx`** (1 edit)
- Line 124: "Garantia de diversidad y criterios objetivos." -> "Diversidad y criterios objetivos."

**7. `src/components/sections/Awards.tsx`** (2 edits)
- Line 51: "Divulgacion en MSA Safety Summit 2026" -> "Presentacion en MSA Safety Summit 2026"
- Line 58: "Reconocimiento oficial de la industria" -> "Reconocimiento de la industria a nivel Latinoamerica"

**8. `src/components/sections/Dates.tsx`** (3 edits)
- Line 39: "Plazo Final" -> "Fecha limite"
- Line 49: "Ultimo dia para envio" -> "Ultimo dia de recepcion de proyectos"
- Line 56: long phrase -> "No dejes pasar la oportunidad de posicionar tu iniciativa y mostrar los resultados de tu proyecto a todo Latinoamerica."

**9. `src/components/sections/Submit.tsx`** (3 edits + conditional render)
- Line 31: "Listo para enviar su" -> "¿Listo para enviar tu"
- Line 37: subtitle -> "Comparte tu innovacion en seguridad y deja que el impacto de tu trabajo se convierta en un referente en toda la region."
- Line 66: form time estimate -> empty string in ES; wrap in conditional render so nothing shows when empty

### What does NOT change
- All Portuguese (PT) strings
- Layout, CSS, icons, order, component structure
- Backend, edge functions, forms, admin, RLS, storage

