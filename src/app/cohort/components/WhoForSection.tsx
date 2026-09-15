"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

const forYou = [
  "You're a complete beginner, ready to learn and take action",
  "You want real side income, not another \"maybe it'll work\" hustle",
  "You're ready to put in daily effort for 48 days",
  "You're part of the Telugu community and want a course built for you",
];

const notForYou = [
  "You want overnight results with zero effort",
  "Who are not ready to give atleasst 1-2hr day",
  "You're not willing to do outreach or talk to real clients",
  "You just want to \"watch someday\" this is live and action-based",
];

export default function WhoForSection() {
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
          Who This Is For / Not For
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-sky/30 bg-surface p-7">
            <h3 className="font-display text-xl font-semibold text-ink">This is for you if:</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {forYou.map((item) => (
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
            <h3 className="font-display text-xl font-semibold text-ink">This is NOT for you if:</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {notForYou.map((item) => (
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
      </div>
    </section>
  );
}
