# DKM — dkm.pasadenaworks.com

Marketing site for Donyell Kennedy-McCullough's talent producing and booking
business. Built by James on her behalf; **she approves all copy and photos.**

- Spec: `docs/superpowers/specs/2026-11-12-dkm-site-design.md`
- Plan: `docs/superpowers/plans/2026-11-12-dkm-site.md`
- Visual source of truth (tokens, copy): `review/index.html`

## Stack
Astro 7 static · Vitest · fonts self-hosted via `@fontsource` · GitHub Pages
(`thirstypig/dkm`) · Formspree contact form · DNS: Squarespace
Domains (`pasadenaworks.com`; `dkm` CNAME → `thirstypig.github.io`).

## Commands
`npm run dev` / `npm run preview` (port **3200**, strict — see
`~/Projects/MASTER-PORTS.md`; `npm run preview:stop` clears a stale daemon) ·
`npm test` · `npm run typecheck` · `npm run build`.

## Hard rules
- **No pricing anywhere** on the site (tests enforce it).
- Title line is exactly `Former SVP, Artist & Talent Relations Strategy and Casting`.
  Never include LinkedIn's "(NOT HR)".
- **Hidden from search engines** until Donyell approves: noindex meta on every
  page + `robots.txt` disallow-all + no sitemap. To launch, remove all three
  deliberately (tests will need updating — that is the point).
- Photos: only Donyell, only from `src/assets/photos/`. No children, other
  talent, or third-party images.
- Copy in American English.

## npm note
The shared `~/.npm` cache has an unwritable entry on this machine. If an
install fails with EACCES / `edgesOut`, add `--cache .superpowers/npm-cache`.
