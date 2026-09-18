import CohortCTAButton from "./CohortCTAButton";
import PaymentBadges from "@/Components/PaymentBadges";
import Reveal from "@/Components/Reveal";

export default function FinalCTASection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <Reveal as="div" amount={0.4} className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <PaymentBadges />
        <CohortCTAButton label="Your First ₹1L Is 48 Days Away" />
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/60">
          <span>Only 10 seats per cohort</span>
          <span className="text-white/30">|</span>
          <span>Next batch starts September 27, 2026</span>
          <span className="text-white/30">|</span>
          <span>Backed by 100% money-back guarantee</span>
        </p>
      </Reveal>
    </section>
  );
}
