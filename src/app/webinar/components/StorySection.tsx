"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const story = [
  "I was in a ₹70K/month job same place you're standing right now",
  "I learned this one skill, quit my job, and now run my own AI automation agency in Hyderabad with a team of 5",
  "On this free live training, I'll show you exactly how no fluff, no theory, just the real system",
];

export default function StorySection() {
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
          className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          I Was Exactly Where You Are Right Now
        </motion.h2>

        <motion.ul
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 flex flex-col gap-4"
        >
          {story.map((s) => (
            <li key={s} className="flex items-start gap-3 text-lg leading-relaxed text-white/70">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-skybright" />
              {s}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
