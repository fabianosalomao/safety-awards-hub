

## Fix: Committee cards overlapping on mobile

### Root cause

The grid container uses `grid-cols-2 sm:grid-cols-3 lg:grid-cols-16`. The centering logic for the last row calculates `gridColumnStart: 3` and applies it as an **inline style** -- which takes effect on ALL screen sizes. On mobile's 2-column grid, a card starting at column 3 overflows and overlaps other cards.

### Fix (single file, ~5 lines changed)

**File:** `src/components/sections/Committee.tsx`

1. Remove the inline `style` prop from the card (line 190)
2. Add a conditional Tailwind class that only activates on `lg:` breakpoint:
   - Replace `style={colStart ? { gridColumnStart: colStart } : undefined}` with a className addition like `lg:[grid-column-start:3]` applied only to the card at index `firstOfLastRow`

This ensures:
- **Mobile/tablet**: no `gridColumnStart` applied -- cards flow naturally in 1-2 columns
- **Desktop (lg+)**: centering of the last row is preserved exactly as before

### What does NOT change
- No backend, edge function, admin, or form changes
- No text, translations, colors, or card content changes
- No changes to the features grid above the members grid
- Desktop layout and last-row centering remain identical
