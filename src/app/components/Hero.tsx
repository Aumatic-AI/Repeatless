"use client";

import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import NodeGridBackground from "./NodeGridBackground";
import HeroSystemWindow from "./HeroSystemWindow";

const supportingStats = [
  { value: "100+", label: "Automations built" },
  { value: "30+", label: "Businesses automated" },
];

const Hero = () => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
      <section id="home" className="relative w-full overflow-hidden bg-paper">
        {/* Ambient accents — quiet, behind everything */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-sky/10 blur-[120px]" />
          <div
            className="absolute inset-0"
            style={{
              maskImage: "radial-gradient(120% 90% at 70% 10%, #000 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(120% 90% at 70% 10%, #000 30%, transparent 75%)",
            }}
          >
            <NodeGridBackground />
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 md:pt-36 lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT — the pitch */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.p variants={rise} className="eyebrow text-sky">
              AI Automation Agency · Serving B2B Worldwide
            </motion.p>

            <motion.h1
              variants={rise}
              className="mt-5 font-display text-[clamp(1.9rem,8vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              We build AI that{" "}
              <span className="relative inline-block whitespace-nowrap">
                runs your business.
                <motion.svg
                  className="absolute -bottom-[0.32em] left-0 h-[0.32em] w-full overflow-visible"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M3 8 C 80 2, 220 2, 297 7"
                    fill="none"
                    stroke="var(--color-sky)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.9, ease: [0.6, 0, 0.3, 1] }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p variants={rise} className="mt-7 max-w-lg text-base leading-relaxed text-slate sm:text-lg">
              <span className="font-semibold text-ink">One unified AI infrastructure</span> — not a
              patchwork of bots. Built on Claude and the latest agentic tools, wired into the systems
              you already run — for{" "}
              <span className="font-semibold text-ink">B2B companies past $5M in revenue</span>. We
              build it, run it, and maintain it.
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="https://calendly.com/chandannetha/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-medium text-white shadow-[0_16px_34px_-16px_rgba(8,18,26,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/casestudies"
                className="group inline-flex items-center gap-1.5 font-medium text-slate transition-colors hover:text-ink"
              >
                See recent work
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Proof stats — one hero number, two supporting */}
            <motion.div variants={rise} className="mt-12 flex flex-wrap items-stretch gap-4 border-t border-ink/10 pt-7">
              <div className="rounded-2xl bg-skysoft px-5 py-4">
                <div className="font-display text-4xl font-semibold tracking-tight text-skydeep tabular-nums sm:text-5xl">
                  $100M+
                </div>
                <div className="mt-1 text-xs font-medium text-skydeep/80">Combined client revenue</div>
              </div>
              <div className="flex gap-x-8 gap-y-4">
                {supportingStats.map((s) => (
                  <div key={s.label} className="border-l-2 border-sky pl-3.5">
                    <div className="font-display text-xl font-semibold tracking-tight text-ink tabular-nums">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-xs text-slate2">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — the system, running */}
          <HeroSystemWindow />
        </div>
      </section>
  );
};

export default Hero;
