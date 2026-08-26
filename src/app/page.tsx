
import HeroSection from "./components/AUtomation";
import CaseStudies from "./components/casestudies";
import CTASection from "./components/CTASection";
import FeaturesSection from "./components/Scroll";
import FounderSection from "./components/Founder";
import OfferBanner from "./components/OfferBanner";
import SolutionsSection from "./components/Solutions";
import TestimonialsSection from "./components/Testimonials";
import TwoTracks from "./components/TwoTracks";
import HeroGate from "./components/hero/HeroGate";

export default function Home() {
  return (
    <main className="relative">
      <HeroGate />
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
