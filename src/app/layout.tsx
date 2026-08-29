import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/Components/SiteChrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Editorial display face for the light re-identity — used with restraint on headlines only.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Repeatless: India's Leading AI Automation Agency for B2B Companies",
  description:
    "Repeatless is India's leading AI automation agency, building done-for-you AI infrastructure for $5M+ B2B companies worldwide: WhatsApp & CRM automation, content pipelines, voice AI agents and full multi-agent systems, powered by Claude, Antigravity and n8n. Book a strategy call.",
  openGraph: {
    title: "Repeatless: India's Leading AI Automation Agency for B2B Companies",
    description:
      "Done-for-you AI infrastructure for $5M+ B2B companies: WhatsApp & CRM automation, content pipelines, voice AI agents and multi-agent systems. Built on Claude, Antigravity and n8n.",
    url: "https://www.repeatless.in",
    siteName: "Repeatless",
    images: [
      {
        url: "https://www.repeatless.in/images/thumbnail.png",
        width: 1140,
        height: 548,
        alt: "Repeatless, AI automation agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeatless: India's Leading AI Automation Agency",
    description:
      "Done-for-you AI infrastructure for $5M+ B2B companies, worldwide. Claude, Antigravity & n8n. Book a free strategy call.",
    images: ["https://www.repeatless.in/images/thumbnail.png"],
    creator: "@repeatless",
  },
  metadataBase: new URL("https://www.repeatless.in"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* overflow-x-clip, not -hidden: `hidden` makes these a scroll container,
       which silently breaks `position: sticky` anywhere in the tree. `clip`
       suppresses horizontal scrollbars without that side effect. */
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} overflow-x-clip`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WHBPXY1YRW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-WHBPXY1YRW');`,
          }}
        />
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
                "https://www.youtube.com/@chandankumarnetha"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased overflow-x-clip">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
