import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CohortHero from "./components/CohortHero";
import ProblemSection from "./components/ProblemSection";
import StorySection from "./components/StorySection";
import SkillSection from "./components/SkillSection";
import FrameworkSection from "./components/FrameworkSection";
import WhatsInsideSection from "./components/WhatsInsideSection";
import ComparisonSection from "./components/ComparisonSection";
import WhoForSection from "./components/WhoForSection";
import BonusesSection from "./components/BonusesSection";
import GuaranteeSection from "./components/GuaranteeSection";
import ValueStackSection from "./components/ValueStackSection";
import FinalCTASection from "./components/FinalCTASection";

// The only framer-motion consumer left on this page — code-split so its JS
// isn't part of the initial route bundle. Still SSR'd (ssr defaults to true)
// so content/SEO is unaffected; only hydration is deferred.
const FAQSection = dynamic(() => import("./components/FAQSection"));

export const metadata: Metadata = {
  title: "AI Automation Cohort: Make Your First ₹1L in 48 Days",
  description:
    "The first Telugu AI Automation cohort: a 48-day, beginner-first program to find unsaturated niches, build AI workflows, and land paying clients, backed by a 100% money-back guarantee.",
  alternates: { canonical: "/cohort" },
};

export default function CohortPage() {
  return (
    <main className="bg-paper">
      {/* The hero VSL thumbnail is the LCP element and lives on i.ytimg.com —
          opening the connection early (DNS+TLS) shaves the round trip off
          the image's load delay instead of waiting for it to be discovered. */}
      <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />

      <CohortHero />
      <ProblemSection />
      <StorySection />
      <SkillSection />
      <FrameworkSection />
      <WhatsInsideSection />
      <ComparisonSection />
      <WhoForSection />
      <BonusesSection />
      <GuaranteeSection />
      <ValueStackSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
