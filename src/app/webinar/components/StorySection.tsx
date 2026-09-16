"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function StorySection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  const cards: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          I Was Exactly Where You Are Right Now
        </motion.h2>

        {/* The whole story in one before/after beat, not a bullet list. */}
        <motion.div
          variants={cards}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <motion.div variants={card} className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-7">
            <p className="font-monoui text-[11px] uppercase tracking-wide text-white/40">Before</p>
            <p className="mt-2 font-display text-2xl font-semibold text-white/70">
              ₹70K/month job
            </p>
            <p className="mt-1 text-sm text-white/50">Same place you&apos;re standing right now</p>
          </motion.div>

          <motion.div
            variants={card}
            className="flex items-center justify-center text-lime"
            aria-hidden="true"
          >
            <FiArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" />
          </motion.div>

          <motion.div variants={card} className="flex-1 rounded-2xl border border-lime/40 bg-lime/10 p-7">
            <p className="font-monoui text-[11px] uppercase tracking-wide text-lime">Now</p>
            <p className="mt-2 font-display text-2xl font-semibold text-white">
              Own AI automation agency in Hyderabad
            </p>
            <p className="mt-1 text-sm text-white/60">
              One skill I learned. One job I quit. A team of 5.
            </p>
          </motion.div>
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 max-w-2xl font-display text-xl italic text-white/80"
        >
          On this free live training, I&apos;ll show you exactly how{" "}
          <span className="font-semibold not-italic text-lime">
            no fluff, no theory, just the real system
          </span>
          .
        </motion.p>
      </div>
    </section>
  );
}
