# Repeatless — Project Info & Analysis

> Living reference for the Repeatless landing site. Captures the business, the
> tech, the content inventory, and known issues. Update as things change.

---

## 1. The Business

**Repeatless** is an AI-automation **agency / team**, founded and led by
**Chandan Kumar Cheripally** ("Chandan Netha") — **founder, CEO & owner** —
operating from **Hyderabad (L.B. Nagar), India**, selling to **USA / Canada / UK / Europe**.

> ⚠️ **Correction (2026-07-06):** Repeatless is a **team led by the founder**, NOT a
> solo operator. The current live site leans hard on "solo / you get me / not an
> agency" (Hero, Founder, OfferBanner, `CreativeProgress.md`) — that framing is wrong
> and must be reframed site-wide to "a specialist team, led by the founder."

- **Positioning:** A specialist team led by its founder — builds & maintains custom
  **Claude AI + n8n / Make.com** automation workflows.
- **Value lever:** Senior/founder-level involvement + a real team delivering.
- **Copy north-star:** minimal, powerful, intentional, psychologically trust-building.
- **Sites:** `repeatless.in` (this app) · `repeatlessblogs.in` (separate blog)
- **Reach / proof:** 100K+ social followers (Instagram ~35K), YouTube, LinkedIn
- **Contact:** contact@repeatless.in · WhatsApp +91 98498 84501 · Calendly `chandannetha/30min`
- **Offer mechanics:** 7–10 day builds · 1 month free support · full maintenance ·
  ROI dashboard · 30-day results guarantee · free $499 n8n template pack.

**Services:** Workflow automation, smart chat agents, mass voice automation,
lead-gen & sales ops, CRM sync, content/social automation, e-commerce ops.

---

## 2. Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router) · TypeScript · Tailwind v4
- **Animation:** Framer Motion · GSAP · Embla carousel · react-fast-marquee
- **Nature:** Pure frontend — no backend, no DB, no API routes
- **Hosting/analytics:** Vercel · Google Analytics 4 (`G-WHBPXY1YRW`)
- **SEO:** Rich metadata, OpenGraph/Twitter, JSON-LD `ProfessionalService`,
  dynamic `sitemap.ts` (auto-includes blog slugs), `robots.ts`
- **Bundled agent skills** (`.agents/skills/`): copywriting, frontend-design,
  programmatic-seo, seo-audit

### Routes
| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage — assembles section components |
| `/casestudies` | `src/app/casestudies/page.tsx` | Listing w/ client-side search + pagination (6/page) |
| `/casestudies/[slug]` | `src/app/casestudies/[slug]/page.tsx` | Individual case study (statically generated from `blogs.ts`) |

### Homepage section order (`page.tsx`)
`Hero → Solutions(5) → Video → AUtomation(4-step) → Packages(2) → Tools(14) →
CaseStudies(6 featured) → Testimonials(7) → Founder → CTASection → OfferBanner`

### Chrome
- `src/Components/SiteChrome.tsx` wraps every page: `Navbar` + `Footer` + fixed WhatsApp button
- Navbar: glassmorphic floating pill, "Book a Demo" → Calendly
- Nav links: Home, Solutions, Case Studies, About Us (`#testimonials`), Contact (`#contact` — no target exists)

---

## 3. Design Language (current)

- **Base background:** `#04051B` (also `#050014`, `#0A0118`, `#08001A` variants)
- **Accents:** purple `#4D00FF` / `#8400FF` / `#6D21F0`, blue `#1C76FD`
- **Fonts:** Poppins (headings), DM Sans (body), Jakarta; Geist loaded in layout
- **Motif:** purple/blue radial glows (blurred circles), gradient borders on cards,
  shooting-stars canvas in hero
- **Animation:** Framer Motion `fadeUp` / stagger throughout; hover scale on CTAs

---

## 4. Content Data Layer (`public/data/`)

- **`blogs.ts`** — PRODUCTION content. Powers `/casestudies`. **~10 detailed case
  studies + 6–7 SEO blog guides**, real Cloudinary media, specific scenarios.
  `generateStaticParams()` auto-picks up new entries.
  - Case studies: AI video ad automation (NY agency), short-form reels (Toronto),
    SEO blog automation (Canada), Instagram DM/comments, LinkedIn post generator (B2B),
    newsletter lead-gen, WhatsApp book-launch broadcast, Chicago luxury bike shop social,
    WhatsApp local service connector (US), QR event attendance.
  - Blog guides: real-estate lead follow-up, n8n vs Zapier, save 20 hrs/week,
    Instagram content automation, best tools for agencies, WhatsApp guide, Claude+n8n stack.
- **`testimonialData.ts`** — 7 testimonials, real names/companies/cities
  (Ali Shah/Pixel Social/Toronto, David Clarke/ScaleUp/Chicago, Sandra Chen/NorthStream/Vancouver,
  Mark Stevens/ProReach/NY, Maria Costa/Bluebell Publishing, Ryan Patel/Vector/Austin,
  James Miller/QuickFix/Ohio).
- **`caseStudies.ts`** — 3 LEFTOVER placeholder cards (generic ALL-CAPS names, shared
  `Image.png`). NOT used by blog pages.
- **`herodata.ts` / `bodydata.ts`** — Lorem Ipsum stubs, unused.

### Blog data shape
```
BlogMeta:     { slug, title, category, date, excerpt, image }
BlogHeroData: { title, description, meta: { solution, stat }, image, video? }
BlogBodyData: { sections: Array<{ title?, text?, stats?, iconList?, image?, video?, bullets? }> }
```

---

## 5. Homepage Section Copy (current, condensed)

1. **Hero** — Badge: "100K+ followers · 30+ businesses automated · USA, Canada & Europe".
   Headline: "We Build AI That Runs Your Business." Sub: "Hi, I'm Chandan Kumar — AI
   automation consultant…". CTA: "Get a Free Automation Audit". Stats: 30+ / 100+ / 100K+.
   Shooting-stars canvas bg.
2. **Solutions** — 5 cards (Workflow Automation, Smart Chat Agents, Mass Voice Automation,
   Effortless Operations, Tailored AI Solutions). Animated gradient borders.
3. **Video** — `Repeatless.mp4` with custom play button + glow border.
4. **AUtomation** ("How I Work With You") — 4 steps: Discover → Design → Deploy → Scale.
   Desktop uses absolute-positioned cards + dashed SVG connector.
5. **Packages** — 2: Marketing Automation, Content Automation (marked "Most Popular").
6. **Tools** — 14 logos (Claude, OpenAI, Gemini, n8n, Make, Zapier, WhatsApp, Slack,
   Telegram, HubSpot, Notion, Airtable, Google Sheets, Google Drive).
7. **CaseStudies** — first 6 from `blogs.ts` as cards → `/casestudies`.
8. **Testimonials** — carousel of the 7.
9. **Founder** — "Hi, I'm Chandan Kumar." photo (`myavatar.png`), bio, social links, stats bar.
10. **CTASection** — "Ready to Stop Doing Work AI Should Handle?"
11. **OfferBanner** — 6 deliverables (DFY build, 1mo support, maintenance, ROI dashboard,
    30-day guarantee, free $499 template pack).

---

## 6. Known Issues / Negatives (as of this analysis)

1. **All 7 testimonials share `/images/avatar.jpg`** — instant trust killer. Highest-ROI fix.
2. **Inconsistent stats** — Hero & Founder say *30+ businesses / 100+ automations*; metadata
   JSON-LD, footer copy, and roadmap say *80+ businesses / 300+ builds*. Reconcile to one truth.
3. **Geography mismatch** — layout title/OG say "USA, Canada & Europe"; JSON-LD `areaServed`
   and footer say "USA, Canada & **India**". Pick one.
4. **Dead nav anchors** — Navbar "Contact" → `/#contact` and "About Us" → `/#testimonials`;
   no real contact section / id mismatch.
5. **Leftover placeholder data** — `caseStudies.ts`, `herodata.ts`, `bodydata.ts` unused/stub.
6. **Solutions copy is generic** — "we/our" agency voice conflicts with the solo "I" brand
   elsewhere. Voice is inconsistent across sections (I vs we).
7. **No clear visual signature** — heavy reliance on the common dark + purple-glow SaaS look;
   reads somewhat templated (per CreativeProgress.md, the core complaint).

---

## 7. Growth Roadmap (`CreativeProgress.md`)

15-step plan to convert Western buyers. Step 1 (hero copy) done; 2–15 pending:
Founder/social-proof section, fix testimonials, real case-study data, deep-dive pages,
blog/programmatic SEO, lead magnet, CTA rewrites, packages pricing clarity,
page-speed/mobile audit, Search Console + analytics.

---

## 8. Key Files

- Homepage order: `src/app/page.tsx`
- Sections: `src/app/components/*.tsx`
- Case studies content: `public/data/blogs.ts`
- Testimonials: `public/data/testimonialData.ts`
- Site-wide SEO: `src/app/layout.tsx`
- Nav/footer: `src/Components/Navbar.tsx`, `src/Components/Footer.tsx`
- Global styles/fonts: `src/app/globals.css`
- Booking: Calendly `https://calendly.com/chandannetha/30min` · WhatsApp `wa.me/919849884501`
</content>
</invoke>
