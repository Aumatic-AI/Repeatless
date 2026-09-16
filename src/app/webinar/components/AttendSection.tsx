"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import ReserveSeatButton from "./ReserveSeatButton";

const attendIf = [
  "Complete beginner exploring AI automation",
  "Want a real side income, not another hustle",
  "Never seen a clear step-by-step system",
  "Part of Telugu community, want relevant training",
  "Ready to invest 60-90 mins to learn",
];

const skipIf = [
  "Looking for a \"get rich overnight\" trick",
  "Not willing to attend live or watch replay",
  "Already running a scaled automation agency",
  "Not willing to invest 60-90 mins to actually learn",
  "Just here to \"window shop\" with no intent to act",
];

export default function AttendSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          Who Should Attend
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-sky/30 bg-surface p-7">
            <h3 className="font-display text-xl font-semibold text-ink">Attend If</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {attendIf.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-skysoft">
                    <FiCheck className="h-3 w-3 text-sky" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-surface2 p-7">
            <h3 className="font-display text-xl font-semibold text-ink">Skip If</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {skipIf.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/10">
                    <FiX className="h-3 w-3 text-slate2" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <ReserveSeatButton />
          <p className="text-sm text-slate2">September 27, 2026</p>
        </motion.div>
      </div>
    </section>
  );
}
