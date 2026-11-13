# 🗂️ Master Port Registry — All Projects
> 📍 Canonical location: `~/Projects/MASTER-PORTS.md`
> 🗓️ Last Updated: 2026-09-12
> ⚠️ This is the single source of truth. Update this file first, then run `~/Projects/sync-master-ports.sh`.

Every project keeps a byte-identical copy of this file at its root (e.g., `~/Projects/bahtzang-trader/MASTER-PORTS.md`), so the full registry is at hand while testing in any repo. **Do not edit a copy.** Edit this file, then:

```bash
~/Projects/sync-master-ports.sh           # copy this file over every copy
~/Projects/sync-master-ports.sh --check   # exit 1 if any copy has drifted
```

- **Private repos** commit their copy.
- **Public repos** keep their copy on disk but **out of git** (`.gitignore`), because this file names every private project on this machine. Commit a copy to a public repo only after deciding to publish that list.
- There is no `PORTS.md`. It was a hand-copied subset of this file and drifted from it; it was retired on 2026-09-12 (see the changelog).

---

## Global Port Map

| Product / Service                     | Frontend | API  | WebSocket | PostgreSQL | Redis | Admin | Notes |
|---------------------------------------|----------|------|-----------|------------|-------|-------|-------|
| **thefantasticleagues-app** (fbst)    | 3010     | 4010 | —         | 5442       | 6381  | —     | Split client/server; Vite HMR at 24680. PG 5442 = `thefantasticleagues/docker-compose.yml` host port. Redis 6381 reserved, unused |
| **thefantasticleagues-www**           | 3011     | —    | —         | —          | —     | —     | Astro dev + preview pinned to 3011 (TinaCMS wrapper) |
| **bbq-judge / thejudgetool**          | 3030     | 4030 | —         | 5444       | 6383  | —     | Next.js app |
| **bbq-judge / thejudgetool.com-www**  | 3031     | —    | —         | —          | —     | —     | Reserved slot for marketing dev port |
| **ktv-singer**                        | 3040     | 4040 | —         | 5445       | 6385  | —     | Multi-repo (app/server/shared/tvos/web/infra). Socket.IO shares the API port 4040; 8040 is reserved but nothing listens on it |
| **tastemakers-web**                   | 3050     | —    | —         | —          | —     | —     | Next.js (public) |
| **tastemakers-backend**               | —        | 4050 | —         | 5446       | 6384  | 4051  | `php artisan serve --port=4050`. 4051 is reserved for an admin panel, but nothing in the repo starts it |
| **alephco.io-app** (Aleph)            | —        | 4060 | —         | (Supabase) | —     | —     | **Unified** Express+Vite on one port; Vite HMR 24681 |
| **alephco.io-www**                    | 3060     | —    | —         | —          | —     | —     | `python3 -m http.server 3060` (static) |
| **bahtzang-trader / frontend**        | 3070     | —    | —         | —          | —     | —     | Next.js 14; moved from 3060 (was conflicting) |
| **bahtzang-trader / backend**         | —        | 4070 | —         | (Supabase) | —     | —     | FastAPI/uvicorn; moved from 4060 |
| **tabledrop / apps/web**              | 3080     | —    | —         | —          | —     | —     | Next.js; moved from 3060 |
| **tabledrop / apps/scraper**          | —        | 4080 | —         | (Neon)     | 6387  | —     | Express + BullMQ; moved from 4060 (alephco.io's) on 2026-09-12. Run its Redis with `redis-server --port 6387` |
| **jameschang.co**                     | 3090     | —    | —         | —          | —     | —     | Personal site; `python3 -m http.server 3090` (was 8787 in its docs) |
| **thirstypig**                        | 4321     | —    | —         | —          | —     | —     | Astro; dev + preview now pinned to 4321 explicitly |
| **cooper-stack3**                     | 3100     | 4100 | —         | —          | —     | —     | Express server (rarely run), default now 4100 (was 5000, the macOS AirPlay port); Vite client on 3100 proxies /api to 4100 |
| **vouch**                             | 3020     | —    | —         | (Supabase) | —     | —     | Next.js 16 (App Router); Supabase cloud DB |
| **TIP** (was: spar)                   | 3110     | —    | —         | (Supabase) | —     | —     | Next.js 16 (App Router); Retell voice + Stripe later; renamed from Spar 2026-07; Railway at tip.bahtzang.com |
| **shengchangmd**                      | 3120     | —    | —         | —          | —     | —     | Astro 5 static, trilingual; no backend; GitHub Pages at shengchangmd.com (apex, Squarespace DNS) |
| **tobinchang**                        | 3130     | —    | —         | —          | —     | —     | Static site; GitHub Pages at tobinchang.com |
| **jarrenchang**                       | 3140     | —    | —         | —          | —     | —     | Static site; GitHub Pages at jarrenchang.com (apex, Squarespace DNS) |
| **rhyschang**                         | 3150     | —    | —         | —          | —     | —     | Static site; GitHub Pages at rhyschang.com |
| **theresewhite.com**                  | 3160     | —    | —         | —          | —     | —     | Next.js 16 static export; GitHub Pages at theresewhite.bahtzang.com; replaces a Wix site at theresewhite.com |
| **minmeychang**                       | 3170     | —    | —         | —          | —     | —     | Astro 7 static, bilingual en/zh-hant; GitHub Pages at minmeychang.com (apex, Squarespace DNS) |
| **pasadenaworks**                     | 3180     | —    | —         | —          | —     | —     | Astro marketing site for Pasadena Works (consultancy); `npm run dev`/`npm run preview` pinned to `-p 3180`; static, GitHub Pages at pasadenaworks.com; repo also carries a `registry/` folder (this file's original canonical home) left over from before the repo was repurposed — see 2026-08-27 changelog entry |
| **property-page**                     | 3190     | —    | —         | —          | —     | —     | Astro static, English only, private property listing; password-gated at the edge by a Cloudflare Pages Functions Worker (KV-backed passwords); Cloudflare Pages, NOT GitHub Pages; `wrangler pages dev` preview on 3191 |
| **dkm**                               | 3200     | —    | —         | —          | —     | —     | Astro 7 static; GitHub Pages at dkm.pasadenaworks.com (Squarespace DNS); `npm run dev`/`preview` pinned to 3200; noindex until client approves |

---

## Port Ranges by Product (Reserved Blocks)

Each product owns a 10-port block (3XX0–3XX9 frontend, 4XX0–4XX9 API). Sub-services expand within-block — never cross-assign.

| Frontend Range | API Range   | PG   | Redis | Owner                                |
|----------------|-------------|------|-------|--------------------------------------|
| 3010 – 3019    | 4010 – 4019 | 5442 | 6381  | thefantasticleagues (app + www)      |
| 3020 – 3029    | 4020 – 4029 | 5443 | 6382  | vouch (Next.js, Supabase cloud DB — local PG/Redis unused) |
| 3030 – 3039    | 4030 – 4039 | 5444 | 6383  | bbq-judge (app + www)                |
| 3040 – 3049    | 4040 – 4049 | 5445 | 6385  | ktv-singer (+ WebSocket 8040–8049 reserved, unused) |
| 3050 – 3059    | 4050 – 4059 | 5446 | 6384  | tastemakers (web + backend + admin)  |
| 3060 – 3069    | 4060 – 4069 | —    | —     | alephco.io (app + www, Supabase-backed) |
| 3070 – 3079    | 4070 – 4079 | —    | —     | bahtzang-trader (frontend + backend) |
| 3080 – 3089    | 4080 – 4089 | 5448 | 6387  | tabledrop                            |
| 3090 – 3099    | —           | —    | —     | jameschang.co (static)               |
| 3100 – 3109    | 4100 – 4109 | —    | —     | cooper-stack3 (client 3100, API 4100) |
| 4321           | —           | —    | —     | thirstypig (pinned; also Astro's default, so pin every other Astro project) |
| 3110 – 3119    | 4110 – 4119 | 5449 | 6388  | TIP, was spar (Next.js; Retell voice + Stripe; Supabase — local PG/Redis unused) |
| 3120 – 3129    | 4120 – 4129 | 5450 | 6389  | shengchangmd (Astro static; no API/PG/Redis in use) |
| 3130 – 3139    | 4130 – 4139 | 5451 | 6390  | tobinchang (static site; no API/PG/Redis in use) |
| 3140 – 3149    | 4140 – 4149 | 5452 | 6391  | jarrenchang (static site; no API/PG/Redis in use) |
| 3150 – 3159    | 4150 – 4159 | 5453 | 6392  | rhyschang (static site; no API/PG/Redis in use) |
| 3160 – 3169    | 4160 – 4169 | 5454 | 6393  | theresewhite.com (Next.js static export; no API/PG/Redis in use) |
| 3170 – 3179    | 4170 – 4179 | 5455 | 6394  | minmeychang (Astro static; no API/PG/Redis in use) |
| 3180 – 3189    | 4180 – 4189 | 5456 | 6395  | pasadenaworks (Astro marketing site, static; no API/PG/Redis in use) — **3181 = ops-panel** local preview (`npm run dev` in ~/Projects/property-page/ops-panel) |
| 3190 – 3199    | 4190 – 4199 | 5457 | 6396  | property-page (Astro static + Cloudflare Worker gate; no API/PG/Redis in use) |
| 3200 – 3209    | 4200 – 4209 | 5458 | 6397  | dkm (Astro static; no API/PG/Redis in use) |
| 3210 – 3219    | 4210 – 4219 | 5459 | 6398  | **AVAILABLE** — reserved for future  |
| 8040 – 8049    | —           | —    | —     | ktv-singer (WebSocket, reserved; Socket.IO currently shares 4040) |
| 24680 – 24689  | —           | —    | —     | Vite HMR (per-project, pick any)     |

**Free capacity:** 1 full product slot (1 reserved block remains: 3200–3209).

---

## 🤖 Master Claude Context Prompt
> Use this when asking Claude questions that span multiple projects:

```
I manage multiple projects on this machine. The global port registry:

thefantasticleagues-app  → FE: 3010 | API: 4010 | PG: 5442 | Redis: 6381
thefantasticleagues-www  → FE: 3011
bbq-judge/thejudgetool   → FE: 3030 | API: 4030 | PG: 5444 | Redis: 6383
ktv-singer               → FE: 3040 | API: 4040 (Socket.IO on same port) | PG: 5445 | Redis: 6385
tastemakers-web          → FE: 3050
tastemakers-backend      → API: 4050 | Admin: 4051 (reserved, unused) | PG: 5446 | Redis: 6384
alephco.io-app (Aleph)   → Unified FE+API on 4060 (Supabase DB)
alephco.io-www           → FE: 3060 (static)
bahtzang-trader/frontend → FE: 3070
bahtzang-trader/backend  → API: 4070 (Supabase DB)
tabledrop/apps/web       → FE: 3080
tabledrop/apps/scraper   → API: 4080 | Redis: 6387 (own redis-server)
jameschang.co            → FE: 3090
thirstypig               → FE: 4321 (pinned)
cooper-stack3            → FE: 3100 (Vite) | API: 4100
vouch                    → FE: 3020 (Supabase cloud DB)
TIP (was spar)           → FE: 3110 (Retell voice + Stripe; Railway, tip.bahtzang.com)
shengchangmd             → FE: 3120 (Astro static; GitHub Pages)
tobinchang               → FE: 3130 (static; GitHub Pages, tobinchang.com)
jarrenchang              → FE: 3140 (static; GitHub Pages, jarrenchang.com)
rhyschang                → FE: 3150 (static; GitHub Pages, rhyschang.com)
theresewhite.com         → FE: 3160 (Next.js static export; GitHub Pages, theresewhite.bahtzang.com)
minmeychang              → FE: 3170 (Astro static, bilingual; GitHub Pages, minmeychang.com)
pasadenaworks            → FE: 3180 (Astro marketing site, static; GitHub Pages, pasadenaworks.com)
property-page            → FE: 3190 (Astro static, private listing; Cloudflare Pages + Worker gate; preview 3191)

Never cross-assign ports between projects. Each product owns its 10-port block
(e.g., thefantasticleagues owns 3010-3019 and 4010-4019). If a new service
needs a port, assign it within the owning project's reserved range. Consult
the AVAILABLE rows in MASTER-PORTS.md before creating any new product.
```

---

## 🚑 Quick Conflict Check
Run this anytime to see what's actually listening:

```bash
lsof -i -P -n | grep LISTEN | grep -E '3010|3011|3020|3030|3031|3040|3050|3060|3070|3080|3090|3110|3120|3130|3140|3150|3100|3160|3170|3180|3181|3190|3191|4010|4030|4040|4050|4051|4060|4070|4080|4100|4321|5442|5444|5445|5446|5448|6381|6383|6384|6385|6387|8040|24680|24681'
```

---

## 📐 Conventions

- **10-port blocks per product.** Frontend block mirrors the API block (3010↔4010, 3030↔4030, etc.) so the math stays easy.
- **-www marketing sites** share the same block as their -app sibling, offset by 1 (e.g., app=3010, www=3011).
- **Databases follow convention:** PG starts at 5442 (+1 per product), Redis at 6381 (+1 per product). Skip numbers as needed to avoid OS-reserved ranges.
- **Unified-server apps** (alephco.io-app) only claim the API port; the "Frontend" column is empty because Vite is served through the Express process.
- **When retiring a product**, mark its block as `**AVAILABLE**` with a dated note; do not delete the row for 30 days so in-flight work can find it.
- **Vite HMR ports** (24680+) are per-project and rarely conflict; just keep them distinct if two Vite dev servers run side-by-side.
- **Pin every port in code; never rely on a framework default.** A registry entry only helps if the project really uses the port. Every conflict found on 2026-09-12 was a fallback nobody had registered (`process.env.PORT ?? "4060"`, bare `astro dev`, bare `vite`). Code defaults, `.env.example` files and README commands must all use the registry port.
- **On hosts that set `PORT` (Railway), write `${PORT:-NNNN}`, not `-p NNNN`.** A hard-coded `-p` ignores the host's port and breaks the deploy. The fallback only applies locally.
- **PostgreSQL and Redis ports are per project.** A project that uses a local Redis or Postgres runs its own instance on its registry port (for example `redis-server --port 6387` for tabledrop, or a docker-compose host port of 5442). The shared Homebrew instances on 5432 and 6379 are nobody's registry port.

---

## 📝 Changelog

- **2026-09-12** — **Aligned project code with this table, starting with the 4060 collisions.** alephco.io-app was running on 4060 while two other projects fell back to it: tabledrop's web app would have sent scrape requests to Aleph's server.
  - **bahtzang-trader** now uses 3070/4070 in its code fallbacks, CORS default, `railway.toml` fallback, `.env.example` files and docs. Railway sets `PORT`, so production was never on 4060.
  - **tabledrop** moved its scraper to 4080 and Redis to 6387 (code defaults, `.env.example`, status and tech pages, docs), which closes its TD-003. The scraper got its own row above.
  - **Local config pinned to the registry:** cooper-stack3 (server default 5000 → 4100, where 5000 is the macOS AirPlay port; new `client/vite.config.js` on 3100 with an API proxy, closing its todo 004), jameschang.co docs (8787 → 3090), rhyschang docs (8000 → 3150), thirstypig (dev and preview pinned to 4321), thefantasticleagues-www (preview pinned to 3011; README said 3030), TIP (`next start -p ${PORT:-3110}`, `.env.example` 3000 → 3110), the property-page ops panel (fallback 3000 → 3181), and TheFantasticLeagues' docker-compose Postgres host port (5432 → 5442).
  - **This table corrected to match reality:** ktv-singer's WebSocket shares 4040, so 8040 is reserved but unused. tastemakers-backend's admin port 4051 has no process. TheFantasticLeagues' Redis 6381 is unused. cooper-stack3 now owns 3100–3109.
  - **Needs a local step:** your own gitignored `.env` files are not in any PR. tabledrop's `.env` still names 3060, 4060 and 6386.

- **2026-09-12** — **Retired `PORTS.md`, made the mirrors enforceable, and stopped publishing this file from public repos.**
  - **`PORTS.md` deleted everywhere**, including the root. It held nothing this file did not, and it had drifted: the root copy still listed FUTURE-7 as available at 3190 twelve days after the 2026-08-31 entry below assigned 3190 to property-page.
  - **All copies re-synced.** Only 2 of about 40 copies matched this file before the sync. The rest were on older versions, and many were uncommitted edits from an earlier re-sync.
  - **Added `~/Projects/sync-master-ports.sh`** (with `--check`), the cross-project version that `ktv-singer/scripts/sync-ports.sh` said should exist here. "Must stay byte-identical" failed repeatedly while it depended on people remembering to copy.
  - **Public repos now keep the file out of git.** 13 public repos were publishing this file, which names every private project. A pasadenaworks security review (its todo 018) found no credentials in it and called the exposure reconnaissance value only, but the earlier fix never covered these root files. jarrenchang, tobinchang and TIP already used this pattern. Past commits still contain old versions; only future publishing stops.
  - **Found and not changed here:** an audit of each project's real dev config against this table found 11 disagreements (for example, bahtzang-trader's `railway.toml` falls back to 4060, alephco.io-app's port). Each one needs a decision about which side is right, so they are listed for follow-up rather than silently changed in this file.
  - Also added 3181, 3190 and 3191 to the Quick Conflict Check command, which was missing them.
- **2026-08-31** — Assigned **3181** to the **ops-panel** (`~/Projects/property-page/ops-panel`, the password-gated internal dashboard at ops.pasadenaworks.com) for local preview, taken from **pasadenaworks's existing 3180–3189 block** rather than opening a new one. It is not a separate product: it is deployed inside the same Railway project as the pasadenaworks services and renders that repo's own markdown. Deliberately did **not** claim the last free block (3200–3209) for it — that would have spent the "always one slot free" invariant on a links panel. `npm run dev` in the ops-panel folder is pinned to 3181.
- **2026-08-27** — **Corrected the pasadenaworks row, which described a repo purpose that no longer applies.** The 2026-08-24 entry named it a "docs/registry repo (this file's canonical source)" — accurate at the time, since the `registry/` folder (holding this file, PORTS.md, and a README) was committed in the repo's very first commit alongside the Astro scaffold. Since then the repo became the actual live Astro marketing site for Pasadena Works (pasadenaworks.com), and nothing about that transition touched this registry — the description just went stale in place, the same failure mode as the shengchangmd row on 2026-08-07. Port stays FE 3180, unchanged; `npm run dev`/`npm run preview` are now pinned to `-p 3180` in the repo's `package.json` rather than left on Astro's default 4321, which collides with **thirstypig**'s reserved slot. Also found: no root-level mirror existed in the pasadenaworks repo at all — the only copy lived nested at `registry/MASTER-PORTS.md`, not the repo root like every other project, so it was invisible to a `ls`/`find` at the expected location. Added proper root-level `MASTER-PORTS.md` + `PORTS.md` copies. **Left `registry/` in place rather than deleting it** — pasadenaworks is a *public* repo (per its own `CLAUDE.md`), and that folder contains details about every other project in this registry (names, stacks, Stripe/Supabase/Retell usage, Railway hosts); worth the owner's own call on whether to remove it, not something to delete unasked while just fixing a stale description.
- **2026-08-31** — Added **property-page** (private, password-gated real-estate listing; Astro static deployed to **Cloudflare Pages**, not GitHub Pages — the first project here on Cloudflare) on **FE 3190**, claiming the FUTURE-7 block (3190–3199 / 4190–4199, PG 5457, Redis 6396). Static plus a Pages Functions Worker, so API/PG/Redis stay unassigned; 3191 is used locally by `wrangler pages dev` to preview the site behind its password gate. Opened a fresh **FUTURE-8** block (3200–3209 / 4200–4209, PG 5458, Redis 6397) to hold the "always one slot free" invariant. **Project mirrors NOT yet re-synced from this root copy.**
- **2026-08-24** — Added **pasadenaworks** (docs/registry repo — the canonical home of this file — connected to `github.com/thirstypig/pasadenaworks`) on **FE 3180**, claiming the FUTURE-6 block (3180–3189 / 4180–4189, PG 5456, Redis 6395). Static only, so API/PG/Redis stay unassigned within the block. Opened a fresh **FUTURE-7** block (3190–3199 / 4190–4199, PG 5457, Redis 6396) to hold the "always one slot free" invariant. Re-synced all 19 project mirrors (18 existing + the pasadenaworks repo itself) from this root copy.
- **2026-08-07** — **Corrected the shengchangmd row, which named a dead host in all 37 copies of this file.** The registry said `shengchangmd.bahtzang.com`; that host has 404'd since the migration to **shengchangmd.com** completed on 2026-08-05 (apex on Squarespace nameservers, four GitHub Pages A records, `www` redirecting to apex, one Let's Encrypt certificate covering both). Ports are unchanged at FE 3120.
  - **The mirroring worked and the correctness did not.** The 2026-08-05 minmeychang sync propagated cleanly to every copy — all 37 were byte-identical when this was found — and not one of them was right. Mirroring guarantees the copies agree with each other; it guarantees nothing about whether they agree with reality, and a fact nobody is looking at goes stale in every copy simultaneously.
  - **Nothing pointed at the stale row, because nothing was broken.** The migration was completed, verified and documented inside the `shengchangmd` repo, whose own `CLAUDE.md` and runbook were updated the same day. This registry sits outside that repo, so it was never in view. Cross-repo facts have no owner unless one is named.
  - **Historical entries below are deliberately left naming the old host.** The 2026-07-30 and 2026-08-04 entries record what was true when written; rewriting them would destroy the record rather than correct it. Only live claims were changed.
- **2026-08-05** — Added **minmeychang** (Astro static, bilingual en/zh-hant; family tribute site for Min Mey Chang) on **FE 3170**, claiming the FUTURE-5 block (3170–3179 / 4170–4179). Static only, so 4170/5455/6394 stay unassigned within the block. Live on GitHub Pages at **minmeychang.com**, an apex domain on Squarespace DNS. Opened a fresh **FUTURE-6** block (3180–3189 / 4180–4189, PG 5456, Redis 6395) to hold the "always one slot free" invariant.
  - **Claimed before `npm run dev` was ever run** — second time in five entries this happened in the right order. `npm run build` was run during scaffolding, but that binds no port. Dev is pinned to `-p 3170` in `package.json`.
  - **Squarespace emits an `HTTPS` (RFC 9460) record that silently defeats an apex migration.** The registrar's "Squarespace Defaults" preset bundles the four parking `A` records, the `www` CNAME **and** an `HTTPS` record at `@` whose `ipv4hint` lists the parking IPs. Browsers query HTTPS records in parallel with `A` and prefer those hints, so Chrome and Safari keep reaching Squarespace even with perfect GitHub `A` records — while `dig +short A` reports success. Deleting the preset removes all three together. **This will bite the `shengchangmd.com` migration** once that zone lands on Squarespace; the runbook does not mention it, because GoDaddy did not emit the record.
  - **`dig` 9.10.6 (macOS system dig) cannot query `HTTPS`/`SVCB`.** It silently downgrades the unknown type to an `A` query — the QUESTION SECTION comes back `IN A` — and returns a confident, wrong answer. Use `dig -t TYPE65` instead. An earlier check in this session reported an HTTPS record present that it had never asked about.
  - **A `200` proves nothing about which server answered.** After DNS was correct at 8.8.8.8 and 1.1.1.1, `curl https://minmeychang.com/` still returned `200` with a valid certificate — from Squarespace's parking page, because the local macOS resolver held the old IPs on their original 4-hour TTL. The tells were `%{remote_ip}` and the `server:` header. Verify migrations with `curl --resolve <host>:443:<target-ip>`, never against whatever the local resolver believes.
  - **New Pages repos default to `build_type: legacy`, which inverts the `CNAME` rule.** On legacy branch builds the `CNAME` file in the branch is authoritative and overwrites the repo's custom-domain setting on every deploy; on `workflow` builds it is inert and the setting rules. Left on `legacy`, GitHub would also try to Jekyll-build the Astro source. Switch with `gh api -X PUT repos/<owner>/<repo>/pages -f build_type=workflow` before the first deploy.
  - **The custom-domain field 404s until Pages has built once.** The repo had zero commits, so `main` did not exist and there was no site to attach a domain to. Order is: push → first successful deploy → set `cname` → enable `https_enforced`.
- **2026-08-04** — Added **theresewhite.com** (Next.js 16 static export; rebuild of L. Therese White's Wix site) on **FE 3160**, claiming the FUTURE-4 block (3160–3169 / 4160–4169). Static export to GitHub Pages at theresewhite.bahtzang.com, so 4160/5454/6393 stay unassigned within the block. Opened a fresh **FUTURE-5** block (3170–3179 / 4170–4179, PG 5455, Redis 6394) to hold the "always one slot free" invariant.
  - **Claimed before the dev server was ever run**, which is the first time in four entries this happened in the right order (see tobinchang 2026-07-31 and shengchangmd 2026-07-30, both retroactive). `npm run dev` is pinned to `-p 3160` in `package.json` rather than left on Next's default 3000.
  - **Corrected a stale DNS assumption.** `bahtzang.com`'s nameservers are `ns-cloud-*.googledomains.com` with a `cloud-dns-hostmaster.google.com` SOA, which reads as Google Cloud DNS. It isn't a separate console: Squarespace acquired Google Domains and migrated domains kept those nameservers, so Squarespace's DNS panel is the correct place to add records. The live `shengchangmd.bahtzang.com → thirstypig.github.io.` CNAME is the proof.
  - **Found one drifted mirror:** `thefantasticleagues/thefantasticleagues-app/MASTER-PORTS.md` was still on 2026-04-20 — the same file called out as "on a version of its own" in the 2026-07-31 sync. It had drifted again within four days. Re-synced with the rest.
- **2026-07-31** — Added the three personal-site projects **tobinchang** (FE 3130), **jarrenchang** (FE 3140) and **rhyschang** (FE 3150), extending the registry with two new blocks (3140–3149, 3150–3159) and a fresh **FUTURE** block (3160–3169) so the "always one slot free" invariant holds. All three are static sites bound for GitHub Pages on their own apex domains, so API/PG/Redis in each block stay unassigned.
  - **Block order was set by what was already running, not alphabetically.** `tobinchang` had a `python3 -m http.server 3130` live at assignment time, so it kept 3130 rather than being moved; reassigning would have broken a running dev server mid-session. This is the failure the "claim before you run" rule exists to prevent — the claim happened after the fact for the second time in three entries (see shengchangmd, 2026-07-30).
  - **Corrected a stale row:** `spar` was renamed to **TIP** in commit `283e8bd` ("refactor: rename the product Spar → TIP across code, copy and docs"). Same 3110–3119 block, now deployed on Railway at tip.bahtzang.com. There is no `spar` folder on disk; the registry had been pointing at a product name that no longer existed.
  - **Re-synced all mirrors.** The copies had drifted into **4 distinct versions across 35 files** despite the byte-identical rule — the `ktv-singer/*` sub-repos (7 files) and a tastemakers/alephco/bbq-judge/thefantasticleagues group (10 files) were both stale, and `thefantasticleagues-app` was on a version of its own. All 35 `MASTER-PORTS.md` and 20 `PORTS.md` copies now match the root.
- **2026-07-30** — Added **shengchangmd** (Astro 5 static site for Sheng Chang, M.D.; trilingual en/zh-hant/zh-hans) on **FE 3120**, claiming the FUTURE-2 block (3120–3129 / 4120–4129). Static only — no API, PostgreSQL or Redis in use, so 4120/5450/6389 stay unassigned within the block. Deployed to GitHub Pages at shengchangmd.bahtzang.com. Registry was retroactive: the project had been running on 3120 before the block was claimed.
- **2026-11-12** — Added **dkm** (Astro 7 static site for Donyell Kennedy-McCullough; GitHub Pages at dkm.pasadenaworks.com) on **FE 3200**, claiming the AVAILABLE 3200–3209 block.
- **2026-07-09** — Added **spar** (Next.js 16 App Router; Retell voice + Stripe later; staging spar.bahtzang.com) on **FE 3110**, claiming the FUTURE-1 block (3110–3119 / 4110–4119). Mirrored MASTER-PORTS.md + PORTS.md into the spar folder. Also removed a stray empty `package-lock.json` from `~/Projects` that was confusing Next.js's workspace-root detection.
- **2026-06-30** — Added **vouch** (Next.js 16 + Supabase cloud) on **FE 3020**, claiming the reclaimed fsvppro block (3020–3029). Mirrored MASTER-PORTS.md + PORTS.md into the vouch folder and re-synced all project copies; also added the missing PORTS.md to alephco.io. Vouch dev server pinned to `-p 3020`.
- **2026-05-11** — Full sync: updated date, added top-level MASTER-PORTS.md + PORTS.md to all project folders (alephco.io, bbq-judge, thefantasticleagues). Created root PORTS.md quick-reference and README.md for Projects folder.
- **2026-04-20** — Major restructure: added alephco.io, bahtzang-trader, tabledrop, jameschang.co, thirstypig, cooper-stack3, and `-www` marketing sites. Resolved 3 port conflicts (3060, 4060, 3030). Retired fsvppro block.
- **2026-03-08** — Initial 5-project registry (fbst, fvsppro, bbq-judge, ktv-singer, tastemakers).
