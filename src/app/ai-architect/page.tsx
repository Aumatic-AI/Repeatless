import type { Metadata } from "next";
import AIArchitectHero from "./components/AIArchitectHero";
import WhatYoullBuildSection from "./components/WhatYoullBuildSection";
import ModulesSection from "./components/ModulesSection";
import AfterSection from "./components/AfterSection";
import WhoForSection from "./components/WhoForSection";
import FinalCTASection from "./components/FinalCTASection";

export const metadata: Metadata = {
  title: "AI Architect: From ₹10-20k Gigs to ₹1-2L+ Retainers",
  description:
    "A 30-day program for automation freelancers and agency owners: go from selling commoditized voice bots and chatbots to a priced AI infrastructure offer, repositioned brand, working multi-agent system, live outbound pipeline, and a sales process that closes ₹1-2 lakh+ retainers.",
  alternates: { canonical: "/ai-architect" },
};

export default function AIArchitectPage() {
  return (
    <main className="bg-paper">
      <AIArchitectHero />
      <WhatYoullBuildSection />
      <ModulesSection />
      <AfterSection />
      <WhoForSection />
      <FinalCTASection />
    </main>
  );
}
