# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint check
```

No test suite exists in this project.

## Architecture

**Next.js 16 App Router**, TypeScript, Tailwind v4, Framer Motion. Pure frontend — no backend, no database, no API routes.

### Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage — assembles section components |
| `/casestudies` | `src/app/casestudies/page.tsx` | Blog/case study listing with search + pagination |
| `/casestudies/[slug]` | `src/app/casestudies/[slug]/page.tsx` | Individual case study page (statically generated) |

### Content Data Layer

All content lives in `public/data/*.ts` — there is no CMS or database.

- **`public/data/blogs.ts`** — The primary data file. Despite the name, it powers the `/casestudies` pages. Each entry is a `Blog` object with a `hero` block (title, description, meta stat, image/video) and a `body.sections` array. Sections support: `title`, `text` (string or string[]), `iconList`, `bullets`, `stats`, `image`, `video`. Adding a new case study means adding an entry here; `generateStaticParams()` in `[slug]/page.tsx` auto-picks it up for static generation.
- **`public/data/testimonialData.ts`** — Testimonial content for `src/app/components/Testimonials.tsx`.
- **`public/data/toolsData.ts`** — Tool/logo data for the stack strip.

Other section content (the homepage case-study carousel, hero copy, process phases) is defined inline in its own component rather than in `public/data`.

### Homepage Section Order

`page.tsx` renders sections in this order:
`Hero` → `FeaturesSection (Scroll.tsx, "Why Repeatless")` → `TwoTracks` → `SolutionsSection` → `HeroSection (AUtomation.tsx, "How we work")` → `CaseStudies` → `TestimonialsSection` → `FounderSection` → `OfferBanner` → `CTASection`

### Layout & Chrome

`src/app/layout.tsx` — Sets all SEO metadata (title, description, OpenGraph, Twitter card, JSON-LD structured data), loads Geist fonts, and wraps the app in `SiteChrome`.

`src/Components/SiteChrome.tsx` — Wraps every page with `<Navbar>`, `<Footer>`, and a fixed WhatsApp floating button (wa.me/919849884501).

### Styling Conventions

- Tailwind v4 utility classes throughout. All design tokens live in the `@theme` block in `globals.css` — use the semantic names, not raw hex.
- **Light editorial identity.** Neutrals: `paper` `#F8FAFC` (page ground), `surface` `#FFFFFF` (cards), `surface2` `#F0F6FA`. Ink/text: `ink` `#0A0F14`, `slate` `#3B454E` (body), `slate2` `#5F6B76` (muted).
- Accent is sky blue, not purple: `sky` `#0284C7` (links/buttons), `skydeep` `#075985` (hover), `skysoft` `#E0F2FE` (tint fills), `skybright` `#38BDF8` (glows, graphics).
- Font roles: `font-display` (Fraunces serif — section headings), `font-sans` (Geist — body, and the hero/footer wordmark), `font-monoui` (Geist Mono — eyebrows, labels). The `.eyebrow` helper class is also in `globals.css`.
- Animations: Framer Motion (`motion.*` with `fadeUp`/`rise` variants defined locally per component).
- Use `overflow-x-clip`, never `overflow-x-hidden`, on `html`/`body`/section wrappers — `hidden` creates a scroll container and silently breaks `position: sticky` anywhere in the tree (the pinned "How we work" console depends on this).

### Images

- Local assets: `/public/images/` — referenced as `/images/filename`
- External assets: Cloudinary (`res.cloudinary.com`) — allowed in `next.config.ts`
- Do not use `next/image` for Cloudinary URLs with unknown dimensions; use plain `<img>` instead (as done in the blog body component)

### Booking & Contact

- Booking CTA links to: `https://calendly.com/chandannetha/30min`
- WhatsApp: `https://wa.me/919849884501`
- Social: Instagram `@chandan_cheripally_`, YouTube `@chandankumarnetha`, LinkedIn profile linked in `layout.tsx` JSON-LD

### Key Files to Know

- Add/edit case studies: `public/data/blogs.ts`
- Change homepage layout/order: `src/app/page.tsx`
- Change site-wide SEO: `src/app/layout.tsx`
- Change nav/footer: `src/Components/Navbar.tsx`, `src/Components/Footer.tsx`
- Change global styles/fonts: `src/app/globals.css`
