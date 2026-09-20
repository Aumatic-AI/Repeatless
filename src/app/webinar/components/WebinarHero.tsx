import { FiUsers } from "react-icons/fi";
import ReserveSeatButton from "./ReserveSeatButton";
import PaymentBadges from "@/Components/PaymentBadges";
import YouTubeFacade from "@/Components/YouTubeFacade";

export default function WebinarHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          className="reveal-onload eyebrow text-skybright"
          style={{ "--reveal-y": "16px" } as React.CSSProperties}
        >
          Free Live Training for the Telugu Community
        </p>

        <h1
          className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          How I Built a ₹1L/Month AI Automation Agency (Without Coding)
        </h1>

        <p
          className="reveal-onload mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
        >
          In this live session, I&apos;ll show you the exact system to find
          unsaturated niches, build your first automation, and land paying
          clients even if you&apos;re a complete beginner.
        </p>

        <p
          className="reveal-onload mx-auto mt-4 max-w-xl text-sm italic text-white/50"
          style={{ "--reveal-y": "16px", "--reveal-delay": "0.22s" } as React.CSSProperties}
        >
          (Just ₹99 Less than your Swiggy order, for a system that could change
          your income)
        </p>

        {/* VSL */}
        <div
          className="reveal-onload mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          style={{ "--reveal-y": "24px", "--reveal-delay": "0.3s" } as React.CSSProperties}
        >
          <div className="aspect-video w-full">
            <YouTubeFacade
              videoId="ItkN1w0R6PU"
              title="AI Automation Agency Webinar"
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

          <ReserveSeatButton />

          <p className="flex items-center gap-1.5 text-sm text-white/60">
            <FiUsers className="h-4 w-4 text-skybright" />
            Only 10 live seats available
          </p>
        </div>
      </div>
    </section>
  );
}
