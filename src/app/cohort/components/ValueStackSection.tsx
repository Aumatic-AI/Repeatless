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
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.55,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="bg-ink py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          Here&apos;s Everything You Get Today
        </motion.h2>

        {/* Desktop Table */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 hidden overflow-hidden rounded-2xl border border-white/10 md:block sm:mt-10"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-5 font-monoui text-[11px] uppercase tracking-wide text-white/50 lg:px-8">
                  What You Get
                </th>

                <th className="px-6 py-5 text-right font-monoui text-[11px] uppercase tracking-wide text-white/50 lg:px-8">
                  Value
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.item}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="px-6 py-5 text-sm leading-relaxed text-white/80 lg:px-8 lg:text-base">
                    {row.item}
                  </td>

                  <td className="px-6 py-5 text-right text-sm text-white/80 lg:px-8 lg:text-base">
                    {row.value}
                  </td>
                </tr>
              ))}

              <tr>
                <td className="px-6 py-6 font-display text-lg font-semibold text-lime lg:px-8">
                  Total Value
                </td>

                <td className="px-6 py-6 text-right font-display text-lg font-semibold text-lime lg:px-8">
                  ₹87,000
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 flex flex-col gap-3 md:hidden"
        >
          {rows.map((row) => (
            <div
              key={row.item}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <p className="min-w-0 text-sm leading-relaxed text-white/80">
                {row.item}
              </p>

              <p className="shrink-0 font-display text-sm font-semibold text-white">
                {row.value}
              </p>
            </div>
          ))}

          {/* Mobile Total */}
          <div className="mt-1 flex items-center justify-between rounded-xl border border-lime/30 bg-lime/5 px-4 py-5">
            <p className="font-display text-base font-semibold text-lime">
              Total Value
            </p>

            <p className="font-display text-lg font-semibold text-lime">
              ₹87,000
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 flex flex-col items-center gap-3 text-center sm:mt-10"
        >
          <PaymentBadges />

          <CohortCTAButton label="Yes, I Want My First ₹1L" />

          <p className="max-w-md text-xs leading-relaxed text-white/60 sm:text-sm">
            100% Money-Back Guarantee — hit your first ₹1L or get every rupee
            back
          </p>
        </motion.div>
      </div>
    </section>
  );
}