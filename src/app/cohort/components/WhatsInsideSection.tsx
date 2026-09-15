"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const heading = "What You Will Learn".split(" ");

export default function WhatsInsideSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Each word of the heading pops in on its own beat instead of the whole
  // line fading up together.
  const wordContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          variants={wordContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap justify-center gap-x-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl"
        >
          {heading.map((w, i) => (
            <motion.span key={i} variants={word}>
              {w}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed sm:text-2xl"
        >
          Become an{" "}
          <span className="relative inline-block whitespace-nowrap text-ink">
            AI Architect
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
            />
          </span>{" "}
          Not Another Automation Freelancer
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/ai-architect"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-lime px-6 py-3.5 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            See the 6-Module Breakdown
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
