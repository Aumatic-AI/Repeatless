"use client";
import { FiArrowUpRight } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-paper">
      {/* Ambient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-sky/10 blur-[110px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-16 sm:py-20 lg:flex-row">
        <div className="flex max-w-xl flex-col gap-3 text-center lg:text-left">
          <h2
            className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Ready to repeat less &amp; grow more?
          </h2>
          <p className="text-base leading-relaxed text-slate sm:text-lg">
            We&apos;ll map exactly what to automate first — no pitch, no commitment.
          </p>
        </div>

        <a
          href="https://calendly.com/chandannetha/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-medium text-white shadow-[0_16px_34px_-16px_rgba(8,18,26,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep"
        >
          Book a strategy call
          <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
