"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowRight, FiPlus, FiX } from "react-icons/fi";

const problems = [
  {
    headline: "Scrolling, not starting",
    detail:
      "You've seen 100+ reels of people flashing \"AI income\" screenshots but every time you try to start, you don't know what to actually do",
  },
  {
    headline: "Scattered learning",
    detail:
      "You've tried learning AI tools on YouTube ChatGPT, automation tools, AI agents but it's scattered, random, with no clear path to actual money",
  },
  {
    headline: "No capital, no time",
    detail:
      "Your job or college life doesn't pay enough, and every side hustle you've tried trading, dropshipping, blogging either needs capital you don't have or takes months to show any result",
  },
  {
    headline: "“Isn't this saturated?”",
    detail:
      "You see people selling \"AI chatbot services\" online and think  \"isn't this saturated already? Everyone's doing the same thing\"",
  },
  {
    headline: "“Not a coder”",
    detail:
      "You assume AI automation is \"for coders and tech people\"  so you talk yourself out of it before even trying",
  },
  {
    headline: "Burned by bad courses",
    detail:
      "You've bought courses before that overpromised and underdelivered generic content, no real support, no refund when it didn't work",
  },
  {
    headline: "Nothing built for you",
    detail:
      "Every AI course you find online is built for a global/English-speaking audience nothing made for Telugu people, in a way that actually makes sense to you",
  },
  {
    headline: "The gap keeps growing",
    detail:
      "Meanwhile, time keeps passing another month, another \"I'll start next month\"  and the gap between you and the people already earning keeps growing",
  },
];

export default function ProblemSection() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Same slide-in-rectangle treatment as "Done for you. Built with your
  // team." on the homepage (TwoTracks.tsx): the rectangle has no
  // `whileInView` of its own — at `w-screen` wide it can never satisfy an
  // area-based visibility threshold on its own box — so it inherits the
  // hidden/show state from the heading instead.
  const slideInRight: Variants = {
    hidden: { x: reduce ? 0 : 120, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.6 }}
          className="relative inline-block font-display text-[50px] font-semibold leading-tight tracking-tight text-ink"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Tired of Watching Others Make Money With AI While You&apos;re Stuck Scrolling?
          <motion.span aria-hidden="true" variants={slideInRight} className="pointer-events-none absolute left-full top-0 h-full w-screen bg-lime" />
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 border-t border-ink/10"
        >
          {problems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.headline}
                onMouseEnter={() => setOpenIndex(i)}
                onMouseLeave={() => setOpenIndex((current) => (current === i ? null : current))}
                className={`border-b transition-colors duration-300 ${
                  isOpen ? "border-transparent" : "border-ink/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  onFocus={() => setOpenIndex(i)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center gap-4 py-6 text-left transition-colors duration-300 sm:gap-8 ${
                    isOpen ? "border-y-2 border-lime bg-lime/10" : ""
                  }`}
                >
                  <span className="w-8 shrink-0 font-monoui text-sm text-slate2">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span className="block font-monoui text-[11px] uppercase tracking-wide text-slate2">
                      Problem
                    </span>
                    <span className="mt-1 block font-display text-xl font-semibold text-ink sm:text-2xl">
                      {item.headline}
                    </span>
                  </span>

                  <FiArrowRight className="hidden h-4 w-4 shrink-0 text-slate2 sm:block" />

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-lime bg-lime text-ink" : "border-ink/15 text-ink"
                    }`}
                  >
                    {isOpen ? <FiX className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="bg-lime/10"
                    >
                      <p className="max-w-2xl pb-7 pl-12 text-base leading-relaxed text-slate sm:pl-[4.5rem]">
                        {item.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 border-l-2 border-sky pl-5 text-lg font-medium leading-relaxed text-ink"
        >
          The problem isn&apos;t AI. The problem is nobody&apos;s shown you the exact, simple path
          built for a complete beginner, with zero risk if it doesn&apos;t work.
        </motion.p>
      </div>
    </section>
  );
}
