"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

const forYou = [
  "Freelancers/agency owners selling AI automation stuck at inconsistent, low-ticket income",
  "Operators at ₹30k-50k/month feeling the ceiling — plateaued, overworked, delivery-dependent",
  'Anyone ready to reposition from "AI freelancer" to a real AI Architect',
  "People who want a repeatable system, not just inspiration",
];

const notForYou = [
  'People looking for a "get rich quick" hack with zero effort',
  "Complete beginners with no prior exposure to AI tools or automation",
  "Anyone unwilling to do outbound and talk to real clients",
  "Anyone not ready to niche down and reposition their offer",
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
