"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiPlay, FiUsers } from "react-icons/fi";
import ReserveSeatButton from "./ReserveSeatButton";
import PaymentBadges from "@/Components/PaymentBadges";

export default function WebinarHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="eyebrow text-skybright"
        >
          Free Live Training for the Telugu Community
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          How I Built a ₹1L/Month AI Automation Agency (Without Coding)
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          In this live session, I&apos;ll show you the exact system to find unsaturated niches,
          build your first automation, and land paying clients even if you&apos;re a complete
          beginner.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-4 max-w-xl text-sm italic text-white/50"
        >
          (Just ₹99 Less than your Swiggy order, for a system that could change your income)
        </motion.p>

        {/* VSL placeholder — no video exists yet */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-10 flex aspect-video w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink">
            <FiPlay className="h-5 w-5 translate-x-0.5" />
          </span>
          <p className="text-sm italic text-white/50">Will update soon</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.4, 0, 0.2, 1] }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <PaymentBadges />
          <ReserveSeatButton />
          <p className="flex items-center gap-2 text-sm text-white/60">
            <FiUsers className="h-4 w-4 text-skybright" />
            Only 10 live seats available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
