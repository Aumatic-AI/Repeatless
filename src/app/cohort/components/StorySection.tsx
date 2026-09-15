"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const story = [
  "I used to work a regular job ₹70,000/month, stable, \"safe\" the same place most of you are standing right now",
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
