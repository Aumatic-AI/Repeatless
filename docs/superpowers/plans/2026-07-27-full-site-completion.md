# Full-Site Completion & Content-Brief Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconcile stale SEO/positioning copy and incorporate the content brief's new material (Training & Consulting track, named team, four new case studies, expanded tools stack) into the already-shipped light-editorial redesign, without touching anything already approved and working.

**Architecture:** Pure frontend, Next.js App Router, no backend. All new content is data (`public/data/blogs.ts`, `src/app/components/toolsData.ts`) or self-contained components following the exact conventions already established elsewhere in this codebase (Tailwind v4 utility classes, `font-display`/`eyebrow` helpers, `bg-paper`/`text-ink`/`sky` tokens from `globals.css`, Framer Motion `whileInView` reveal pattern used by every existing section).

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, Framer Motion. No test framework exists in this repo (confirmed in `CLAUDE.md`) — verification is `npm run build` (type-check + compile) plus manual visual review in the dev server, which is how every prior section of this redesign was verified.

## Global Constraints

- Design tokens only from `src/app/globals.css` `@theme` — `paper` `#F8FAFC`, `surface` `#FFFFFF`, `surface2` `#F0F6FA`, `ink` `#0A0F14`, `slate` `#3B454E`, `slate2` `#5F6B76`, `sky` `#0284C7`, `skydeep` `#075985`, `skysoft` `#E0F2FE`, `skybright` `#38BDF8`. No purple/violet, no new colors.
- Fonts: `font-display` (Fraunces) for headings only, body stays default Geist sans, `font-monoui` (Geist Mono) for eyebrows/tags/stats — never introduce a new font.
- Copy voice: minimal, powerful, trust-building (see `[[copy-philosophy]]`) — agency/team framing, never solo "I" for the business itself (`[[repeatless-is-agency]]`).
- **No invented metrics.** The four new case studies describe what was built and why it mattered — no fabricated percentages, dollar figures, or time-saved claims.
- CTA convention: every booking CTA points to `https://calendly.com/chandannetha/30min`, labeled "Book a strategy call" (or WhatsApp `https://wa.me/919849884501` as the secondary).
- `"use client"` directive required on every component using Framer Motion or hooks (all existing components do this — follow the pattern).
- Every task ends with `npm run build` passing clean (26+ static pages, no type errors) before commit.
- Full spec: `docs/superpowers/specs/2026-07-27-full-site-completion-design.md`.

---

### Task 1: SEO & metadata reconciliation

**Files:**
- Modify: `src/app/layout.tsx:17-102` (the `metadata` export and the inline JSON-LD script)

**Interfaces:**
- Consumes: nothing from other tasks — standalone.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Replace the `metadata` export**

Replace lines 17-67 of `src/app/layout.tsx` with:

```tsx
export const metadata: Metadata = {
  title: "Repeatless — India's Leading AI Automation Agency for B2B Companies",
  description:
    "Repeatless is India's leading AI automation agency, building done-for-you AI infrastructure for $5M+ B2B companies worldwide — WhatsApp & CRM automation, content pipelines, voice AI agents and full multi-agent systems, powered by Claude, Antigravity and n8n. Book a strategy call.",
  openGraph: {
    title: "Repeatless — India's Leading AI Automation Agency for B2B Companies",
    description:
      "Done-for-you AI infrastructure for $5M+ B2B companies — WhatsApp & CRM automation, content pipelines, voice AI agents and multi-agent systems. Built on Claude, Antigravity and n8n.",
    url: "https://www.repeatless.in",
    siteName: "Repeatless",
    images: [
      {
        url: "https://www.repeatless.in/images/thumbnail.png",
        width: 1140,
        height: 548,
        alt: "Repeatless — AI automation agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeatless — India's Leading AI Automation Agency",
    description:
      "Done-for-you AI infrastructure for $5M+ B2B companies, worldwide. Claude, Antigravity & n8n. Book a free strategy call.",
    images: ["https://www.repeatless.in/images/thumbnail.png"],
    creator: "@repeatless",
  },
  metadataBase: new URL("https://www.repeatless.in"),
  alternates: { canonical: "/" },
};
```

This removes the 29-term keyword-stuffing array entirely (outdated practice, does nothing for actual ranking) and fixes two real bugs: the OG image was a broken relative path (`./images/logo.svg`) and would likely not render on most platforms anyway since they expect a raster image, not SVG — swapped for the existing `thumbnail.png` (real dimensions confirmed: 1140×548). The Twitter image was an empty string — now populated.

- [ ] **Step 2: Update the JSON-LD script**

Replace the JSON-LD `dangerouslySetInnerHTML` block (lines 81-102) with:

```tsx
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Repeatless",
              description:
                "India's leading AI automation agency, building done-for-you AI infrastructure and offering AI training & consulting for B2B companies worldwide.",
              url: "https://www.repeatless.in",
              email: "contact@repeatless.in",
              telephone: "+919849884501",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              areaServed: ["US", "CA", "EU", "Worldwide"],
              serviceType: [
                "AI Automation Agency",
                "Done-For-You AI Infrastructure",
                "AI Training & Consulting",
                "Claude AI Automation",
                "n8n Workflow Automation",
                "WhatsApp & CRM Automation",
                "Voice AI Agents",
                "Multi-Agent AI Systems",
              ],
              founder: {
                "@type": "Person",
                name: "Chandan Kumar",
              },
              priceRange: "$$",
              sameAs: [
                "https://www.instagram.com/chandan_cheripally_",
                "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/",
                "https://www.youtube.com/@chandankumarnetha",
              ],
            }),
          }}
        />
```

This fixes the `areaServed` contradiction (was `["US","CA","EU","IN"]`, mixing target market with HQ location) — `address` now carries the real Hyderabad HQ location as structured data (which is what that field is for), while `areaServed` reflects who Repeatless actually serves. Adds Training & Consulting and a `founder` entity, both absent before.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, all 26+ routes still generate, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "$(cat <<'EOF'
Reconcile SEO metadata with agency positioning and content brief

Fixes stale solo-consultant framing, broken OG image path, and the
areaServed/HQ-location conflation in JSON-LD. Adds Training &
Consulting as a service type per Repeatless_Website_Content_Brief.docx.
EOF
)"
```

---

### Task 2: Tools stack — add GoHighLevel and Tally

**Files:**
- Create: `public/images/tools/gohighlevel.svg`
- Create: `public/images/tools/tallysolutions.svg`
- Modify: `src/app/components/toolsData.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `tools` array entries consumed by `src/app/components/Scroll.tsx` (already imports `{ tools } from "./toolsData"` — no changes needed there, it maps over the full array).

**Note on the icons:** neither brand is in the Simple Icons set this repo's other tool icons come from (confirmed: `cdn.simpleicons.org/gohighlevel` and `/tally` both 404). Rather than approximate a trademarked logo without a verified source file, both are original, simple geometric marks in the brand's real color — matching the existing icons' exact format (`viewBox="0 0 24 24"`, single `fill` color, `<title>`, transparent background, no bounding box).

- [ ] **Step 1: Create the GoHighLevel icon**

Write `public/images/tools/gohighlevel.svg`:

```svg
<svg fill="#188AF5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GoHighLevel</title><path d="M2 20h4v-6H2v6zm7 0h4V10H9v10zm7 0h4V4h-4v16z"/></svg>
```

Three ascending bars — an abstract "levels" motif — in GoHighLevel's brand blue (`#188AF5`).

- [ ] **Step 2: Create the TallyPrime icon**

Write `public/images/tools/tallysolutions.svg`:

```svg
<svg fill="#008080" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TallyPrime</title><path d="M2 3h2v18H2V3zm5 0h2v18H7V3zm5 0h2v18h-2V3zm5 0h2v18h-2V3z"/><path d="m2.5 19.5 17.5-17.5 1.5 1.5-17.5 17.5z"/></svg>
```

Four vertical strokes plus one diagonal strike — a literal tally mark, in TallyPrime's brand teal (`#008080`). This is confirmed to mean Tally Solutions / TallyPrime (the Indian accounting/GST software), not the tally.so form builder.

- [ ] **Step 3: Add both to the tools data**

In `src/app/components/toolsData.ts`, add these two entries to the `tools` array (position after `"Shopify"`, since both are business/ops tools like Shopify rather than AI-model tools):

```ts
  { name: "GoHighLevel", icon: "/images/tools/gohighlevel.svg" },
  { name: "TallyPrime", icon: "/images/tools/tallysolutions.svg" },
```

- [ ] **Step 4: Visually verify in the dev server**

Run: `npm run dev`, open `http://localhost:3000`, scroll to "Why Repeatless" → "The stack we build with" marquee. Confirm both new icons render at the same size/opacity as the others and don't look visually broken (no clipped path, correct color).

- [ ] **Step 5: Verify the build and commit**

Run: `npm run build` — expect clean compile.

```bash
git add public/images/tools/gohighlevel.svg public/images/tools/tallysolutions.svg src/app/components/toolsData.ts
git commit -m "$(cat <<'EOF'
Add GoHighLevel and TallyPrime to the tools stack

Original geometric marks in each brand's real color — neither is in
the Simple Icons set the other tool logos come from. Tally confirmed
to mean TallyPrime (Indian accounting/GST software), not tally.so.
EOF
)"
```

---

### Task 3: Case study — Taashee Linux Services

**Files:**
- Create: `public/images/casestudies/taashee.svg`
- Modify: `public/data/blogs.ts` (append new `Blog` entry to the `blogs` array)

**Interfaces:**
- Consumes: `Blog` type (`BlogMeta & { hero: BlogHeroData; body: BlogBodyData }`) already defined at the top of `public/data/blogs.ts`.
- Produces: a `blogs` array entry with `slug: "taashee-full-stack-outbound-automation"` — picked up automatically by `generateStaticParams()` in `src/app/casestudies/[slug]/page.tsx`, the `/casestudies` listing, and the homepage marquee wall (`src/app/components/casestudies.tsx`, which filters `blogs` by `category === "Case Study"`). No changes needed to any of those three files.

- [ ] **Step 1: Create the workflow diagram asset**

Write `public/images/casestudies/taashee.svg` — a hub diagram (five channels feeding one CRM), echoing the same "patchwork vs. one system" visual language already used in `Scroll.tsx`'s `SystemDiagram`:

```svg
<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Taashee Linux Services — five channels, one CRM</title>
  <rect width="400" height="250" rx="16" fill="#0B0E1A"/>
  <circle cx="24" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="40" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="56" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <text x="76" y="24" font-family="ui-monospace, Menlo, monospace" font-size="10" letter-spacing="0.5" fill="#ffffff" fill-opacity="0.4">taashee · outbound engine</text>
  <line x1="0" y1="38" x2="400" y2="38" stroke="#ffffff" stroke-opacity="0.1"/>
  <g stroke="#0284C7" stroke-width="1.5" stroke-opacity="0.7">
    <line x1="200" y1="175" x2="70" y2="90"/>
    <line x1="200" y1="175" x2="150" y2="75"/>
    <line x1="200" y1="175" x2="250" y2="75"/>
    <line x1="200" y1="175" x2="330" y2="90"/>
    <line x1="200" y1="175" x2="200" y2="70"/>
  </g>
  <g font-family="system-ui, sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.55" text-anchor="middle">
    <circle cx="70" cy="90" r="6" fill="#0B0E1A" stroke="#38BDF8" stroke-width="2"/>
    <text x="70" y="76">LinkedIn</text>
    <circle cx="150" cy="75" r="6" fill="#0B0E1A" stroke="#38BDF8" stroke-width="2"/>
    <text x="150" y="61">WhatsApp</text>
    <circle cx="200" cy="70" r="6" fill="#0B0E1A" stroke="#38BDF8" stroke-width="2"/>
    <text x="200" y="56">Blog</text>
    <circle cx="250" cy="75" r="6" fill="#0B0E1A" stroke="#38BDF8" stroke-width="2"/>
    <text x="250" y="61">Email</text>
    <circle cx="330" cy="90" r="6" fill="#0B0E1A" stroke="#38BDF8" stroke-width="2"/>
    <text x="330" y="76">Social</text>
  </g>
  <circle cx="200" cy="175" r="11" fill="#0284C7"/>
  <circle cx="200" cy="175" r="11" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
  <text x="200" y="203" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">One CRM</text>
</svg>
```

- [ ] **Step 2: Append the blog entry**

In `public/data/blogs.ts`, add this object as the last entry in the `blogs` array (immediately before the closing `];`):

```ts
{
  slug: "taashee-full-stack-outbound-automation",
  title: "Full-Stack Outbound & Content Automation for Taashee Linux Services",
  category: "Case Study",
  date: "2026-03-12",
  excerpt:
    "Taashee Linux Services ran five separate manual processes for outreach and content. We replaced all of them with one connected system — LinkedIn, WhatsApp, blog, email and publishing running as a single infrastructure.",
  image: "/images/casestudies/taashee.svg",
  hero: {
    title: "One System Instead of Five Tools",
    description:
      "Taashee Linux Services was running LinkedIn outreach, WhatsApp follow-ups, blog publishing, cold email, and social image posting as five separate manual workflows — each owned by a different person, none of them talking to each other. We connected all five into one AI infrastructure.",
    meta: { solution: "FULL-STACK AUTOMATION", stat: "Five channels, one system" },
    image: "/images/casestudies/taashee.svg"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Taashee Linux Services was running LinkedIn outreach, WhatsApp follow-ups, blog publishing, cold email, and social image posting as five separate manual workflows — each owned by a different person, none of them talking to each other. Leads fell through the cracks between tools, content calendars slipped, and nobody had a single view of what was actually going out or who had replied."
      },
      {
        title: "Solution",
        text: [
          "Unified Outreach Engine: LinkedIn connection requests, follow-ups and replies now run through one automated sequence, synced to the CRM in real time.",
          "WhatsApp CRM Sync: Every WhatsApp conversation — new lead or existing client — logs automatically against the right contact record, no manual copy-paste.",
          "Blog Automation: Keyword research, drafting and publishing to the company blog run on a fixed cadence, reviewed rather than written from scratch.",
          "Email Outreach Sequences: Cold and warm email sequences trigger off CRM stage changes, not a separate spreadsheet.",
          "Image & Social Publishing: Branded graphics generate and post automatically across the company's social channels on schedule.",
          "One Shared Pipeline: LinkedIn, WhatsApp and email now feed the same CRM view — the team sees the whole relationship in one place, not five."
        ],
        image: "/images/casestudies/taashee.svg"
      },
      {
        title: "Why It Works",
        iconList: [
          "Five channels, one source of truth",
          "No more lead handoffs between tools",
          "Content calendar runs itself",
          "Team sees every conversation in one CRM view",
          "New channels plug into the same system",
          "Built to expand as the team grows"
        ]
      },
      {
        text:
          "This wasn't about automating one channel — it was about giving Taashee one connected system instead of five disconnected habits. LinkedIn, WhatsApp, email and content now run on the same rails, and the team spends its time on conversations, not on stitching tools together."
      },
      {
        title: "Impact",
        bullets: [
          "Outreach, follow-up and content now run from a single connected system instead of five separate tools",
          "Every lead's LinkedIn, WhatsApp and email activity lives in one CRM record",
          "Blog and social content publish on a fixed cadence without a content team manually scheduling each post",
          "The team no longer manually reconciles who replied where"
        ]
      }
    ]
  }
},
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: clean compile, and `/casestudies/taashee-full-stack-outbound-automation` appears in the route list output.

- [ ] **Step 4: Visually verify**

Run: `npm run dev`. Check `/casestudies` — the new card appears with the diagram image, correct title/excerpt. Check `/casestudies/taashee-full-stack-outbound-automation` renders the full hero + body sections. Check the homepage marquee wall (bottom of "Selected work") includes the new tile.

- [ ] **Step 5: Commit**

```bash
git add public/images/casestudies/taashee.svg public/data/blogs.ts
git commit -m "Add Taashee Linux Services case study"
```

---

### Task 4: Case study — RC Trend Setters

**Files:**
- Create: `public/images/casestudies/rc-trend-setters.svg`
- Modify: `public/data/blogs.ts` (append new `Blog` entry)

**Interfaces:**
- Same as Task 3 — self-contained data entry, no shared-component changes.

- [ ] **Step 1: Create the workflow diagram asset**

Write `public/images/casestudies/rc-trend-setters.svg` — two parallel flows (cart recovery, lead-to-broadcast):

```svg
<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>RC Trend Setters — cart recovery and broadcast flow</title>
  <rect width="400" height="250" rx="16" fill="#0B0E1A"/>
  <circle cx="24" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="40" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="56" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <text x="76" y="24" font-family="ui-monospace, Menlo, monospace" font-size="10" letter-spacing="0.5" fill="#ffffff" fill-opacity="0.4">rc trend setters · shopify</text>
  <line x1="0" y1="38" x2="400" y2="38" stroke="#ffffff" stroke-opacity="0.1"/>

  <g font-family="system-ui, sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">
    <line x1="70" y1="95" x2="180" y2="95" stroke="#38BDF8" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="220" y1="95" x2="330" y2="95" stroke="#38BDF8" stroke-width="1.5" marker-end="url(#arrow)"/>
    <circle cx="55" cy="95" r="20" fill="none" stroke="#0284C7" stroke-width="1.5"/>
    <text x="55" y="99" fill-opacity="0.85">Cart</text>
    <rect x="180" y="80" width="40" height="30" rx="6" fill="#0284C7" fill-opacity="0.15" stroke="#0284C7"/>
    <text x="200" y="99" font-size="9" fill-opacity="0.85">Recover</text>
    <circle cx="345" cy="95" r="20" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="345" y="99" fill-opacity="0.85">Order</text>

    <line x1="70" y1="175" x2="180" y2="175" stroke="#0284C7" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <line x1="220" y1="175" x2="330" y2="175" stroke="#0284C7" stroke-width="1.5" marker-end="url(#arrow2)"/>
    <circle cx="55" cy="175" r="20" fill="none" stroke="#0284C7" stroke-width="1.5"/>
    <text x="55" y="179" fill-opacity="0.85">Lead</text>
    <rect x="180" y="160" width="40" height="30" rx="6" fill="#0284C7" fill-opacity="0.15" stroke="#0284C7"/>
    <text x="200" y="176" font-size="8" fill-opacity="0.85">Segment</text>
    <circle cx="345" cy="175" r="20" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="345" y="172" fill-opacity="0.85">Broad-</text>
    <text x="345" y="182" fill-opacity="0.85">cast</text>
  </g>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#38BDF8"/></marker>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0284C7"/></marker>
  </defs>
</svg>
```

- [ ] **Step 2: Append the blog entry**

Add to `public/data/blogs.ts` (after the Taashee entry):

```ts
{
  slug: "rc-trend-setters-shopify-automation",
  title: "Lead Capture & Cart Recovery Automation for RC Trend Setters",
  category: "Case Study",
  date: "2026-04-20",
  excerpt:
    "RC Trend Setters, a Shopify D2C brand, was losing carts and leads to manual follow-up. We built an automated system that captures leads, recovers abandoned carts, and runs broadcast campaigns without anyone touching a spreadsheet.",
  image: "/images/casestudies/rc-trend-setters.svg",
  hero: {
    title: "Every Cart Followed Up, Automatically",
    description:
      "RC Trend Setters, a growing Shopify store, had no consistent way to follow up on abandoned carts or capture leads from campaigns — recovery emails went out late or not at all, and broadcast promotions were built and sent manually for every launch.",
    meta: { solution: "E-COMMERCE AUTOMATION", stat: "Every cart followed up, automatically" },
    image: "/images/casestudies/rc-trend-setters.svg"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "RC Trend Setters, a growing Shopify store, had no consistent way to follow up on abandoned carts or capture leads from campaigns — recovery emails went out late or not at all, and broadcast promotions were built and sent manually for every launch."
      },
      {
        title: "Solution",
        text: [
          "Lead Capture: On-site forms and campaign sign-ups feed directly into one automated list — no manual exports from Shopify.",
          "Abandoned Cart Recovery: The moment a cart is abandoned, a timed recovery sequence starts automatically — no team member has to notice or trigger it.",
          "Broadcast Campaigns: Launches and promotions go out as scheduled, segmented broadcasts instead of one-off manual sends.",
          "Shopify-Native Triggers: Every automation is wired directly to real store events — cart, checkout, order status — not a lagging manual sync."
        ],
        image: "/images/casestudies/rc-trend-setters.svg"
      },
      {
        title: "Why It Works",
        iconList: [
          "Cart recovery starts the moment a cart is abandoned",
          "Leads captured and organized without manual exports",
          "Campaigns scheduled and segmented, not sent one by one",
          "Built directly on Shopify's own store events"
        ]
      },
      {
        text:
          "The store no longer depends on someone remembering to follow up. Every abandoned cart, every new lead, every campaign now runs on rails — RC Trend Setters ships promotions and recovers carts on autopilot, and the team spends its time on the storefront, not the follow-up."
      },
      {
        title: "Impact",
        bullets: [
          "Abandoned carts now get a recovery sequence automatically, with no manual trigger",
          "Leads from every campaign land in one system instead of scattered exports",
          "Broadcast campaigns launch on schedule without manual list-building each time"
        ]
      }
    ]
  }
},
```

- [ ] **Step 3: Verify the build**

Run: `npm run build` — expect clean compile, `/casestudies/rc-trend-setters-shopify-automation` in the route list.

- [ ] **Step 4: Visually verify**

Same checks as Task 3, Step 4, for this slug.

- [ ] **Step 5: Commit**

```bash
git add public/images/casestudies/rc-trend-setters.svg public/data/blogs.ts
git commit -m "Add RC Trend Setters case study"
```

---

### Task 5: Case study — Amazinga / SPORTKART

**Files:**
- Create: `public/images/casestudies/amazinga-sportkart.svg`
- Modify: `public/data/blogs.ts` (append new `Blog` entry)

**Interfaces:**
- Same as Task 3.

- [ ] **Step 1: Create the workflow diagram asset**

Write `public/images/casestudies/amazinga-sportkart.svg` — two inputs converging on an agent, splitting to two outputs:

```svg
<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Amazinga / SPORTKART — voice and WhatsApp AI agent</title>
  <rect width="400" height="250" rx="16" fill="#0B0E1A"/>
  <circle cx="24" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="40" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="56" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <text x="76" y="24" font-family="ui-monospace, Menlo, monospace" font-size="10" letter-spacing="0.5" fill="#ffffff" fill-opacity="0.4">amazinga · voice + whatsapp agent</text>
  <line x1="0" y1="38" x2="400" y2="38" stroke="#ffffff" stroke-opacity="0.1"/>

  <g stroke="#0284C7" stroke-width="1.5" fill="none">
    <line x1="130" y1="75" x2="190" y2="120"/>
    <line x1="270" y1="75" x2="210" y2="120"/>
    <line x1="185" y1="150" x2="130" y2="195"/>
    <line x1="215" y1="150" x2="270" y2="195"/>
  </g>
  <g font-family="system-ui, sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">
    <circle cx="130" cy="65" r="22" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="130" y="69" fill-opacity="0.85">Call</text>
    <circle cx="270" cy="65" r="22" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="270" y="69" fill-opacity="0.85">WhatsApp</text>
    <circle cx="200" cy="135" r="26" fill="#0284C7"/>
    <text x="200" y="132" fill="#ffffff" font-weight="600">AI</text>
    <text x="200" y="145" fill="#ffffff" font-weight="600">Agent</text>
    <circle cx="110" cy="210" r="22" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="110" y="214" fill-opacity="0.85">Resolved</text>
    <circle cx="290" cy="210" r="22" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="290" y="211" fill-opacity="0.85" font-size="10">Human</text>
    <text x="290" y="221" fill-opacity="0.85" font-size="10">handoff</text>
  </g>
</svg>
```

- [ ] **Step 2: Append the blog entry**

Add to `public/data/blogs.ts` (after RC Trend Setters):

```ts
{
  slug: "amazinga-sportkart-voice-whatsapp-agent",
  title: "WhatsApp & Voice AI Agent for Amazinga / SPORTKART",
  category: "Case Study",
  date: "2026-05-15",
  excerpt:
    "Amazinga (SPORTKART), a Croatian retailer, needed a way to handle customer calls and WhatsApp messages without adding headcount. We built a voice and WhatsApp AI agent on Retell AI and Twilio that answers, qualifies, and routes every conversation.",
  image: "/images/casestudies/amazinga-sportkart.svg",
  hero: {
    title: "One Agent, Every Call and Message Answered",
    description:
      "Amazinga (SPORTKART), a Croatian sports retailer, was fielding customer calls and WhatsApp enquiries with a small team stretched across sales and support — busy hours meant missed calls, delayed WhatsApp replies, and customers left waiting.",
    meta: { solution: "VOICE + WHATSAPP AI AGENT", stat: "Calls and messages, always answered" },
    image: "/images/casestudies/amazinga-sportkart.svg"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Amazinga (SPORTKART), a Croatian sports retailer, was fielding customer calls and WhatsApp enquiries with a small team stretched across sales and support — busy hours meant missed calls, delayed WhatsApp replies, and customers left waiting."
      },
      {
        title: "Solution",
        text: [
          "Voice AI Agent: Built on Retell AI and Twilio, the agent answers inbound calls, understands intent, and handles common questions or books a callback — live, not a voicemail.",
          "WhatsApp AI Agent: The same intelligence answers WhatsApp messages, qualifying enquiries and routing anything that needs a human straight to the right person.",
          "Always-On Coverage: Calls and messages get answered outside business hours and during peak volume, not just when someone's free.",
          "Human Handoff: Anything the agent can't resolve is routed to the team with full context — no customer repeats themselves."
        ],
        image: "/images/casestudies/amazinga-sportkart.svg"
      },
      {
        title: "Why It Works",
        iconList: [
          "Calls answered live, not left to voicemail",
          "WhatsApp replies without a queue",
          "Coverage extends beyond business hours",
          "Full context handed off when a human takes over"
        ]
      },
      {
        text:
          "Amazinga's customers now get an immediate, live response — by phone or WhatsApp — whether it's 11am on a Tuesday or 9pm on a Saturday. The team steps in exactly when a conversation needs a person, and not a moment before."
      },
      {
        title: "Impact",
        bullets: [
          "Calls and WhatsApp messages get an immediate response instead of waiting on staff availability",
          "The team only steps into conversations that actually need a human",
          "Customer enquiries no longer go unanswered outside business hours"
        ]
      }
    ]
  }
},
```

- [ ] **Step 3: Verify the build**

Run: `npm run build` — expect clean compile, `/casestudies/amazinga-sportkart-voice-whatsapp-agent` in the route list.

- [ ] **Step 4: Visually verify**

Same checks as Task 3, Step 4, for this slug.

- [ ] **Step 5: Commit**

```bash
git add public/images/casestudies/amazinga-sportkart.svg public/data/blogs.ts
git commit -m "Add Amazinga / SPORTKART case study"
```

---

### Task 6: Case study — True North Homes

**Files:**
- Create: `public/images/casestudies/true-north-homes.svg`
- Modify: `public/data/blogs.ts` (append new `Blog` entry)

**Interfaces:**
- Same as Task 3.

- [ ] **Step 1: Create the workflow diagram asset**

Write `public/images/casestudies/true-north-homes.svg` — one orchestrator hub above three sub-agents:

```svg
<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>True North Homes — AI CEO agent orchestrating three sub-agents</title>
  <rect width="400" height="250" rx="16" fill="#0B0E1A"/>
  <circle cx="24" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="40" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <circle cx="56" cy="20" r="4" fill="#ffffff" fill-opacity="0.15"/>
  <text x="76" y="24" font-family="ui-monospace, Menlo, monospace" font-size="10" letter-spacing="0.5" fill="#ffffff" fill-opacity="0.4">true north homes · multi-agent system</text>
  <line x1="0" y1="38" x2="400" y2="38" stroke="#ffffff" stroke-opacity="0.1"/>

  <g stroke="#0284C7" stroke-width="1.5">
    <line x1="200" y1="95" x2="90" y2="180"/>
    <line x1="200" y1="95" x2="200" y2="180"/>
    <line x1="200" y1="95" x2="310" y2="180"/>
  </g>
  <circle cx="200" cy="80" r="10" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.5"/>
  <circle cx="200" cy="80" r="16" fill="#0284C7"/>
  <text x="200" y="76" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">Orches-</text>
  <text x="200" y="87" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">trator</text>

  <g font-family="system-ui, sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">
    <circle cx="90" cy="195" r="20" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="90" y="193" fill-opacity="0.85" font-size="10">Schedul-</text>
    <text x="90" y="203" fill-opacity="0.85" font-size="10">ing</text>
    <circle cx="200" cy="195" r="20" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="200" y="193" fill-opacity="0.85" font-size="10">Lead</text>
    <text x="200" y="203" fill-opacity="0.85" font-size="10">follow-up</text>
    <circle cx="310" cy="195" r="20" fill="none" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="310" y="199" fill-opacity="0.85" font-size="10">Reporting</text>
  </g>
</svg>
```

- [ ] **Step 2: Append the blog entry**

Add to `public/data/blogs.ts` (after Amazinga/SPORTKART):

```ts
{
  slug: "true-north-homes-ai-ceo-agent",
  title: "An AI CEO Agent for True North Homes",
  category: "Case Study",
  date: "2026-06-28",
  excerpt:
    "True North Homes, a Canadian home services company, wanted one system that could actually run the business day-to-day — not just automate a single task. We built a multi-agent AI infrastructure with a central orchestrating agent at the center.",
  image: "/images/casestudies/true-north-homes.svg",
  hero: {
    title: "One Orchestrating Agent, the Whole Operation",
    description:
      "True North Homes had already automated pieces of the business individually — but each automation lived on its own, with no single view of what was happening across sales, scheduling and operations. The founder wanted one system smart enough to see the whole business, not five smart pieces that didn't talk to each other.",
    meta: { solution: "MULTI-AGENT AI INFRASTRUCTURE", stat: "One agent oversees the whole operation" },
    image: "/images/casestudies/true-north-homes.svg"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "True North Homes had already automated pieces of the business individually — but each automation lived on its own, with no single view of what was happening across sales, scheduling and operations. The founder wanted one system smart enough to see the whole business, not five smart pieces that didn't talk to each other."
      },
      {
        title: "Solution",
        text: [
          "Central Orchestrating Agent: One AI agent sits above the business's operations, delegating tasks to specialized sub-agents and tracking what's happening across the company.",
          "Specialized Sub-Agents: Separate agents handle scheduling, lead follow-up, and reporting — each an expert in its lane, coordinated by the orchestrator.",
          "Full Multi-Agent Orchestration: Sub-agents report back to the orchestrator, which decides what needs attention, what can run automatically, and what needs the founder's input.",
          "One System of Record: Every agent works from the same underlying data — no automation operating on stale or duplicate information."
        ],
        image: "/images/casestudies/true-north-homes.svg"
      },
      {
        title: "Why It Works",
        iconList: [
          "One agent oversees the whole operation, not just one task",
          "Specialized sub-agents handle their own lane expertly",
          "The founder sees what needs attention, not everything",
          "Every agent works from the same data, always current"
        ]
      },
      {
        text:
          "This is what \"one system, not a patchwork\" looks like at its most ambitious — an orchestrating agent that runs the operational core of the business, delegating to specialists and surfacing only what genuinely needs a founder's judgment. It's the clearest example yet of what full AI infrastructure means at Repeatless."
      },
      {
        title: "Impact",
        bullets: [
          "Scheduling, lead follow-up and reporting now run under one orchestrating agent instead of as separate disconnected tools",
          "The founder is only pulled in for decisions that genuinely need a person",
          "Every part of the system works from one shared, current view of the business"
        ]
      }
    ]
  }
},
```

- [ ] **Step 3: Verify the build**

Run: `npm run build` — expect clean compile, `/casestudies/true-north-homes-ai-ceo-agent` in the route list. This should bring the total generated case-study routes to 16.

- [ ] **Step 4: Visually verify**

Same checks as Task 3, Step 4, for this slug. Also re-check the homepage marquee wall and `/casestudies` grid/pagination now that 4 new entries exist (12 → 16 case studies; confirm pagination on `/casestudies` still works at `PER_PAGE = 6`).

- [ ] **Step 5: Commit**

```bash
git add public/images/casestudies/true-north-homes.svg public/data/blogs.ts
git commit -m "Add True North Homes case study"
```

---

### Task 7: `/about` page — founder story

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/about/components/FounderStory.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: the `/about` route (built by Task 8's `TeamRoster` import into the same `page.tsx` — Task 8 modifies this file to add the roster section below what this task creates).

- [ ] **Step 1: Create `FounderStory.tsx`**

Write `src/app/about/components/FounderStory.tsx` — an expanded version of the homepage `Founder.tsx` narrative (same portrait, same voice, more room to breathe since this is its dedicated page rather than a homepage teaser):

```tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const socials = [
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/chandan_cheripally_" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@chandankumarnetha" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/" },
];

export default function FounderStory() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-36 sm:pb-28 sm:pt-40">
      <div className="mx-auto grid max-w-5xl items-start gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[300px] lg:sticky lg:top-32 lg:max-w-none"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface2 shadow-[0_36px_72px_-34px_rgba(8,18,26,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder-repeatless.webp"
              alt="Chandan Kumar — founder & CEO of Repeatless"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2 text-sm font-medium text-slate transition-colors hover:border-sky/40 hover:text-sky"
              >
                <Icon className="h-4 w-4 text-sky" />
                {label}
                <FiArrowUpRight className="h-3.5 w-3.5 text-slate2 transition-colors group-hover:text-sky" />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="eyebrow text-sky">About Repeatless</p>
          <h1
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Founder-led. Team-delivered.
          </h1>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate">
            <p>
              I started Repeatless because I couldn&apos;t stand watching good businesses drown in
              work that software should quietly handle.
            </p>
            <p>
              Today my team and I build real AI infrastructure for $5M+ businesses — the latest
              tools like Claude and Antigravity, combined with the systems you already run —{" "}
              <span className="font-semibold text-ink">
                fully done-for-you, so your team never touches the plumbing.
              </span>
            </p>
            <p>
              Companies representing <span className="font-semibold text-ink">$100M+ in combined revenue</span>{" "}
              move faster because we removed the busywork entirely. And for teams who want to build
              that capability in-house instead, we run Training & Consulting — the same expertise,
              handed to your team rather than run for you.
            </p>
            <p>
              Repeatless isn&apos;t me working alone with AI tools. It&apos;s a named team, each
              person an expert in their lane, building and maintaining every system we ship.
            </p>
          </div>

          <div className="mt-8">
            <p className="font-display text-3xl italic text-ink">Chandan Kumar</p>
            <p className="mt-1 text-sm text-slate2">Founder · Sales, Content &amp; Growth · Repeatless</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the page shell with metadata**

Write `src/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";
import FounderStory from "./components/FounderStory";

export const metadata: Metadata = {
  title: "About Repeatless — Founder-Led, Team-Delivered AI Automation",
  description:
    "Meet the team behind Repeatless — founder Chandan Kumar and the specialist engineers who build, ship and maintain every AI automation system.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <FounderStory />
    </div>
  );
}
```

(Task 8 adds the `TeamRoster` import and render below `<FounderStory />` in this same file.)

- [ ] **Step 3: Verify the build**

Run: `npm run build` — expect `/about` to appear as a new static route, clean compile.

- [ ] **Step 4: Visually verify**

Run: `npm run dev`, open `http://localhost:3000/about`. Confirm the portrait, headline and copy render correctly, spacing matches the rest of the site (top padding clears the fixed navbar pill), social links work.

- [ ] **Step 5: Commit**

```bash
git add src/app/about/page.tsx src/app/about/components/FounderStory.tsx
git commit -m "Add /about page with founder story"
```

---

### Task 8: `/about` page — team roster, nav & footer wiring

**Files:**
- Create: `src/app/about/components/TeamRoster.tsx`
- Modify: `src/app/about/page.tsx` (add `TeamRoster` below `FounderStory`)
- Modify: `src/Components/Navbar.tsx:9-15` (`navLinks` array)
- Modify: `src/Components/Footer.tsx:8-14` (`quickLinks` array)
- Modify: `src/app/components/Founder.tsx` (add one link to `/about`)

**Interfaces:**
- Consumes: `src/app/about/page.tsx` from Task 7.
- Produces: nothing further tasks depend on.

- [ ] **Step 1: Create `TeamRoster.tsx`**

Write `src/app/about/components/TeamRoster.tsx` — an editorial roster list (monogram-initial badges, same "no fake photos" pattern already established in `Testimonials.tsx`), not a circular-headshot grid:

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Member = { name: string; role: string };

const team: Member[] = [
  { name: "Teja", role: "CTO" },
  { name: "Lakshmi", role: "Automation Development" },
  { name: "Srivali", role: "Automation Development" },
  { name: "Shiva", role: "Automation Development" },
  { name: "Smanth", role: "Automation Development" },
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function TeamRoster() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="eyebrow text-sky">The team</p>
        <h2
          className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          The specialists who build and run every system.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
          No offshore queue, no rotating contractors — the same named people ship your build and
          stay on after launch.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              custom={i}
              variants={reveal}
              initial={reduce ? undefined : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.6 }}
              className="flex items-center gap-4 py-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-skysoft font-monoui text-sm font-semibold text-sky">
                {initials(m.name)}
              </span>
              <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-display text-xl font-semibold text-ink">{m.name}</span>
                <span className="text-sm text-slate2">{m.role}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire `TeamRoster` into the about page**

In `src/app/about/page.tsx`, add the import and render it below `FounderStory`:

```tsx
import type { Metadata } from "next";
import FounderStory from "./components/FounderStory";
import TeamRoster from "./components/TeamRoster";

export const metadata: Metadata = {
  title: "About Repeatless — Founder-Led, Team-Delivered AI Automation",
  description:
    "Meet the team behind Repeatless — founder Chandan Kumar and the specialist engineers who build, ship and maintain every AI automation system.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <FounderStory />
      <TeamRoster />
    </div>
  );
}
```

- [ ] **Step 3: Point nav "About" to `/about`**

In `src/Components/Navbar.tsx`, change line 13 from:

```tsx
  { href: "/#founder", label: "About" },
```

to:

```tsx
  { href: "/about", label: "About" },
```

- [ ] **Step 4: Point footer "About" to `/about`**

In `src/Components/Footer.tsx`, change line 12 from:

```tsx
  { label: "About", href: "/#founder" },
```

to:

```tsx
  { label: "About", href: "/about" },
```

- [ ] **Step 5: Add a "meet the team" link to the homepage founder teaser**

In `src/app/components/Founder.tsx`, add a link after the closing `</div>` of the "Platforms" block (after line 91, before the final closing tags at lines 92-96). Insert:

```tsx
          <div className="mt-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
            >
              Meet the full team
              <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
```

(`Link`, `FiArrowUpRight` are already imported in this file — no new imports needed.)

- [ ] **Step 6: Verify the build**

Run: `npm run build` — expect clean compile, `/about` route present.

- [ ] **Step 7: Visually verify**

Run: `npm run dev`. Check: navbar "About" and footer "About" both navigate to `/about`. `/about` now shows founder story + team roster below it, roster rows reveal on scroll. Homepage Founder section shows the new "Meet the full team" link and it navigates correctly.

- [ ] **Step 8: Commit**

```bash
git add src/app/about/components/TeamRoster.tsx src/app/about/page.tsx src/Components/Navbar.tsx src/Components/Footer.tsx src/app/components/Founder.tsx
git commit -m "$(cat <<'EOF'
Add team roster to /about, point About links there

Navbar and footer "About" now go to /about instead of /#founder. The
homepage founder teaser gains a "Meet the full team" link. Roster is
name+role only (no photos yet) per user decision.
EOF
)"
```

---

### Task 9: New homepage section — "Two ways to work with us"

**Files:**
- Create: `src/app/components/TwoTracks.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks depend on. Placed between `FeaturesSection` ("Why Repeatless") and `SolutionsSection` in `page.tsx`.

**Design note:** explicitly not a generic two-pricing-card-side-by-side layout. Left panel (Done-For-You) reuses the dark system-window motif already established by `HeroSystemWindow`/the build console — a small mock status list. Right panel (Training & Consulting) uses a distinct, human metaphor — a compact session agenda, light surface, not another phone/chat mockup — visually reinforcing "we build it for you" (machine/system, dark) vs. "we teach your team" (human, light).

- [ ] **Step 1: Create `TwoTracks.tsx`**

Write `src/app/components/TwoTracks.tsx`:

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const CALENDLY = "https://calendly.com/chandannetha/30min";

const dfyStages = ["Discover", "Design", "Deploy", "Scale"];

const trainingSessions = [
  "AI infrastructure strategy session",
  "Tool selection & workflow mapping",
  "Team upskilling on automation & AI tools",
];

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

export default function TwoTracks() {
  const reduce = useReducedMotion();

  return (
    <section id="how-we-engage" className="relative bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-sky">How we engage</p>
          <h2
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Done for you, or done with your team.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Two ways to work with us — most companies want it built and run; some want the
            capability in-house. Both get the same expertise.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Done-For-You — dark system window, machine-run feel */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-[0_30px_70px_-40px_rgba(8,18,26,0.6)]"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 font-monoui text-[11px] lowercase text-white/40">
                repeatless · done-for-you
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-white">
                Done-For-You AI Infrastructure
              </h3>
              <p className="mt-3 text-white/60">
                We build, run and maintain the entire system — operations, marketing, content,
                outreach — without your team touching the plumbing.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {dfyStages.map((s, i) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 font-monoui text-[11px] text-white/50"
                  >
                    <span className="text-skybright">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-sky px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Training & Consulting — light, human, session-agenda feel */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: reduce ? 0 : 0.08 }}
            className="overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-[0_20px_50px_-32px_rgba(8,18,26,0.3)]"
          >
            <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-4">
              <span className="font-monoui text-[11px] lowercase text-slate2">
                repeatless · training &amp; consulting
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Training &amp; Consulting
              </h3>
              <p className="mt-3 text-slate">
                For teams who want to build AI capability in-house — the same expertise, handed to
                your people instead of run for you.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {trainingSessions.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-slate">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-skysoft">
                      <FiCheck className="h-3 w-3 text-sky" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-3 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-sky hover:text-sky"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into the homepage**

In `src/app/page.tsx`, add the import and insert `<TwoTracks />` between the "Why Repeatless" block and `<SolutionsSection />`:

```tsx
import HeroSection from "./components/AUtomation";
import CaseStudies from "./components/casestudies";
import CTASection from "./components/CTASection";
import Hero from "./components/Hero";
import FeaturesSection from "./components/Scroll";
import FounderSection from "./components/Founder";
import OfferBanner from "./components/OfferBanner";
import SolutionsSection from "./components/Solutions";
import TestimonialsSection from "./components/Testimonials";
import TwoTracks from "./components/TwoTracks";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      {/* "Why Repeatless" */}
      <div id="features-section">
        <FeaturesSection />
      </div>
      <TwoTracks /> {/* How we engage: DFY vs Training & Consulting */}
      <SolutionsSection />
      <HeroSection /> {/* How I Work */}
      <CaseStudies /> {/* Selected work + demo video */}
      <TestimonialsSection />
      <FounderSection /> {/* Founder's note */}
      <OfferBanner /> {/* What you get */}
      <CTASection />
    </main>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build` — expect clean compile.

- [ ] **Step 4: Visually verify**

Run: `npm run dev`. Confirm the new section appears in the right place, both panels render correctly at mobile/tablet/desktop widths, both CTAs open Calendly, the dark/light contrast between panels reads intentionally (not as two mismatched cards).

- [ ] **Step 5: Commit**

```bash
git add src/app/components/TwoTracks.tsx src/app/page.tsx
git commit -m "Add \"Two ways to work with us\" homepage section"
```

---

### Task 10: Final QA pass

**Files:** none (verification only).

**Interfaces:** none — this task confirms every prior task's output together.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: clean compile, no TypeScript errors, no missing-module errors. Confirm the route list includes `/about` and all 4 new `/casestudies/[slug]` routes (16 case studies total, up from 12).

- [ ] **Step 2: Responsive pass in the dev server**

Run: `npm run dev`. For each of: homepage (new `TwoTracks` section + updated tools marquee), `/about`, and one new case study page — check at 375px (mobile), 768px (tablet), 1440px (desktop) widths. Confirm no horizontal overflow, no overlapping text, touch targets on `TwoTracks` CTAs and `TeamRoster` rows are comfortably tappable.

- [ ] **Step 3: Cross-link check**

Click through: Navbar "About" → `/about`. Footer "About" → `/about`. Homepage Founder section "Meet the full team" → `/about`. `/casestudies` listing shows all 4 new cards with working thumbnails. Homepage marquee wall (bottom of "Selected work") includes the 4 new tiles. Each new case study's "See it in production" style outbound links (if any reused from `Solutions.tsx`) still resolve to `/casestudies`.

- [ ] **Step 4: Reduced-motion check**

In the browser devtools, emulate `prefers-reduced-motion: reduce` and re-check `/about` (roster rows should appear without the staggered reveal animation) and the homepage `TwoTracks` section (both panels appear without the slide-up motion) — matches the reduced-motion support already present everywhere else on the site.

- [ ] **Step 5: Commit any final fixes**

If Steps 1-4 surface anything (overflow, alignment, a missed reduced-motion guard), fix inline and commit:

```bash
git add -A
git commit -m "Polish fixes from full-site QA pass"
```

If nothing needs fixing, no commit is needed for this task.
