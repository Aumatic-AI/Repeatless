"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function FrameworkSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
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
          with a 100% money-back guarantee if you don&apos;t hit ₹1L
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-white/70"
        >
          <p>
            We fix your niche first before you build anything. Because if you&apos;re solving a
            problem nobody&apos;s paying for, no automation will save you.
          </p>
          <p>
            Then, we teach you how to build one simple workflow not 10 tools, not complex AI
            agents, just one automation that actually solves a business&apos;s pain point.
          </p>
          <p>
            Finally, we show you how to land your first paying client using content, outreach, and
            free demos that convert, not cold pitches into the void.
          </p>
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-center"
        >
          <p className="font-display text-2xl font-semibold text-lime sm:text-3xl">
            Niche. Build. Sell.
          </p>
          <p className="text-white/60">That&apos;s the framework.</p>
          <p className="text-white/60">Not theory. Not tutorials. Not guesswork.</p>
        </motion.div>
      </div>
    </section>
  );
}
