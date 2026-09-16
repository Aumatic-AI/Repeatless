"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import CohortCTAButton from "./CohortCTAButton";

export default function CohortHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="eyebrow text-skybright"
        >
          First Telugu AI Automation Cohort | Limited Seats
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Start Your AI Automation Service &amp; Make Your First ₹1L in 48 Days
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          Learn to find unsaturated business niches, build custom AI workflows, and land paying
          clients even if you&apos;re a complete beginner with zero technical background.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-4 max-w-xl text-sm italic text-white/50"
        >
          If you don&apos;t make your first ₹1L following our exact strategy, we refund every
          rupee. No questions, just proof of work.
        </motion.p>

        {/* VSL placeholder — no video exists yet */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-10 flex aspect-video w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink">
            <FiPlay className="h-5 w-5 translate-x-0.5" />
          </span>
          <p className="text-sm italic text-white/50">Will update soon</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.4, 0, 0.2, 1] }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <CohortCTAButton label="Your First ₹1L Is 48 Days Away" />
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/60">
            <span>Only 10 seats per cohort</span>
            <span className="text-white/30">|</span>
            <span>Next batch starts September 27, 2026</span>
            <span className="text-white/30">|</span>
            <span>Backed by 100% money-back guarantee</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
