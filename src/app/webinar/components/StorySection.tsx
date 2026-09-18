import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

export default function StorySection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          I Was Exactly Where You Are Right Now
        </Reveal>

        {/* The whole story in one before/after beat, not a bullet list. */}
        <Reveal
          as="div"
          variant="group"
          amount={0.3}
          y={16}
          duration={0.5}
          className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <div
            className="reveal-item flex-1 rounded-2xl border border-white/10 bg-white/5 p-7"
            style={{ transitionDelay: "0ms" }}
          >
            <p className="font-monoui text-[11px] uppercase tracking-wide text-white/40">Before</p>
            <p className="mt-2 font-display text-2xl font-semibold text-white/70">
              ₹70K/month job
            </p>
            <p className="mt-1 text-sm text-white/50">Same place you&apos;re standing right now</p>
          </div>

          <div
            className="reveal-item flex items-center justify-center text-lime"
            style={{ transitionDelay: "120ms" }}
            aria-hidden="true"
          >
            <FiArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" />
          </div>

          <div
            className="reveal-item flex-1 rounded-2xl border border-lime/40 bg-lime/10 p-7"
            style={{ transitionDelay: "240ms" }}
          >
            <p className="font-monoui text-[11px] uppercase tracking-wide text-lime">Now</p>
            <p className="mt-2 font-display text-2xl font-semibold text-white">
              Own AI automation agency in Hyderabad
            </p>
            <p className="mt-1 text-sm text-white/60">
              One skill I learned. One job I quit. A team of 5.
            </p>
          </div>
        </Reveal>

        <Reveal as="p" amount={0.4} className="mt-10 max-w-2xl font-display text-xl italic text-white/80">
          On this free live training, I&apos;ll show you exactly how{" "}
          <span className="font-semibold not-italic text-lime">
            no fluff, no theory, just the real system
          </span>
          .
        </Reveal>
      </div>
    </section>
  );
}
