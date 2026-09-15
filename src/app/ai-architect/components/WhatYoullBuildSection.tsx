"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const outcomes = [
  "A specific, high-budget niche and a priced offer built around it",
  'A repositioned brand and portfolio that reads "AI Architect," not "freelancer"',
  "A working multi-agent system built using the full 8-step architecture process",
  "A live LinkedIn outbound system generating real conversations",
  "A sales process that closes ₹1-2L+/month retainer deals with confidence",
];

export default function WhatYoullBuildSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          What You Build In 30 Days
        </motion.h2>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-5 text-lg leading-relaxed text-slate"
        >
          In 30 days, you go from selling commoditized voice bots and chatbots to running a real
          AI infrastructure offer with a niche, a positioning, a technical architecture, a client
          pipeline, and a sales process that closes retainers, not one-off gigs.
        </motion.p>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-6 font-medium text-ink"
        >
          By the end of the month, you&apos;ll have:
        </motion.p>

        <motion.ul
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-slate"
        >
          {outcomes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
