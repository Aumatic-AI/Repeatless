"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const steps = [
  {
    num: "01",
    label: "Niche",
    text: "We fix your niche first before you build anything. Because if you're solving a problem nobody's paying for, no automation will save you.",
  },
  {
    num: "02",
    label: "Build",
    text: "Then, we teach you how to build one simple workflow not 10 tools, not complex AI agents, just one automation that actually solves a business's pain point.",
  },
  {
    num: "03",
    label: "Sell",
    text: "Finally, we show you how to land your first paying client using content, outreach, and free demos that convert, not cold pitches into the void.",
  },
];

const frameworkWords = ["Niche.", "Build.", "Sell."];

export default function FrameworkSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Cards rise one after another instead of all at once.
  const stepContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const stepCard: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Each word of the closing tagline pops in on its own beat.
  const wordContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: reduce ? 0 : 0.1 } },
  };

  const wordPop: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.7 },
    show: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] } },
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
          The Cohort That Takes You From Zero to Your First ₹1L
        </motion.h2>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-white/70"
        >
          A 48-day, beginner-first cohort teaching you to build and sell AI automation services
          with a{" "}
          <span className="font-semibold text-lime">100% money-back guarantee</span>{" "}
          if you don&apos;t hit ₹1L
        </motion.p>

        <motion.div
          variants={stepContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={stepCard}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:border-lime/40"
            >
              <div className="flex items-center gap-3">
                <span className="font-monoui text-sm text-lime">{step.num}</span>
                <h3 className="font-display text-xl font-semibold text-white">{step.label}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-2 text-center"
        >
          <div className="h-px w-16 bg-white/15" />

          <motion.p
            variants={wordContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-6 flex gap-3 font-display text-2xl font-semibold text-lime sm:text-3xl"
          >
            {frameworkWords.map((w) => (
              <motion.span key={w} variants={wordPop}>
                {w}
              </motion.span>
            ))}
          </motion.p>
          <p className="text-white/60">That&apos;s the framework.</p>
          <p className="text-white/60">Not theory. Not tutorials. Not guesswork.</p>
        </motion.div>
      </div>
    </section>
  );
}
