"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Member = { name: string; role: string };

const team: Member[] = [
  { name: "Teja", role: "CTO" },
  { name: "Lakshmi", role: "Automation Development" },
  { name: "Srivali", role: "Automation Development" },
  { name: "Shiva", role: "Automation Development" },
  { name: "Nishtha", role: "Automation Development" },
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function TeamRoster() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="eyebrow text-sky">The team</p>
        <h2
          className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          The specialists who build and run every system.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
          No offshore queue, no rotating contractors: the same named people ship your build and
          stay on after launch.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              custom={i}
              variants={reveal}
              initial={reduce ? undefined : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.6 }}
              className="flex items-center gap-4 py-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-skysoft font-monoui text-sm font-semibold text-sky">
                {initials(m.name)}
              </span>
              <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-display text-xl font-semibold text-ink">{m.name}</span>
                <span className="text-sm text-slate2">{m.role}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
