# DKM Monogram — logo files

Monogram for **Donyell Kennedy McCullough** (Artist & Talent Relations · Casting).
Typeface: **Anton** (SIL Open Font License), set in tall 4:5 blocks. All letters are converted
to outlined paths, so no font needs to be installed or loaded.

## Files

| File | Use |
|---|---|
| `dkm-logo.svg` | Primary mark. `fill="currentColor"`, letters are transparent cut-outs. Color it with CSS `color`. |
| `dkm-logo-dark.svg` | Same mark, fixed `#141414` — for light backgrounds. |
| `dkm-logo-light.svg` | Same mark, fixed `#F2EEE6` — for dark backgrounds. |
| `dkm-logo-solid.svg` | Ink blocks with white letters filled in (no transparency). Use where cut-outs would show a busy photo behind. |
| `dkm-lockup.svg` | Mark + "DONYELL / KENNEDY / MCCULLOUGH" (Space Grotesk Bold, outlined). `currentColor`. Email signature, letterhead, website header. |
| `dkm-avatar-dark.svg` / `dkm-avatar-light.svg` | 512×512 circle avatars for social profiles. |
| `dkm-icon-small.svg` | Blocks only, no letters. For favicons and anything under ~48px, where the letters become unreadable. |
| `DkmLogo.tsx` | React component (`variant="knockout" \| "solid"`, `letterColor`, plus any SVG props). |

## Brand tokens

```css
:root {
  --dkm-ink: #141414;   /* blocks on light backgrounds */
  --dkm-light: #F2EEE6; /* blocks on dark backgrounds */
}
```

Geometry: viewBox `0 0 356 140` — three 112×140 blocks, 10px gaps.

## Using it in a codebase (for Claude Code)

- Put the SVGs in `public/brand/` (Next.js / Vite) and reference them as `/brand/dkm-logo.svg`.
- For a mark that follows text color or dark mode, inline it: use `DkmLogo.tsx`, or import the SVG as a component (e.g. SVGR) — `currentColor` only works when the SVG is inline, not via `<img>`.
- Favicon: export `dkm-icon-small.svg` (or `dkm-avatar-dark.svg`) to `favicon.svg` / PNGs.
- Clear space: keep at least one block-gap × 2 (≈20px at 356px wide) empty around the mark.
- Minimum size: full mark ≥ 48px tall; below that use `dkm-icon-small.svg`.

## Status

Working draft. Before public launch, have a designer fine-tune letter spacing and optical centering
inside each block. Name spelling (no hyphen) should be confirmed with Donyell.
