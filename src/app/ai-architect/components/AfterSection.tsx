"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const perks = [
  { title: "24/7 Support", desc: "Get unstuck any time" },
  { title: "Bi-Weekly Live Calls", desc: "Direct feedback on wherever you're stuck" },
  { title: "Lifetime Access", desc: "To the course and community, no expiry" },
  { title: "Lifetime Updates", desc: "New modules and systems added as we build them" },
];

export default function AfterSection() {
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
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          What Happens After 30 Days
        </motion.h2>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate"
        >
          This isn&apos;t a course you finish and forget. Once you&apos;re in:
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-ink/10 bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate2">{p.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 text-center text-lg font-medium italic text-ink"
        >
          You&apos;re not buying a static course. You&apos;re buying into the system as it keeps
          evolving.
        </motion.p>
      </div>
    </section>
  );
}
