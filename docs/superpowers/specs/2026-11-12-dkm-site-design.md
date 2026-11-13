# DKM — Donyell Kennedy-McCullough Site · Design

**Status:** Draft for review · 2026-11-12
**URL:** https://dkm.pasadenaworks.com
**Repo:** `thirstypig/dkm` (GitHub)
**Visual review draft:** `review/index.html` (open in a browser)

---

## 1. Intent

A professional site for Donyell Kennedy-McCullough's talent producing and booking business. It exists so that producers, networks, brands, agencies, and creator-led shows who need Black guests and talent can quickly understand what she does, believe she can do it, and get in touch.

Source of truth for the business: `~/Downloads/2026-Sept Donyell Casting -- Second Draft.docx` ("the concept doc"). Source of truth for career facts: her LinkedIn profile (screenshot PDF, 2026-11-12).

**Success:** a qualified prospect lands, reads the pitch, and sends an inquiry.

## 2. Goals, non-goals, anti-goals

**Goals**
- Lead with her pitch: *"Bookings fail in two ways. Either the audience doesn't care, or the guest doesn't deliver. I'm hired to prevent both."*
- Make the two services concrete, with "fractional" framed in the Talent Producing service, not in her title.
- Show what a client actually gets each week (the deliverables), which few competitors spell out.
- Establish credibility through named career history: REVOLT, TV One, BET, Telepictures.
- One clear action everywhere: **Start an inquiry** → Contact.

**Non-goals (this version)**
- No pricing anywhere (explicit instruction).
- No Credits / Work page (deferred until she supplies a nameable list).
- No blog, newsletter signup, or CMS.
- No internal go-to-market content from the concept doc (lead-gen roles, "Pops", existing-relationship notes).
- No expense / payment terms.

**Anti-goals (would be a failure even if it works)**
- Looking like a template or like Evolve with the name swapped. Evolve is the *mood* reference, not a copy.
- Overclaiming: any credit, client, or talent name she hasn't approved.
- Photos of her children, other talent, or other people's work (Getty, colleagues' posts).
- Reading as a job-seeker's résumé instead of a business.

## 3. Constraints

- Static site on GitHub Pages, matching the owner's sibling sites (`pasadenaworks`, `minmeychang`): **Astro 7**, GitHub Actions deploy, fonts self-hosted via `@fontsource`.
- DNS for `pasadenaworks.com` is managed in Squarespace Domains (Google-Domains-era nameservers, not Cloud DNS); `www` already CNAMEs to `thirstypig.github.io`. Add `dkm` CNAME → `thirstypig.github.io` and a `CNAME` file in the repo.
- Contact form via **Formspree** (same pattern as `pasadenaworks/src/data/site.ts`). No backend.
- Photos: five Instagram images, 1025–1440 px wide, all portrait orientation (`review/img/`). Layouts must favor portrait crops; no full-bleed landscape heroes.
- Copy in American English.
- Donyell approves all copy and photos before the site is public.

## 4. Sitemap

| Page | Path | Purpose |
|---|---|---|
| Home | `/` | Wordmark, title, pitch, two services in brief, career strip, CTA |
| Services | `/services` | Talent Producing (fractional) + Talent Booking, who each is for |
| How She Works | `/approach` | Weekly deliverables + the "two failure modes" philosophy |
| About | `/about` | Bio + career timeline |
| Contact | `/contact` | Inquiry form + direct links |

Nav order: Services · Approach · About · Contact. Logo returns Home.

## 5. Brand & visual system

Full tokens are in the style sheet in `review/index.html`. Summary:

**Logo.** Text wordmark **DKM** only: condensed all-caps display face, tight, black. Header uses a small version; Home hero uses it oversized (Evolve's signature move, applied to three letters).

**Color.** Near-monochrome on warm paper, one accent.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FAF8F3` | Page background |
| `--ink` | `#111111` | Headlines, logo |
| `--text` | `#3B3B3B` | Body |
| `--muted` | `#8A8780` | Nav, captions, meta |
| `--rule` | `#E4E0D6` | Hairlines |
| `--accent` | `#7A2E22` | CTA button, link hover, small marks (oxblood) |
| `--paper-dark` | `#141312` | Inverted band (pitch quote) |

**Type** (all free, self-hosted)
- Display: **Bebas Neue** — logo, page titles, big numerals. All caps, slight tracking.
- UI: **Archivo** 300/500 — nav, labels, buttons. Uppercase, tracked ~0.12em, small.
- Body: **Newsreader** 400/italic — paragraphs and the pitch quote.

**Layout.** Max content width 1200 px; 50/50 photo + text splits on desktop, stacked on mobile; generous whitespace; hairline rules between sections; no cards with shadows; no rounded corners beyond 2 px.

**Photo use (from `review/img/`)**
- `01-ebony-power100` — Home hero (right half)
- `02-bookshelf-portrait` — About
- `03-floral-blazer-portrait` — Services
- `04` / `05` selfies — small accents only (Contact, footer of About), or omit

## 6. Page content (draft copy is in the review file)

**Home**
1. Header: DKM logo left; nav right; Instagram icon.
2. Hero split: left — oversized **DKM**, name, title line "Former SVP, Artist & Talent Relations Strategy and Casting", one-sentence positioning, CTA. Right — photo 01.
3. Pitch band (dark): the two-failure-modes quote, attributed.
4. Two services side by side, 2–3 lines each, link to Services.
5. Career strip: REVOLT · TV One · BET · Telepictures (text, not logos).
6. Closing CTA band → Contact.
7. Footer: name, socials (Instagram, Threads, YouTube, LinkedIn), © year.

**Services**
- Talent Producing — "Your fractional talent producer." Runs the guest side of a series week over week; credited as Talent Producer; the deliverable list; fits productions where a full-time hire doesn't.
- Talent Booking — sourcing, vetting, and booking for a defined project, campaign, or event.
- Who she works with: Black-audience media & brands; general-market networks, brands, agencies, production companies; creator-led and recurring series; casting shops needing overflow.
- Scope note: talent fees, deal negotiation, and representation are outside scope (one line, factual, from the concept doc).

**How She Works (`/approach`)**
- The two failure modes, expanded (audience fit vs. guest delivery; the "freezes off-script / difficult with crew / talks for thirty minutes" examples).
- Numbered weekly cadence: 01 Guest strategy · 02 Forward pipeline · 03 Tailored pitches to representation · 04 Scheduling to the production calendar · 05 Prep document per booked guest · 06 Shared booking tracker · 07 Weekly status call.

**About**
- Bio (third person, ~150 words) built only from LinkedIn + concept doc facts.
- Timeline: REVOLT Media & TV — SVP, Talent Relations and Casting (2022–2025); TV One — Head of Talent and Casting (2015–2022); Telepictures — Talent Executive, "Just Keke" (2014); BET Networks — Talent Executive (2009–2014).
- Network line: direct relationships with talent, managers, and publicists.
- Optional: published author / photographer (from LinkedIn + IG bio) as one human line.

**Contact**
- Short intro, Formspree form: Name, Email, Company / Show, Service (Talent Producing / Talent Booking / Not sure), Message.
- Direct links: Instagram, Threads, YouTube, LinkedIn.

**Social URLs**
- Instagram: https://www.instagram.com/donyellkennedymccullough/
- Threads: https://www.threads.com/@donyellkennedymccullough
- YouTube: https://www.youtube.com/channel/UCKr3zXboSlu9wY_KjiIr4dA (tracking wrapper removed)
- LinkedIn: https://www.linkedin.com/in/donyellkennedymccullough/

## 7. Decided by the owner (James)
- Domain `dkm.pasadenaworks.com`, repo `/dkm`.
- Multi-page site (not one-pager); Credits page skipped for now.
- Logo = letters DKM only.
- Photos from her Instagram.
- Evolve Artists Agency as design basis; simple and clean.
- Concept doc as content basis; **no pricing**.
- Use her LinkedIn title; "fractional" goes in services wording, not title.
- Name REVOLT, TV One, BET.

## 8. Claude's calls (check these)
- Title line: "Former SVP, Artist & Talent Relations Strategy and Casting" — LinkedIn headline, minus "(NOT HR)", plus "Former" since the REVOLT role ended Feb 2025.
- Five pages incl. a separate "How She Works" page (could fold into Services).
- Fonts Bebas Neue / Archivo / Newsreader; oxblood accent; warm paper background.
- Career strip as text, not employer logos (logo use needs permission).
- Stack: Astro 7 + GitHub Pages + Formspree, mirroring sibling sites.
- Bio written in third person.

## 9. Left to the builder
- Component structure, image pipeline (Astro `<Image>`), meta/OG tags, favicon from the wordmark, analytics (or none), test setup consistent with sibling repos, dev port from `~/Projects/MASTER-PORTS.md`.

## 10. Owner answers (2026-11-12)
1. **Inquiry form:** Formspree. A new form (not pasadenaworks') created by James in his Formspree account; he supplies the form ID. Destination email is configured in Formspree, not in the repo. Contact page is form-only (no mailto) unless James says otherwise. Build uses a single `FORMSPREE_ID` constant; until it's supplied, the form renders but shows a "not yet connected" state instead of silently failing.
2. **Deploy:** directly to `dkm.pasadenaworks.com` (no separate preview URL), **hidden from search engines** for now: `<meta name="robots" content="noindex, nofollow">` on every page, `robots.txt` disallow-all, no sitemap. No password gate (not requested). Removing noindex is a deliberate later step once Donyell approves.
3. **About extras:** all in — published author and photographer; board member, Black Girls Film Camp.

**Settled by Claude after builder check**
- Photo 01 is Donyell alone, posted on her own account; usable for the draft. Final photo set still goes through her approval (§3). Replace with professional originals if she has them.
