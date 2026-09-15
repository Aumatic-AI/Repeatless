import type { Metadata } from "next";
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
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

export const metadata: Metadata = {
  title: "AI Automation Cohort: Make Your First ₹1L in 48 Days",
  description:
    "The first Telugu AI Automation cohort: a 48-day, beginner-first program to find unsaturated niches, build AI workflows, and land paying clients, backed by a 100% money-back guarantee.",
  alternates: { canonical: "/cohort" },
};

export default function CohortPage() {
  return (
    <main className="bg-paper">
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
