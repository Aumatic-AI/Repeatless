"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import WhatsAppDemo from "./solutions/WhatsAppDemo";
import LeadGenDemo from "./solutions/LeadGenDemo";
import ContentDemo from "./solutions/ContentDemo";
import VoiceDemo from "./solutions/VoiceDemo";
import DashboardDemo from "./solutions/DashboardDemo";
import AgentsDemo from "./solutions/AgentsDemo";

// Each demo is a self-contained interface mockup — swap the component for the
// live integration (real WhatsApp, real voice call, …) when it's wired up.
const solutions = [
  {
    name: "WhatsApp & CRM automation",
    tab: "WhatsApp & CRM",
    desc: "Every lead captured, qualified and followed up — WhatsApp, your CRM and your pipeline moving as one.",
    Demo: WhatsAppDemo,
  },
  {
    name: "Lead gen & outreach",
    tab: "Lead gen",
    desc: "LinkedIn, email and cold calls that run themselves — pipeline that fills while your team sells.",
    Demo: LeadGenDemo,
  },
  {
    name: "Content & publishing",
    tab: "Content",
    desc: "Blogs, images and video — researched, produced and published on schedule, on autopilot.",
    Demo: ContentDemo,
  },
  {
    name: "Voice AI agents",
    tab: "Voice AI",
    desc: "Lifelike AI calls that book, remind and follow up — thousands of conversations, no call center.",
    Demo: VoiceDemo,
  },
  {
    name: "Dashboards & internal tools",
    tab: "Dashboards",
    desc: "One live view of your business — custom dashboards and tools built around how you actually work.",
    Demo: DashboardDemo,
  },
  {
    name: "Multi-agent AI systems",
    tab: "Multi-agent AI",
    desc: "Full AI infrastructure — agents that plan, delegate and execute across your business. The whole machine, built and run for you.",
    Demo: AgentsDemo,
  },
];

export default function SolutionsSection() {
  const reduce = useReducedMotion();
  const [[active, direction], setActive] = useState<[number, number]>([0, 0]);

  const go = (next: number) => {
    const clamped = (next + solutions.length) % solutions.length;
    setActive([clamped, clamped > active || (active === solutions.length - 1 && clamped === 0) ? 1 : -1]);
  };

  const s = solutions[active];

  return (
    <section id="solutions" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-sky">What we automate</p>
          <h2
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Six systems that do the work you shouldn&apos;t.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Real interfaces, real workflows. Pick one, combine them — or have us build the whole
            machine.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {solutions.map((sol, i) => (
            <button
              key={sol.name}
              type="button"
              onClick={() => go(i)}
              aria-pressed={i === active}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 bg-surface text-slate hover:border-sky/50 hover:text-sky"
              }`}
            >
              {sol.tab}
            </button>
          ))}
        </div>

        {/* Stage */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-surface2 shadow-[0_24px_60px_-40px_rgba(8,18,26,0.4)]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: reduce ? 0 : 48 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -48 * direction }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(active + 1);
                else if (info.offset.x > 70) go(active - 1);
              }}
              className="grid min-h-[540px] grid-cols-1 items-center gap-10 p-7 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
            >
              {/* The pitch */}
              <div>
                <p className="font-monoui text-sm text-slate2">
                  {String(active + 1).padStart(2, "0")} / 06
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {s.name}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-slate">{s.desc}</p>
                <a
                  href="/casestudies"
                  className="group mt-7 inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
                >
                  See it in production
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* The interface */}
              <div className="flex justify-center lg:justify-end">
                <s.Demo />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden>
            {solutions.map((sol, i) => (
              <span
                key={sol.name}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-sky" : "w-1.5 bg-ink/15"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous solution"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink transition-colors hover:border-sky hover:text-sky"
            >
              <FiArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next solution"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-surface text-ink transition-colors hover:border-sky hover:text-sky"
            >
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
