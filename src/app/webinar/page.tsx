import type { Metadata } from "next";
import Script from "next/script";

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
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '1976376849844362');
          fbq('track', 'PageView');
        `}
      </Script>

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
    </>
  );
}