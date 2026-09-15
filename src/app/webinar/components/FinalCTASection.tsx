"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import ReserveSeatButton from "./ReserveSeatButton";

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
        <ReserveSeatButton />
        <p className="text-sm text-white/60">September 20, 2026 | [Time]</p>
      </motion.div>
    </section>
  );
}
