"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const story = [
  "Then AI started taking over and instead of fearing it, I asked myself one question: if AI is going to replace jobs, why not learn to use it and replace my own paycheck first?",
  "I started learning AI automation on the side nights, weekends, no shortcuts, no \"get rich quick\"",
  "The moment I realized I could build something that paid more than my job I quit. Not out of frustration, but because I knew what I was building was worth more than a monthly salary",
  "Today, I run my own AI automation agency in Hyderabad [Address] with a team of 5 people working under me",
  "I went from being an employee taking orders, to an employer giving work to others",
  "I bought my own bike, my own car with money I made from skills I taught myself",
  "When my parents went for my marriage proposal, the bride's family asked what I do and my parents proudly said \"my son runs his own business\" not \"he has a job\"",
  "If a regular guy with a ₹70K job could build all this by learning one skill and taking action you can do the exact same thing",
];

export default function StorySection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Kept simple: no bullets, numbers or badges — this is a narrative,
  // read top to bottom, not a list to scan.
  const paraContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
  };

  const para: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          I Was Exactly Where You Are Right Now
        </motion.h2>

        <div className="mt-10 border-l-2 border-lime pl-6 sm:pl-8">
          {/* Lede — the hook, set apart from the rest of the story */}
          <motion.p
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            I used to work a regular job ₹70,000/month, stable, &quot;safe&quot; the same place
            most of you are standing right now.
          </motion.p>

          <motion.div
            variants={paraContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 flex flex-col gap-5"
          >
            {story.map((s) => (
              <motion.p key={s} variants={para} className="text-lg leading-relaxed text-white/70">
                {s}
              </motion.p>
            ))}
          </motion.div>
        </div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 font-display text-xl italic text-white/80"
        >
          I&apos;m not teaching you theory I read somewhere. I&apos;m teaching you the exact path
          I walked simplified, shortened, and made beginner-friendly so you don&apos;t take the
          years I took.
        </motion.p>
      </div>
    </section>
  );
}
