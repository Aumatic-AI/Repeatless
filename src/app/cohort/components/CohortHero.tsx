import CohortCTAButton from "./CohortCTAButton";
import PaymentBadges from "@/Components/PaymentBadges";
import YouTubeFacade from "@/Components/YouTubeFacade";

export default function CohortHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className="reveal-onload eyebrow text-skybright"
          style={{ "--reveal-y": "16px" } as React.CSSProperties}
        >
          First Telugu AI Automation Cohort | Limited Seats
        </p>

        <h1
          className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Start Your AI Automation Service &amp; Make Your First ₹1L in 48 Days
        </h1>

        <p
          className="reveal-onload mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
        >
          Learn to find unsaturated business niches, build custom AI workflows,
          and land paying clients even if you&apos;re a complete beginner with
          zero technical background.
        </p>

        <p
          className="reveal-onload mx-auto mt-4 max-w-xl text-sm italic text-white/50"
          style={{ "--reveal-y": "16px", "--reveal-delay": "0.22s" } as React.CSSProperties}
        >
          If you don&apos;t make your first ₹1L following our exact strategy,
          we refund every rupee. No questions, just proof of work.
        </p>

        {/* VSL */}
        <div
          className="reveal-onload mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          style={{ "--reveal-y": "24px", "--reveal-delay": "0.3s" } as React.CSSProperties}
        >
          <div className="aspect-video w-full">
            <YouTubeFacade
              videoId="ItkN1w0R6PU"
              title="AI Automation Cohort"
              thumbnailSrc="/images/marketing/vsl-thumbnail.webp"
            />
          </div>
        </div>

        {/* Payment + CTA */}
        <div
          className="reveal-onload mt-3 flex flex-col items-center gap-1.5"
          style={{ "--reveal-delay": "0.38s" } as React.CSSProperties}
        >
          <PaymentBadges />

          <CohortCTAButton label="Your First ₹1L Is 48 Days Away" />

          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/60">
            <span>Only 10 seats per cohort</span>
            <span className="text-white/30">|</span>
            <span>Next batch starts September 27, 2026</span>
            <span className="text-white/30">|</span>
            <span>Backed by 100% money-back guarantee</span>
          </p>
        </div>
      </div>
    </section>
  );
}
