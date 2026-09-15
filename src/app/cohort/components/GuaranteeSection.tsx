"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function GuaranteeSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <motion.div
        variants={rise}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-2xl rounded-2xl border border-sky/30 bg-surface px-8 py-10 text-center"
      >
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Zero Risk. Here&apos;s Our Promise to You.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate">
          If you complete the cohort, follow the exact strategy, and don&apos;t make your first
          ₹1L we refund every rupee. No questions, no arguments.
        </p>
      </motion.div>
    </section>
  );
}
