# DKM — status

**Last updated:** 2026-11-12

**One line:** Marketing site for Donyell Kennedy-McCullough's talent producing and booking business, at https://dkm.pasadenaworks.com.

## Scope / positioning
- For producers, networks, brands, agencies and creator-led shows that need Black guests and talent.
- Presents her as "Former SVP, Artist & Talent Relations Strategy and Casting" (REVOLT, TV One, BET, Telepictures). "Fractional" lives in the services copy, not her title.
- It is NOT: a pricing page (no pricing anywhere), a credits/portfolio site (Credits page deferred), a blog, or a CMS.
- Built by James on Donyell's behalf; she approves all copy and photos before launch.

## Stack & hosting
- Astro 7 static site, TypeScript strict, fonts self-hosted via @fontsource.
- Vitest (72 tests) + Astro Container API + happy-dom; Worker tests via `node --test` (9).
- GitHub Pages via Actions (`thirstypig/dkm`, deploy on push to `main`), custom domain with enforced HTTPS (cert auto-renews).
- DNS: Squarespace Domains, `dkm` CNAME → `thirstypig.github.io`.
- Contact form: Formspree (form connected, submissions emailed by Formspree).
- Review comments: Cloudflare Worker `dkm-review` + KV, CORS locked to the site.

## URLs
- Site (pre-launch, password-gated, noindex): https://dkm.pasadenaworks.com
- Comment Worker: https://dkm-review.jimmyc316.workers.dev
- Repo: https://github.com/thirstypig/dkm

## Shipped (last 60 days)
- 2026-11-12: five-page site (Home, Services, How She Works, About, Contact) + 404, from the approved design spec.
- DKM monogram logo (header, footer, hero) and favicon.
- Formspree inquiry form with honeypot, keep-input-on-failure, and a not-connected state.
- Hidden from search: noindex on every page, robots.txt disallow-all, no sitemap.
- Pre-launch review layer: client-side password gate, slide-out feedback sidebar, click-to-place pins.

## In progress
- Donyell's review of copy, photos and name spelling via the feedback overlay.

## Open bugs / known issues
- Password gate is not security: the hash ships in public JS and the repo is public.
- Comment Worker is open to direct (non-browser) requests; no delete/moderation except the Cloudflare dashboard.
- Logo lockup reads "Kennedy McCullough" (no hyphen); logo files are marked as a working draft.
- Deferred minors from final review: not-connected notice sits below the fields; no-JS phones can't open the nav; burger tap target ~34px; deploy skips typecheck.

## Next phases
1. Collect and apply Donyell's feedback.
2. Confirm name spelling and final logo with her (designer pass optional).
3. Launch: remove the gate, overlay and Worker; remove robots.txt Disallow, then the noindex meta; add a sitemap; update the tests that guard these.
4. Credits page once she supplies an approved list.

## Decisions changed recently
- Added a password gate + feedback overlay (owner's request) after initially shipping with no gate.
- `--muted` darkened from #8A8780 to #6F6C65 for WCAG AA contrast.
