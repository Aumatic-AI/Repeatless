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
          Tired of Watching Others Make Money With AI While You&apos;re Stuck Scrolling?
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
