import type { Metadata } from "next";
import WebinarHero from "./components/WebinarHero";
import ProblemSection from "./components/ProblemSection";
import StorySection from "./components/StorySection";
import SkillSection from "./components/SkillSection";
import DiscoverSection from "./components/DiscoverSection";
import AttendSection from "./components/AttendSection";
import PricingReasonSection from "./components/PricingReasonSection";
import FAQSection from "./components/FAQSection";
import FinalCTASection from "./components/FinalCTASection";

export const metadata: Metadata = {
  title: "Free Live Training: How I Built a ₹1L/Month AI Automation Agency",
  description:
    "Free live training for the Telugu community: the exact system to find unsaturated niches, build your first automation, and land paying clients with zero coding.",
  alternates: { canonical: "/webinar" },
};

export default function WebinarPage() {
  return (
    <main className="bg-paper">
      <WebinarHero />
      <ProblemSection />
      <StorySection />
      <SkillSection />
      <DiscoverSection />
      <AttendSection />
      <PricingReasonSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}
