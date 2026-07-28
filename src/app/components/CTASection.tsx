"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      {/* Ambient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-sky/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2
          className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Ready to stop doing work <span className="text-sky">AI should handle?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate">
          We&apos;ll map exactly what to automate first — no pitch, no commitment.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://calendly.com/chandannetha/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-4 font-medium text-white shadow-[0_16px_34px_-16px_rgba(8,18,26,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep"
          >
            Book a strategy call
            <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://wa.me/919849884501"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-slate transition-colors hover:text-ink"
          >
            <FaWhatsapp className="h-4 w-4 text-sky" />
            or message us on WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
