"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const CALENDLY = "https://calendly.com/chandannetha/30min";

const deliverables = [
  {
    title: "Done-for-you build",
    desc: "Fully built, tested and deployed by senior specialists — your first system live in days, not quarters.",
  },
  {
    title: "1 month free support",
    desc: "Free bug fixes and tweaks for 30 days after launch — no extra charge.",
  },
  {
    title: "Ongoing maintenance",
    desc: "After that, monitoring, alerts and optimisations continue — nothing breaks silently.",
  },
  {
    title: "ROI dashboard",
    desc: "A live dashboard showing hours saved, tasks automated and real business impact — every week.",
  },
  {
    title: "30-day guarantee",
    desc: "If it doesn't deliver measurable results within 30 days, we fix or rebuild it at no charge.",
  },
  {
    title: "One unified infrastructure",
    desc: "Every automation lives in one system — not a patchwork of disconnected bots.",
  },
];

export default function OfferBanner() {
  return (
    <section className="relative bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 shadow-[0_44px_100px_-44px_rgba(8,18,26,0.7)] sm:px-14 sm:py-16"
        >
          {/* Glow accents */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky/30 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky/20 blur-[130px]" />

          <div className="relative flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-skybright">What you get</p>
                <h2
                  className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
                  style={{ textWrap: "balance" } as React.CSSProperties}
                >
                  Everything to automate, scale and stay ahead.
                </h2>
                <p className="mt-4 leading-relaxed text-white/60">
                  No templates. No offshore team. A senior team building, running and optimising your
                  systems — with the guarantees to back it.
                </p>
              </div>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden shrink-0 items-center gap-2 self-start rounded-xl bg-sky px-6 py-3.5 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep sm:inline-flex"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Deliverables — checklist, not boxes */}
            <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d, idx) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky/25">
                      <FiCheck className="h-3 w-3 text-skybright" />
                    </span>
                    <h3 className="font-medium text-white">{d.title}</h3>
                  </div>
                  <p className="mt-2 pl-[30px] text-sm leading-relaxed text-white/50">{d.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky px-6 py-3.5 font-medium text-white transition-colors hover:bg-skydeep sm:hidden"
            >
              Book a strategy call
              <FiArrowUpRight className="h-4 w-4" />
            </a>

            {/* Trust line */}
            <p className="text-center text-xs text-white/35">
              No contracts. No retainer to start. 1 month free support on every build. 30-day results guarantee.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
