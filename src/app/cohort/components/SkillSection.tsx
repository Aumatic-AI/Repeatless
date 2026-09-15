"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export default function SkillSection() {
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
          The One Skill That Changed My Life
        </motion.h2>

        <motion.ul
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 flex flex-col gap-4 text-lg leading-relaxed text-slate"
        >
          <li className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            It wasn&apos;t &quot;learning AI&quot; in general it was one specific, sellable skill:{" "}
            <span className="font-semibold text-ink">AI Automation as a Service</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            Not prompt tricks. Not content creation. A real service businesses pay
            ₹10,000–₹50,000+ for because it saves them time and money daily
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            The market isn&apos;t saturated the approach is. Everyone sells the same chatbot to the
            same 2-3 niches
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            The real opportunity is in thousands of untouched niches sweet shops, clinics, gyms,
            local businesses nobody&apos;s automating for them yet
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            This is exactly what I do in my agency every day and exactly what I&apos;ll teach you,
            step by step, from zero to your first ₹1L in 48 days
          </li>
        </motion.ul>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 border-l-2 border-sky pl-5 text-lg font-medium leading-relaxed text-ink"
        >
          This is why I built this cohort the exact system I use, shortened into 48 days, so you
          don&apos;t take years to figure it out like I did.
        </motion.p>
      </div>
    </section>
  );
}
