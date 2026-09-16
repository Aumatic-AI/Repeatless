"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiTarget, FiAward, FiCpu, FiSend, FiTrendingUp } from "react-icons/fi";

const outcomes = [
  {
    icon: FiTarget,
    text: "A specific, high-budget niche and a priced offer built around it",
  },
  {
    icon: FiAward,
    text: 'A repositioned brand and portfolio that reads "AI Architect," not "freelancer"',
  },
  {
    icon: FiCpu,
    text: "A working multi-agent system built using the full 8-step architecture process",
  },
  {
    icon: FiSend,
    text: "A live LinkedIn outbound system generating real conversations",
  },
  {
    icon: FiTrendingUp,
    text: "A sales process that closes ₹1-2L+/month retainer deals with confidence",
  },
];

export default function WhatYoullBuildSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  const cardContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };

  const cardItem: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          What You Build In 30 Days
        </motion.h2>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-5 max-w-3xl text-lg leading-relaxed text-slate"
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
          className="mt-8 font-monoui text-xs uppercase tracking-wide text-slate2"
        >
          By the end of the month, you&apos;ll have
        </motion.p>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {outcomes.slice(0, 4).map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              variants={cardItem}
              className="group rounded-2xl border border-ink/10 bg-surface p-6 transition-colors duration-300 hover:border-lime"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-base leading-relaxed text-slate">{text}</p>
            </motion.div>
          ))}

          {/* The payoff line, called out as a deliberate full-width capstone
              rather than left stranded alone in a 3-column grid's last row. */}
          {outcomes.slice(4).map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              variants={cardItem}
              className="group flex items-center gap-5 rounded-2xl border border-ink/10 bg-ink p-6 transition-colors duration-300 hover:border-lime sm:col-span-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-base leading-relaxed text-white/85 sm:text-lg">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
