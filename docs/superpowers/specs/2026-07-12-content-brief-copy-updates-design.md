# Content-Brief Copy Updates — Phase 1 (existing sections)

**Date:** 2026-07-12 · **Branch:** `redesign-light-editorial` · **Source:** `Repeatless_Website_Content_Brief.docx`

## Scope

Update existing homepage sections to the new positioning from the content brief:
"AI infrastructure for $5M+ B2B companies, served globally, founder-led and team-delivered."
New sections/pages (Team, Training & Consulting track, target-clients strip, new named case
studies) are **phase 2**. All SEO metadata (`layout.tsx`) deliberately untouched.

## Decisions (user-confirmed)

1. **Geography:** global framing — eyebrow "AI Automation Agency · Serving B2B Worldwide";
   "India's leading" reserved for SEO/metadata later.
2. **$5M+ threshold:** stated in support copy, not the H1.
3. **$100M+ combined client revenue:** confirmed — becomes the hero proof stat.
4. **Offer mechanics:** enterprise reword — drop "$499 template pack", soften "7–10 days";
   guarantees/maintenance/ROI dashboard stay.
5. **CTA label:** unified to "Book a strategy call" (Hero, Navbar, OfferBanner, CTASection).
6. **Tools:** add Shopify + MCP to marquee (Simple Icons, monochrome). Antigravity appears in
   copy only (no recognizable mark). GHL/Tally held until confirmed client-facing
   (brief open item #2).

## Per-file changes

| File | Change |
|---|---|
| `src/app/components/Hero.tsx` | New eyebrow, new subline (unified infrastructure + $5M+), stats → $100M+ hero tile + 100+/30+ supporting, CTA label |
| `src/app/components/Scroll.tsx` | Expert card → "Claude, MCP & n8n experts" + Antigravity copy; chips: GoHighLevel → Shopify |
| `src/app/components/Solutions.tsx` | 5 generic items → 6 concrete offerings from brief §7 (WhatsApp & CRM, lead gen & outreach, content & publishing, voice AI, dashboards & internal tools, multi-agent systems) |
| `src/app/components/AUtomation.tsx` | Discover desc → "A strategy session — workflows, tools, where AI fits." |
| `src/app/components/Founder.tsx` | Para 2/3 → brief §10 founder message ($5M+, Claude+Antigravity, $100M+) |
| `src/app/components/OfferBanner.tsx` | $499 pack → "One unified infrastructure"; DFY build desc reworded; CTA label |
| `src/app/components/CTASection.tsx` | CTA label |
| `src/Components/Navbar.tsx` | "Book a Demo" → "Book a strategy call" (×2) |
| `src/app/components/toolsData.ts` | + Shopify, + MCP; WhatsApp → "WhatsApp Business API" |
| `public/images/tools/{shopify,mcp}.svg` | New icons (Simple Icons CDN) |
