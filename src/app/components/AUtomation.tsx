"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import NodeGridBackground from "./NodeGridBackground";

type Stage = {
  tag: string;
  duration: string;
  title: string;
  desc: string;
  artifact: string;
  status: "done" | "ongoing";
};

const stages: Stage[] = [
  {
    tag: "01 · DISCOVER",
    duration: "Day 1",
    title: "Strategy session",
    desc: "We map your workflows and find exactly where AI pays for itself.",
    artifact: "12 workflows reviewed → 3 automation candidates",
    status: "done",
  },
  {
    tag: "02 · DESIGN",
    duration: "Days 2–4",
    title: "Blueprint, not a template",
    desc: "A build plan around your stack — your CRM, your tools, your data.",
    artifact: "Stack locked: n8n · Claude · Slack",
    status: "done",
  },
  {
    tag: "03 · DEPLOY",
    duration: "Days 5–12",
    title: "Built, tested, live",
    desc: "Senior specialists build, integrate and ship — no offshore queue.",
    artifact: "24/24 tests passed · shipped to production",
    status: "done",
  },
  {
    tag: "04 · SCALE",
    duration: "Ongoing",
    title: "Monitored, optimized, expanded",
    desc: "We stay on after launch — nothing breaks silently, nothing stops improving.",
    artifact: "68% less manual work — and counting",
    status: "ongoing",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function ProcessSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 60%"] });

  // Three connectors between the four stages — each fills as its span of the
  // console scrolls through view, so the rail draws itself like a build log.
  const seg1 = useTransform(scrollYProgress, [0, 0.34], [0, 1]);
  const seg2 = useTransform(scrollYProgress, [0.33, 0.67], [0, 1]);
  const seg3 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);
  const segments = [seg1, seg2, seg3];

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            maskImage: "radial-gradient(80% 60% at 85% 100%, #000 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(80% 60% at 85% 100%, #000 20%, transparent 70%)",
          }}
        >
          <NodeGridBackground />
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="eyebrow text-sky">How we work</p>
          <h2
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            From first call to fully automated.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
            No black box — here&apos;s exactly what happens after you book a call.
          </p>
        </div>

        {/* Build console */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-[0_44px_100px_-44px_rgba(8,18,26,0.6)] sm:mt-14">
          {/* Window chrome */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              <span className="ml-2 truncate font-monoui text-[11px] lowercase tracking-wide text-white/40">
                repeatless · build console
              </span>
            </div>
            <span className="hidden shrink-0 eyebrow text-white/30 sm:inline-flex">
              Typical timeline: 2–4 weeks
            </span>
          </div>

          {/* Log */}
          <div ref={ref} className="px-6 py-9 sm:px-10 sm:py-11">
            <div className="flex flex-col">
              {stages.map((s, i) => (
                <motion.div
                  key={s.tag}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex gap-5 sm:gap-7"
                >
                  {/* Rail: status node + connector to next stage */}
                  <div className="flex shrink-0 flex-col items-center">
                    <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden>
                      {s.status === "ongoing" && !reduce && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skybright opacity-50" />
                      )}
                      <span
                        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                          s.status === "ongoing" ? "bg-skybright" : "bg-sky"
                        }`}
                      />
                    </span>
                    {i < stages.length - 1 && (
                      <span className="relative mt-1 w-px flex-1 bg-white/10" aria-hidden>
                        <motion.span
                          style={{ scaleY: reduce ? 1 : segments[i] }}
                          className="absolute inset-0 origin-top bg-skybright"
                        />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`min-w-0 flex-1 ${i < stages.length - 1 ? "pb-9 sm:pb-11" : ""}`}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-monoui text-[11px] tracking-[0.14em] text-skybright">{s.tag}</span>
                      <span className="font-monoui text-[11px] tracking-[0.08em] text-white/35">{s.duration}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">{s.title}</h3>
                    <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-white/55">{s.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 font-monoui text-[11px] text-white/50">
                      <span className={s.status === "ongoing" ? "text-skybright" : "text-sky"} aria-hidden>
                        ›
                      </span>
                      {s.artifact}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/casestudies"
          className="group mt-7 inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
        >
          See a real build
          <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
