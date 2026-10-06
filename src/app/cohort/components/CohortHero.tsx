import CohortCTAButton from "./CohortCTAButton";
import YouTubeFacade from "@/Components/YouTubeFacade";
import PaymentBadges from "@/Components/PaymentBadges";

export default function CohortHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className="reveal-onload eyebrow text-[#CAFB00]"
          style={{ "--reveal-y": "16px" } as React.CSSProperties}
        >
          First Telugu AI Architect Cohort
        </p>

        <h1
          className="mt-5 !text-4xl font-display font-semibold leading-[1.05] tracking-tight sm:!text-5xl lg:!text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Your automations are worth ₹1L a month. You&apos;re just selling them as ₹15k gigs
        </h1>

        <p
          className="reveal-onload mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
        >
          Reposition as an AI architect and land your first ₹1L in 60 days, or
          get a 100% refund.
        </p>

        <p
          className="reveal-onload mx-auto mt-4 max-w-xl text-sm italic text-white/50"
          style={
            {
              "--reveal-y": "16px",
              "--reveal-delay": "0.22s",
            } as React.CSSProperties
          }
        >
          If you don&apos;t make your first ₹1L following our exact strategy, we
          refund every rupee. No questions, just proof of work.
        </p>

        {/* VSL */}
        <div
          className="reveal-onload mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          style={
            {
              "--reveal-y": "24px",
              "--reveal-delay": "0.3s",
            } as React.CSSProperties
          }
        >
          <div className="aspect-video w-full">
            <YouTubeFacade
              videoId="PpMZywTCtEs"
              title="AI Architect Cohort"
            />
          </div>
        </div>

        {/* Payment + CTA */}
        <div
          className="reveal-onload mt-3 flex flex-col items-center gap-1.5"
          style={{ "--reveal-delay": "0.38s" } as React.CSSProperties}
        >
          <PaymentBadges />

          <CohortCTAButton label="Join now for ₹4999" />

          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/60">
            <span>Instant access</span>
            <span className="text-white/30">·</span>
            <span>Lifetime updates</span>
            <span className="text-white/30">·</span>
            <span>100% refund guarantee</span>
          </p>
        </div>
      </div>
    </section>
  );
}