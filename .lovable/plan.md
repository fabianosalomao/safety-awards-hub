

## Plan: New "Video" Section on Landing Page

### What changes
1. **New component**: `src/components/sections/VideoSection.tsx`
2. **Insert in Index.tsx**: Between `<Hero />` and `<About />` (not lazy-loaded, since it's above the fold)

### Component Details (`VideoSection.tsx`)

- Uses `useLanguage` hook for bilingual content (PT/ES)
- Layout follows existing section patterns: `section-container`, `py-24 md:py-32`, same spacing
- Structure:
  - Title using `text-3xl md:text-4xl lg:text-5xl font-bold` + `text-gradient-gold` for "Safety Innovation Awards"
  - Subtitle in `text-muted-foreground`
  - YouTube embed in 16:9 `aspect-video` wrapper with `rounded-xl border border-border` and card shadow
  - CTA button identical to Hero's primary button style, scrolling to `#submit`
- YouTube embed: `https://www.youtube.com/embed/Mh2Geg9P7vc` in an iframe with `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"` and `allowFullScreen`
- IntersectionObserver animation (same pattern as About section) for fade-in effect
- Icon: `Send` (same as Submit section CTA) positioned left of text per project convention

### Index.tsx Change
- Add `import VideoSection from '@/components/sections/VideoSection'` (eager, not lazy)
- Insert `<VideoSection />` between `<Hero />` and `<About />`

### Files affected
| File | Change |
|---|---|
| `src/components/sections/VideoSection.tsx` | **New** |
| `src/pages/Index.tsx` | Add import + insert component (2 lines) |

No other files touched. No backend, form, admin, header, or routing changes.

