"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function GuaranteeSection() {
  const reduce = useReducedMotion();

  const slideIn: Variants = {
    hidden: {
      y: reduce ? 0 : 30,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduce ? 0 : 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

        {/* Heading */}
        <motion.h2
          variants={slideIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
        >
          <span className="relative inline-block">
            Zero Risk.
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: reduce ? 0 : 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
            />
          </span>
          <br />
          Here&apos;s Our Promise to You.
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={slideIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: reduce ? 0 : 0.15 }}
          className="mt-8 max-w-2xl text-center text-lg leading-relaxed text-slate sm:text-xl"
        >
          If you complete the cohort, follow the exact strategy, and don&apos;t
          make your first ₹1L,{" "}
          <span className="rounded bg-lime px-1.5 py-0.5 font-semibold text-ink">
            we refund every rupee.
          </span>{" "}
          No questions, no arguments.
        </motion.p>
      </div>
    </section>
  );
}