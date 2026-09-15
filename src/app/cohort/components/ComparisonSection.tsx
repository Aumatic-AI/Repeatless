"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

const rows = [
  { them: "Same generic chatbots for same 3 niches", us: "Unsaturated niches, custom workflows" },
  { them: "₹2K-5K commoditized bots", us: "₹30K-1L+ high-value automations" },
  { them: "Taught by tutorial guys, never sold it themselves", us: "Taught by me actively running an agency" },
  { them: "English course, translated for Telugu audience", us: "Built Telugu-first, from scratch" },
  { them: "No real accountability, just recorded videos", us: "Live & Pre-record cohort + weekly accountability calls" },
  { them: "Vague promises, no refund", us: "100% money-back guarantee if you don't hit ₹1L" },
];

export default function ComparisonSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
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
        >
          Why Different From Others
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 overflow-x-auto rounded-2xl border border-white/10"
        >
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 font-monoui text-[11px] uppercase tracking-wide text-white/50">
                  What Others Do
                </th>
                <th className="px-6 py-4 font-monoui text-[11px] uppercase tracking-wide text-lime">
                  What We Do
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.them} className="border-b border-white/10 last:border-b-0">
                  <td className="px-6 py-4 align-top text-white/50">
                    <span className="flex items-start gap-2">
                      <FiX className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                      {row.them}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top text-white/85">
                    <span className="flex items-start gap-2">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                      {row.us}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
