"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function GuaranteeSection() {
  const reduce = useReducedMotion();

  // Heading slides in from the left; the paragraph answers from the right,
  // since it sits on the opposite side of the row.
  const slideInLeft: Variants = {
    hidden: { x: reduce ? 0 : -80, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  const slideInRight: Variants = {
    hidden: { x: reduce ? 0 : 80, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <motion.h2
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          <span className="relative inline-block">
            Zero Risk.
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
            />
          </span>
          <br />
          Here&apos;s Our Promise to You.
        </motion.h2>

        <motion.p
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-md text-right text-lg leading-relaxed text-slate"
        >
          If you complete the cohort, follow the exact strategy, and don&apos;t make your first
          ₹1L,{" "}
          <span className="rounded bg-lime px-1.5 py-0.5 font-semibold text-ink">
            we refund every rupee.
          </span>{" "}
          No questions, no arguments.
        </motion.p>
      </div>
    </section>
  );
}
