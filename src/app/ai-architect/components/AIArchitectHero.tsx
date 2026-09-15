"use client";

import { motion, useReducedMotion } from "framer-motion";
import AIArchitectCTAButton from "./AIArchitectCTAButton";

export default function AIArchitectHero() {
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
          For Automation Freelancers & Agency Owners
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Become an AI Architect, Not Another Automation Freelancer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          A clear path from selling ₹10-20k automation gigs to closing ₹1-2 lakh+ retainers, with
          skills you already have, for automation freelancers and agency owners who know their
          work is worth more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <AIArchitectCTAButton label="Join AI Architect" />
          <p className="text-sm text-white/60">
            30-day program &middot; Cohort kicks off on the 20th
          </p>
        </motion.div>
      </div>
    </section>
  );
}
