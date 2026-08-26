# Full-site completion & content-brief pass — design

**Date:** 2026-07-27
**Branch:** `redesign-light-editorial`
**Status:** Approved by user, proceeding to implementation

## Context

The light-editorial re-identity (Fraunces + Geist, white/black/sky-blue, agency
voice) is already applied consistently across the homepage and `/casestudies`
pages — verified against current code, not assumed from stale memory. This spec
covers the remaining pass: reconciling stale SEO/positioning copy, and
incorporating new content from `Repeatless_Website_Content_Brief.docx` (dropped
into repo root 2026-07-27) that the current site doesn't yet reflect —
Training & Consulting as a second service track, a named team, and four new
named case studies.

Reference: `info.md` (living site analysis), the content brief docx, and prior
spec `docs/superpowers/specs/2026-07-12-content-brief-copy-updates-design.md`.

## Decisions (confirmed with user)

- **Scope:** finish/polish + incorporate the content brief. No line drawn at
  "just polish" — full positioning upgrade is in scope.
- **New case studies:** cleared to publish with real client names (Taashee
  Linux Services, RC Trend Setters, Amazinga/SPORTKART, True North Homes).
  Written **qualitatively — no invented metrics/percentages**. Each gets a
  hand-built abstract SVG "workflow diagram" asset (dark system-window visual
  language, matching existing case studies) in place of a real screenshot —
  saved as a static asset, no data-model changes to `blogs.ts` types.
- **Team:** dedicated `/about` page. Name + role only (Teja — CTO; Lakshmi,
  Srivali, Shiva, Smanth — Automation Development). No photos/bios yet —
  editorial roster treatment (monogram-initial style, consistent with how
  `Testimonials.tsx` already avoids fake avatar photos), not a generic
  circular-headshot grid.
- **Training & Consulting:** new homepage section, not a separate page. Frames
  two self-select tracks (Done-For-You vs. Training & Consulting) — explicitly
  **not** a generic two-pricing-card-side-by-side layout.
- **GHL & Tally:** include both in the public tools/stack marquee (user
  overrode the brief's own "unconfirmed" caveat).
- **SEO positioning split:** "India's leading AI automation agency for B2B
  companies" lives in meta title/description/JSON-LD only (low-competition,
  high-signal search angle). On-page hero/body copy is unchanged — stays
  globally voiced ("Serving B2B Worldwide," USA/Canada/Europe, $5M+ B2B). These
  are not in conflict; they serve different audiences (search crawlers vs.
  site visitors).
- **Cleanup deferred:** dead code found during audit (`Video.tsx`,
  `shero.tsx`, `Logo.tsx`, unused `public/data/*` stubs, unused `gsap` /
  `embla-carousel-react` deps, a stray screenshot in `public/`) is **not**
  touched this pass per explicit user instruction ("don't remove anything
  first"). Revisit after this pass ships.

## Work items

### 1. SEO & metadata — `src/app/layout.tsx`
- Title → `Repeatless — India's Leading AI Automation Agency for B2B Companies`
  (or close variant keeping brand voice)
- Description → adapted from brief's suggested meta description, tightened to
  house copy style
- Fix OG image path (currently relative `./images/logo.svg` — bug), add a real
  Twitter card image
- JSON-LD: agency framing (drop solo "I", drop India from `areaServed`, keep
  Hyderabad as an address field), add Training & Consulting to `serviceType`
- Drop the 29-term keyword-stuffing array; rely on real content + structured
  data instead

### 2. Tools stack — `src/app/components/toolsData.ts`
- Add GoHighLevel (GHL) and Tally entries + sourced/built SVG marks in
  `public/images/tools/`, matching the existing icon set's style (flat,
  single-brand-color, same viewBox conventions)

### 3. Four new case studies — `public/data/blogs.ts`
- Taashee Linux Services — full outbound + content stack (LinkedIn, WhatsApp
  CRM, blog, email outreach, publishing) — flagship "one system replaces five
  tools" framing
- RC Trend Setters (Shopify) — lead capture, abandoned-cart recovery,
  broadcast campaigns
- Amazinga / SPORTKART (Croatia) — WhatsApp + voice AI agent (Retell AI +
  Twilio) — first case study with a genuinely European client, reinforces the
  "USA, Canada & Europe" claim with a real example
- True North Homes (Canada) — AI CEO agent, full multi-agent orchestration —
  ties directly to the existing "Multi-agent AI systems" Solutions tab
- Each: `BlogMeta` + `BlogHeroData` + `BlogBodyData` sections, qualitative
  copy only, `meta.stat` uses a descriptive phrase (what was built) rather
  than a numeric claim
- New static SVG diagram asset per case study in `public/images/casestudies/`,
  referenced via the existing `image` string field — no component changes to
  `WorkTile`, the `/casestudies` grid, or `BlogHero`/`BlogBody`

### 4. `/about` page — new route `src/app/about/page.tsx`
- Founder story building on the existing `Founder.tsx` copy (not replacing it)
- Team roster section: editorial list styled with monogram-initial badges (no
  circular headshot grid), name + role per person
- Own page metadata (title/description)
- `src/Components/Navbar.tsx` and `src/Components/Footer.tsx`: "About" link
  → `/about` (was `/#founder`)
- `src/app/components/Founder.tsx` (homepage teaser): unchanged except one
  added "Meet the team →" link to `/about`

### 5. New homepage section — "Two ways to work with us"
- New component, placed in `src/app/page.tsx` after `FeaturesSection`
  ("Why Repeatless") and before `SolutionsSection`
- Two visually distinct panels, not matching pricing cards: Done-For-You
  keeps the system-window visual motif already established; Training &
  Consulting gets a distinct visual metaphor (session/blueprint framing, not
  another phone/chat mockup)
- Both CTAs → existing Calendly link (unified CTA convention, no new booking
  flow)

### 6. QA pass
- `npm run build` clean
- Responsive check (mobile/tablet/desktop) on new sections + `/about`
- Visual review of new sections in dev server before calling done

## Explicitly out of scope this pass

- Dead-code cleanup (item 6 above) — deferred per user instruction
- Any change to already-shipped sections' visual design (Hero, Solutions
  carousel, build console, testimonials, etc.) beyond the specific link/nav
  changes listed above
- Real photos/bios for the team — placeholder-free editorial treatment stands
  until provided
