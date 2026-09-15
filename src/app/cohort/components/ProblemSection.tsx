"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const problems = [
  "You've seen 100+ reels of people flashing \"AI income\" screenshots but every time you try to start, you don't know what to actually do",
  "You've tried learning AI tools on YouTube ChatGPT, automation tools, AI agents but it's scattered, random, with no clear path to actual money",
  "Your job or college life doesn't pay enough, and every side hustle you've tried trading, dropshipping, blogging either needs capital you don't have or takes months to show any result",
  "You see people selling \"AI chatbot services\" online and think  \"isn't this saturated already? Everyone's doing the same thing\"",
  "You assume AI automation is \"for coders and tech people\"  so you talk yourself out of it before even trying",
  "You've bought courses before that overpromised and underdelivered generic content, no real support, no refund when it didn't work",
  "Every AI course you find online is built for a global/English-speaking audience nothing made for Telugu people, in a way that actually makes sense to you",
  "Meanwhile, time keeps passing another month, another \"I'll start next month\"  and the gap between you and the people already earning keeps growing",
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
