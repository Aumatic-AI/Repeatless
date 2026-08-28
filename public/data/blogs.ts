export type BlogMeta = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO or formatted string
  excerpt: string;
  image: string;
};

export type BlogHeroData = {
  title: string;
  description: string;
  meta: { solution: string; stat: string };
  image: string;
  video?: string; // optional: YouTube URL or direct video URL
};

export type BlogBodyData = {
  sections: Array<{
    title?: string;
    text?: string | string[];
    stats?: Array<{ value: string; label: string; highlight?: boolean }>;
    iconList?: string[];
    image?: string;
    video?: string; // optional: YouTube URL or direct video URL
    bullets?: string[];
  }>;
};

export type Blog = BlogMeta & {
  hero: BlogHeroData;
  body: BlogBodyData;
};

export const blogs: Blog[] = [
{
  slug: "ai-video-ad-automation",
  title: "AI-Powered Video Ad Creative Automation",
  category: "Case Study",
  date: "2025-11-05",
  excerpt:
    "We automated a New York ad-creative agency — turning product photos into high-end video ads in hours instead of weeks. No photoshoots. No studios. Just AI-powered creative production at scale.",
  image: "/images/case-studies/cs1.webp",
  hero: {
    title: "AI-Powered Video Ad Creative System",
    description:
      "A New York creative agency needed to scale ad production without photography teams, studios, or long edit cycles. We built an AI system that turns a single product image into photorealistic scenes and fully-edited video ads — in hours, not weeks.",
    meta: { solution: "CREATIVE AUTOMATION", stat: "5 Ad Variants • 1-Day Production" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The agency produced high-end product videos for e-commerce brands, often spending days scheduling photo shoots, hiring models, setting up lighting, and editing multiple versions. As their client base grew, deadlines got tighter and budgets got squeezed — but quality couldn’t drop. They needed a faster, scalable way to create premium ad creatives without relying on expensive production workflows."
      },
      {
        title: "Solution",
        text: [
          "Seamless Upload: Client uploads a raw product image.",
          "AI Photoreal Transformation: We convert it into stunning, cinematic, photoreal images — nano-detail, seed-rim lighting, ultra-realistic look.",
          "Creative Control: Agency selects motion style, scene feel, and visual promise (motion graphics, textures, angles, pacing).",
          "Multi-Model Generation: System generates 5 unique video ads using different scenes, models, and creative angles.",
          "Smart Storage: All assets stored in a secure cloud library organized by client & campaign.",
          "Clip Selection + Final Render: Agency picks best moments, stitches them in app, and exports a ready-to-run paid-ad video."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png"
      },
      {
        title: "Why It Works",
        iconList: [
          "Photoreal AI — no physical shoot needed",
          "Full creative direction controls",
          "5-variant ad generation per product",
          "Cloud media hub for fast retrieval",
          "Hours to final ads — not weeks",
          "Scales with demand without extra staff"
        ]
      },
      {
        text:
          "This automation turned a traditional creative pipeline into an AI-driven production engine. The agency can now produce dozens of ad variations in a single day. No camera crews. No studios. Just creativity, direction, and automation doing the heavy lifting — while their clients get premium ad videos faster than ever.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png"
      },
      {
        title: "Impact",
        bullets: [
          "Ad production time reduced from 7–10 days to 1–2 days",
          "Significant reduction in per-creative cost — no studios, gear, or models needed",
          "5 ad variants generated per product for A/B testing",
          "Agency able to take on more clients without increasing production headcount",
          "Faster turnaround became a key selling point in new client pitches"
        ]
      }
    ]
  }
}
,
{
  slug: "seo-blog-automation",
  title: "Full-Stack SEO Blog Automation System",
  category: "Case Study",
  date: "2025-11-06",
  excerpt:
    "We built an AI-powered SEO content engine for a Canadian client — auto-researching keywords, writing SEO-optimized blogs, generating branded images, and publishing directly to WordPress.",
  image: "/images/case-studies/cs2.webp",
  hero: {
    title: "AI-Driven SEO Content Automation",
    description:
      "A Canada-based business needed a way to rank faster, publish more content, and dominate high-intent search keywords — without hiring writers or SEO experts. We automated their entire SEO content pipeline end-to-end.",
    meta: { solution: "SEO CONTENT AUTOMATION", stat: "1-Click Publishing • Fully Optimized" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The client operated in a competitive niche in Canada and struggled to publish consistent, high-quality SEO content. Hiring writers was expensive, keyword research was slow, and posts often lacked SEO structure or optimization. They needed a scalable way to publish search-optimized blogs with correct keywords, images, and metadata — without manual work or paying for large content teams."
      },
      {
        title: "Solution",
        text: [
          "Keyword Research Automation: Perplexity pulls primary & secondary keywords based on search trends.",
          "Competitor Keyword Extraction: SEMrush fetches competition keyword insights and difficulty scores.",
          "SEO-Structured Blog Generation: AI writes long-form blogs with H1/H2/H3, internal links, FAQs, schema-ready structure.",
          "Photoreal Images via AI: We generate featured images using AI with narrow-banana realism and brand consistency.",
          "SEO Image Meta-Tags: Each image gets alt text, title tag, caption, and keyword-optimized metadata.",
          "Auto-Publishing to WordPress: Blog + image + SEO tags + slug + meta description are posted directly via API.",
          "Continuous Schedule: System runs daily/weekly publishing schedule to stay ahead in rankings."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png"
      },
      {
        title: "Why It Works",
        iconList: [
          "Human-grade SEO blogs with proper keyword placement",
          "Perplexity + SEMrush keyword intelligence",
          "Relevant AI images with correct alt/meta tags",
          "Plug-and-publish to WordPress",
          "Consistent content cadence for ranking",
          "Massive cost savings vs hiring writers"
        ]
      },
      {
        text:
          "Once we set up the pipeline, the client only inputs their topic or product name. The system researches the niche, finds keywords worth ranking for, writes a polished SEO blog, generates a branded image, inserts keywords + meta data, and publishes directly to their WordPress site — all automatically.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png"
      },
      {
        title: "Impact",
        bullets: [
          "Content output increased from ~4 blogs/month to 15–20 blogs/month",
          "Improved keyword coverage and organic visibility over 3–4 months",
          "Consistent organic traffic growth without paid ads",
          "No longer dependent on freelance writers or external SEO agencies",
          "Meaningful time and cost savings on content production each month"
        ]
      }
    ]
  }
}
,
   {
  slug: "instagram-dm-comments-automation",
  title: "Instagram DM & Comments Automation (AI Agent + n8n)",
  category: "Case Study",
  date: "2025-10-04",
  excerpt:
    "AI agent + n8n turned Instagram comments & DMs into 24/7 sales chats—62% more replies and 41% more qualified leads.",
  image: "/images/case-studies/cs3.webp",
  hero: {
    title: "Instagram DM & Comments Automation",
    description:
      "Brands needed faster, on-brand Instagram conversations. We delivered an AI agent that replies in comments, moves to DM, and converts interest into sales—compliantly and at scale.",
    meta: { solution: "SOCIAL COMMERCE SOLUTION", stat: "62% MORE REPLIES FROM COMMENTS" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "High comment and DM volume led to slow replies, inconsistent tone, and missed sales windows—especially nights and weekends. FAQs (pricing, sizes, delivery, order status) drained team time and reduced conversion.",
      },
      {
        title: "Solution",
        text: [
          "AI detects buyer intent in comments and Story replies, then opens or continues DMs with brand-tuned responses.",
          "Handles FAQs, shares links/coupons, captures leads with consent, and escalates edge cases to a human.",
          "Built with n8n + Meta Graph API, including rate-limit guards, sentiment/intent routing, and safety fallbacks.",
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
      },
      {
        title: "Why it Works",
        iconList: [
          "Brand-tuned generation",
          "Intent & sentiment routing",
          "One-tap human handoff",
          "Auto follow-up & reminders",
          "CRM/Sheet logging & UTM tracking",
        ],
      },
      {
        text:
          "Operators see live threads, confidence scores, and templates. Marketing can pause/approve flows per campaign and track conversions from comment → DM → checkout.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
      },
      {
        title: "Impact",
        bullets: [
          "Noticeably more replies initiated from comments — faster and more consistent",
          "More qualified leads captured through automated DM conversations",
          "Faster resolution time for common questions and inquiries",
          "24/7 coverage with consistent brand voice",
          "Lower support load; team focuses on high-value cases",
        ],
      },
    ],
  },
}
,
{
  slug: "qr-event-attendance-automation",
  title: "QR-Based Event Attendance Automation",
  category: "Case Study",
  date: "2025-10-13",
  excerpt:
    "Zero third‑party fees: our QR system verifies attendees against your database, blocks duplicate scans, and updates attendance in real time.",
  image: "/images/case-studies/cs4.webp",
  hero: {
    title: "QR-Based Event Attendance Automation",
    description:
      "We built a lean, secure event check‑in system: unique QR codes per attendee, instant database verification, and one‑scan‑only gatekeeping to stop pass‑arounds—without paying per‑attendee platform fees.",
    meta: { solution: "EVENT OPS AUTOMATION", stat: "1‑Scan‑Only • Real‑Time Update" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Manual check‑ins were slow and error‑prone. Shared PDFs and generic QR apps couldn’t enforce one‑scan‑only rules, so passes were forwarded and counters were wrong. The team needed a fast, tamper‑resistant system with live database sync and no recurring vendor fees."
      },
      {
        title: "Solution",
        text: [
          "Unique QR Issuance: Generate a per‑attendee, signed QR (eventId + attendeeId + nonce) embedded in a secure URL.",
          "Instant Verification: On scan, the gate page calls our API to validate registration against the event database and check status (NEW / CHECKED_IN / INVALID).",
          "One‑Scan‑Only Rule: First valid scan flips status to CHECKED_IN and records device/time/location; any subsequent scan is auto‑rejected.",
          "Double‑Verification: If two devices attempt the same QR near‑simultaneously, a short hold compares timestamps and rejects the later request to prevent piggybacking.",
          "Offline Tolerance: Edge cache for last sync + fallback code entry; queued confirmations sync back when online.",
          "Ops Console: Live counters, lane throughput, and exception list (e.g., name mismatch, duplicate attempt) with quick override for authorized staff."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Signed, unique QR per attendee",
          "Real‑time database validation",
          "One‑scan‑only enforcement",
          "Duplicate & race‑condition guards",
          "Zero per‑attendee SaaS fees",
          "Simple ops console + logs"
        ]
      },
      {
        text:
          "Staff simply scan with a mobile browser: the gate page renders attendee name, ticket type, and status instantly. Approved scans flash GREEN with a beep; blocked duplicates show RED with reason and timestamp. Coordinators monitor hall capacity in real time and export attendance afterward.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png"
      },
      {
        title: "Impact",
        bullets: [
          "<2‑second average check‑in per attendee",
          "Duplicate/forwarded passes reduced to near‑zero",
          "Accurate live headcount and lane throughput",
          "No third‑party per‑scan costs; fully owned stack",
          "Clear audit trail for compliance and sponsors"
        ]
      }
    ]
  }
}
];

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}
