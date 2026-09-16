"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import AIArchitectCTAButton from "./AIArchitectCTAButton";
import PaymentBadges from "@/Components/PaymentBadges";

export default function FinalCTASection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <motion.div
        variants={rise}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center"
      >
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Ready to join AI Architect?
        </h2>
        <PaymentBadges className="mt-4" />
        <AIArchitectCTAButton label="Join AI Architect" />
        <p className="max-w-lg text-sm text-white/60">
          Once you&apos;re in, you&apos;ll get added to the cohort group with onboarding details,
          and the program officially kicks off on September 20, 2026.
        </p>
      </motion.div>
    </section>
  );
}
