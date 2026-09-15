"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const problems = [
  "You've seen people making money with AI but every time you try, you don't know where to start",
  "Your job doesn't pay enough, and every side hustle either needs capital or takes forever",
  "You think AI automation is \"for coders\" so you never even try",
  "Meanwhile, the gap between you and people already earning keeps growing",
];

export default function ProblemSection() {
  const reduce = useReducedMotion();

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

        <motion.ul
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delayChildren: 0.1 }}
          className="mt-8 flex flex-col gap-4"
        >
          {problems.map((p) => (
            <li key={p} className="flex items-start gap-3 text-lg leading-relaxed text-slate">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
              {p}
            </li>
          ))}
        </motion.ul>

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
