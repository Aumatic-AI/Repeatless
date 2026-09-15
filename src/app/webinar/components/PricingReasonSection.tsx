"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const reasons = [
  "Free webinars attract people who register and never show up",
  "₹99 filters for people who are serious about actually changing their income not just curious",
  "The moment you pay, even a small amount, you show up and pay attention that's when real learning happens",
  "What you'll get in the next 60-90 minutes is worth far more than ₹99 this is a system, not fluff",
  "Think of it as a filter, not a price you'll get 10x the value in the first 10 minutes",
];

export default function PricingReasonSection() {
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
          Why ₹99, Not Free?
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 flex flex-col gap-5"
        >
          {reasons.map((r) => (
            <p key={r} className="text-lg leading-relaxed text-white/70">
              {r}
            </p>
          ))}
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 font-display text-xl italic text-lime"
        >
          Less than your Swiggy order. More valuable than most ₹5,000 courses.
        </motion.p>
      </div>
    </section>
  );
}
