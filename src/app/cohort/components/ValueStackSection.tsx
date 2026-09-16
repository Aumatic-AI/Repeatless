"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import CohortCTAButton from "./CohortCTAButton";
import PaymentBadges from "@/Components/PaymentBadges";

const rows = [
  { item: "Full 6-Module Cohort", value: "₹15,000" },
  { item: "Done-For-You Automation Templates", value: "₹25,000" },
  { item: "Complete N8N Beg-Advance Course", value: "₹10000" },
  { item: "Outreach & DM Script Vault", value: "₹3,000" },
  { item: "Reel Content Prompt Pack", value: "₹2,000" },
  { item: "Private Community Access (Lifetime)", value: "₹5,000" },
  { item: "Proposal & Pricing Templates", value: "₹2,000" },
  { item: "Mid-Level Course Discount", value: "₹10,000" },
  { item: "Weekly Live Accountability Calls", value: "₹5,000" },
];

export default function ValueStackSection() {
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
          Here&apos;s Everything You Get Today
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 overflow-x-auto rounded-2xl border border-white/10"
        >
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 font-monoui text-[11px] uppercase tracking-wide text-white/50">
                  What You Get
                </th>
                <th className="px-6 py-4 text-right font-monoui text-[11px] uppercase tracking-wide text-white/50">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-b border-white/10">
                  <td className="px-6 py-4 text-white/80">{row.item}</td>
                  <td className="px-6 py-4 text-right text-white/80">{row.value}</td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-5 font-display text-lg font-semibold text-lime">
                  Total Value
                </td>
                <td className="px-6 py-5 text-right font-display text-lg font-semibold text-lime">
                  ₹87,000
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <PaymentBadges />
          <CohortCTAButton label="Yes, I Want My First ₹1L" />
          <p className="text-sm text-white/60">
            100% Money-Back Guarantee hit your first ₹1L or get every rupee back
          </p>
        </motion.div>
      </div>
    </section>
  );
}
