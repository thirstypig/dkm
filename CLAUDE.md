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
- **Review gate + feedback overlay** (pre-launch only): `public/review/`
  (gate.js, overlay.js), config in `src/data/review.ts` (salted hash, Worker
  URL), loaded from `src/layouts/Base.astro`. Comments live in the
  `dkm-review` Cloudflare Worker (`worker/`, KV `dkm-review-COMMENTS`, CORS
  locked to dkm.pasadenaworks.com, threads = the five page names). The gate is
  NOT security — the hash ships in public JS. Deploy the Worker with
  `cd worker && npx wrangler@4 deploy`; test with `cd worker && npm test`.
  **At launch remove the gate, overlay, and Worker** along with noindex.
- Photos: only Donyell, only from `src/assets/photos/`. No children, other
  talent, or third-party images.
- Copy in American English.

## Current status (2026-11-12)
Live at https://dkm.pasadenaworks.com behind the review gate, HTTPS
enforced, noindex. Formspree form connected. Waiting on Donyell's review
(copy, photos, name spelling — logo lacks the hyphen). Full picture in
`STATUS.md`.

## Traps
- **Pages HTTPS cert never issues** if the custom domain was saved before DNS
  resolved. Fix: `gh api -X PUT repos/thirstypig/dkm/pages -F cname=null`,
  then set `cname=dkm.pasadenaworks.com` again; approved within seconds.
- Auto mode blocks publish-type commands (`gh repo create`, `wrangler
  deploy`); ask James to run them with `!`.
- Screenshot/browser tools write into `.playwright-mcp/` (git-ignored).

## Status file
STATUS.md is read by Jimmy's claude.ai assistant as the source of truth.
Whenever a change affects scope, stack, hosting, URLs, shipped features, open
bugs, or next phases, update the relevant STATUS.md section and the Last
updated date in the SAME commit as the change. Never leave STATUS.md stale
after a push.

## npm note
The shared `~/.npm` cache has an unwritable entry on this machine. If an
install fails with EACCES / `edgesOut`, add `--cache .superpowers/npm-cache`.
