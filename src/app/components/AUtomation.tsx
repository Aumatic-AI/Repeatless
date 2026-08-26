"use client";

import { Fragment, useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

type Phase = {
  tag: string;
  step: string;
  kicker: string;
  duration: string;
  title: string;
  desc: string;
  artifact: string;
  /** Oversized outlined word sitting behind the console for this phase. */
  ghost: string;
  /** Schematic shown in the right-hand panel. */
  panel: { title: string; nodes: string[]; flow: string[] };
  status: "done" | "ongoing";
};

const phases: Phase[] = [
  {
    tag: "01 · DISCOVER",
    step: "01",
    kicker: "DISCOVER",
    duration: "Day 1",
    title: "Strategy session",
    desc: "We map your workflows and find exactly where AI pays for itself.",
    artifact: "12 workflows reviewed → 3 automation candidates",
    ghost: "STRATEGY",
    panel: { title: "WORKFLOW AUDIT", nodes: ["WORKFLOWS", "BOTTLENECKS", "ROI"], flow: ["OBSERVE", "MEASURE", "SHORTLIST"] },
    status: "done",
  },
  {
    tag: "02 · DESIGN",
    step: "02",
    kicker: "DESIGN",
    duration: "Days 2–4",
    title: "Blueprint, not a template",
    desc: "A build plan around your stack — your CRM, your tools, your data.",
    artifact: "Stack locked: n8n · Claude · Slack",
    ghost: "BLUEPRINT",
    panel: { title: "SYSTEM HANDOFF", nodes: ["CRM", "AI LAYER", "OPERATIONS"], flow: ["INPUT", "LOGIC", "OUTPUT"] },
    status: "done",
  },
  {
    tag: "03 · DEPLOY",
    step: "03",
    kicker: "DEPLOY",
    duration: "Days 5–12",
    title: "Built, tested, live",
    desc: "Senior specialists build, integrate and ship — no offshore queue.",
    artifact: "24/24 tests passed · shipped to production",
    ghost: "DEPLOY",
    panel: { title: "BUILD PIPELINE", nodes: ["STAGING", "TESTS", "PRODUCTION"], flow: ["BUILD", "VERIFY", "SHIP"] },
    status: "done",
  },
  {
    tag: "04 · SCALE",
    step: "04",
    kicker: "SCALE",
    duration: "Ongoing",
    title: "Monitored, optimized, expanded",
    desc: "We stay on after launch — nothing breaks silently, nothing stops improving.",
    artifact: "68% less manual work — and counting",
    ghost: "SCALE",
    panel: { title: "LIVE OPERATIONS", nodes: ["MONITOR", "ALERT", "IMPROVE"], flow: ["WATCH", "TUNE", "EXPAND"] },
    status: "ongoing",
  },
];

/**
 * Scroll track height. The console pins for (TRACK − 1 viewport), and that
 * distance is split evenly across the four phases — so each phase holds for
 * roughly half a screen of scrolling before handing over to the next.
 */
const TRACK = "h-[260vh] sm:h-[320vh]";

/** The schematic in the right-hand panel: three nodes wired in sequence. */
function PanelSchematic({ phase, reduce }: { phase: Phase; reduce: boolean | null }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 font-monoui text-[10px] tracking-[0.16em] text-white/35">{phase.panel.title}</span>
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skybright opacity-40" />}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-skybright" />
        </span>
      </div>

      {/* Three wired nodes. Nodes flex to fill the available width (min-w-0
          so they can shrink below their content size) instead of a fixed
          rem width — a fixed width overflowed the panel on phones, where the
          vertical phase rail already claims a chunk of the horizontal space. */}
      <div className="mt-7 flex items-start gap-1.5 sm:gap-3">
        {phase.panel.nodes.map((label, i) => (
          <Fragment key={label}>
            {i > 0 && (
              <motion.span
                aria-hidden
                className="mt-[15px] h-px w-3 shrink-0 origin-left bg-gradient-to-r from-white/25 to-white/10 sm:mt-[19px] sm:w-8"
                initial={{ scaleX: reduce ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.24 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            <motion.div
              className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:max-w-[4.75rem] sm:flex-none sm:gap-2.5"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.14 + i * 0.12 }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] font-monoui text-[10px] text-white/70 sm:h-10 sm:w-10 sm:text-[11px]">
                {`0${i + 1}`}
              </span>
              <span className="text-center font-monoui text-[8.5px] leading-tight tracking-[0.1em] text-white/40 sm:text-[9px] sm:tracking-[0.12em]">
                {label}
              </span>
            </motion.div>
          </Fragment>
        ))}
      </div>

      {/* Flow chips */}
      <div className="mt-7 grid grid-cols-3 gap-1.5 sm:gap-2">
        {phase.panel.flow.map((f, i) => (
          <motion.span
            key={f}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-1 py-2 text-center font-monoui text-[8.5px] leading-tight tracking-[0.1em] text-white/45 sm:px-0 sm:text-[9px] sm:tracking-[0.12em]"
            initial={{ opacity: 0, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.44 + i * 0.08 }}
          >
            {f}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0); // opens on 01 · DISCOVER

  // Scrolling the pinned track is what advances the phases.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(phases.length - 1, Math.max(0, Math.floor(p * phases.length)));
    setActive((current) => (current === next ? current : next));
  });

  // The console lifts into place as the track comes up the viewport, settling
  // just as it pins.
  const { scrollYProgress: enter } = useScroll({ target: trackRef, offset: ["start end", "start 25%"] });
  const cardY = useTransform(enter, [0, 1], [reduce ? 0 : 96, 0]);
  const cardScale = useTransform(enter, [0, 1], [reduce ? 1 : 0.965, 1]);
  const cardOpacity = useTransform(enter, [0, 0.55, 1], [reduce ? 1 : 0, reduce ? 1 : 0.85, 1]);
  const ghostY = useTransform(enter, [0, 1], [reduce ? 0 : 40, 0]);

  // Rail clicks and arrow keys scroll to that phase's slice of the track,
  // since scroll position — not local state — is the source of truth.
  const goToPhase = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return setActive(index);
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const pinned = track.offsetHeight - window.innerHeight;
    const target = trackTop + pinned * ((index + 0.5) / phases.length);
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  const onTabKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = phases.length - 1;
    else {
      const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
      next = Math.min(phases.length - 1, Math.max(0, active + delta));
    }
    goToPhase(next);
    tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }, [active, goToPhase]);

  const phase = phases[active];

  return (
    /* overflow-x-clip (not overflow-hidden) so the oversized ghost word is
       clipped horizontally without turning this into a scroll container —
       which would stop the console below from sticking. */
    <section className="relative overflow-x-clip bg-surface py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
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
      </div>

      {/* Scroll track. The console pins inside it and the phases advance as
          this track passes through the viewport. */}
      <div ref={trackRef} className={`relative ${TRACK}`}>
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="relative mx-auto w-full max-w-6xl px-0 sm:px-6">
          <motion.span
            aria-hidden
            style={{ y: ghostY }}
            className="pointer-events-none absolute inset-x-0 -top-[7rem] select-none text-center font-display text-[clamp(4.5rem,12.5vw,10.5rem)] font-semibold leading-none tracking-[-0.045em] text-transparent sm:-top-[9rem]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phase.ghost}
                className="inline-block"
                style={{ WebkitTextStroke: "1px rgba(10,15,20,0.08)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.5 }}
              >
                {phase.ghost}
              </motion.span>
            </AnimatePresence>
          </motion.span>

            <motion.div
              style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
              className="relative origin-bottom overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-[0_56px_120px_-52px_rgba(8,18,26,0.7)] will-change-transform"
            >
          {/* Ghost step numeral, bottom-right inside the console */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-14 right-4 select-none font-display text-[13rem] font-semibold leading-none tracking-tighter text-white/[0.035] sm:right-10 sm:text-[17rem]"
          >
            {phase.step}
          </span>

          {/* Window chrome */}
          <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
              <span className="ml-2 truncate font-monoui text-[11px] lowercase tracking-wide text-white/40">
                repeatless · operations build
              </span>
            </div>
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <span className="font-monoui text-[10px] tracking-[0.16em] text-white/80">
                SYSTEM PHASE {phase.step}
              </span>
              <span className="font-monoui text-[10px] tracking-[0.16em] text-white/30">2–4 WEEKS</span>
            </div>
          </div>

          {/* Body */}
          <div className="relative flex gap-5 px-5 py-8 sm:gap-8 sm:px-10 sm:py-11">
            {/* Phase rail */}
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Build phases"
              aria-orientation="vertical"
              onKeyDown={onTabKeyDown}
              className="flex shrink-0 flex-col items-center pt-1.5"
            >
              {phases.map((p, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <Fragment key={p.tag}>
                    <button
                      type="button"
                      role="tab"
                      id={`phase-tab-${i}`}
                      aria-selected={isActive}
                      aria-controls={`phase-panel-${i}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => goToPhase(i)}
                      aria-label={`Phase ${p.step} — ${p.title}`}
                      /* px-2.5 widens the hit area to ~44px without moving the dot */
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-full px-2.5 outline-none focus-visible:ring-2 focus-visible:ring-skybright focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden>
                        {isActive && (
                          <motion.span
                            layoutId="phase-ring"
                            className="absolute inset-0 rounded-full border border-skybright/70"
                            transition={{ type: "spring", stiffness: 320, damping: 26 }}
                          />
                        )}
                        {isActive && p.status === "ongoing" && !reduce && (
                          <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-skybright opacity-60" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full transition-all duration-300 ${
                            isActive
                              ? "h-2.5 w-2.5 bg-skybright"
                              : isPast
                                ? "h-2 w-2 bg-sky/70 group-hover:bg-sky"
                                : "h-2 w-2 bg-white/20 group-hover:bg-white/40"
                          }`}
                        />
                      </span>
                      <span
                        className={`font-monoui text-[9px] tracking-[0.1em] transition-colors duration-300 ${
                          isActive ? "text-skybright" : "text-white/25 group-hover:text-white/50"
                        }`}
                      >
                        {p.step}
                      </span>
                    </button>

                    {i < phases.length - 1 && (
                      <span className="relative my-1.5 w-px flex-1 bg-white/10" aria-hidden>
                        <motion.span
                          className="absolute inset-0 origin-top bg-skybright/70"
                          initial={false}
                          animate={{ scaleY: i < active ? 1 : 0 }}
                          transition={{ duration: reduce ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </span>
                    )}
                  </Fragment>
                );
              })}
            </div>

            {/* Phase content — min-height keeps the console from resizing between phases */}
            <div className="grid min-w-0 flex-1 gap-8 lg:min-h-[19rem] lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active}`}
                  id={`phase-panel-${active}`}
                  role="tabpanel"
                  aria-labelledby={`phase-tab-${active}`}
                  className="min-w-0"
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  /* Kept short: with mode="wait" the exit blocks the enter, so
                     a slow pair makes scroll-driven stepping feel laggy. */
                  transition={{ duration: reduce ? 0 : 0.24, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-monoui text-[11px] tracking-[0.14em] text-skybright">{phase.tag}</span>
                    <span className="h-px w-8 bg-white/15" aria-hidden />
                    <span className="font-monoui text-[11px] tracking-[0.08em] text-white/35">{phase.duration}</span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.6rem]">
                    {phase.title}
                  </h3>

                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55 sm:text-base">
                    {phase.desc}
                  </p>

                  {/* Wraps rather than truncates on narrow screens — the
                      artifact is the proof, so it must stay readable. */}
                  <div className="mt-7 inline-flex max-w-full items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 sm:items-center sm:rounded-full">
                    <span className={`shrink-0 ${phase.status === "ongoing" ? "text-skybright" : "text-sky"}`} aria-hidden>›</span>
                    <span className="min-w-0 font-monoui text-[11px] leading-relaxed text-white/55 sm:whitespace-nowrap">{phase.artifact}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`panel-${active}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  /* Kept short: with mode="wait" the exit blocks the enter, so
                     a slow pair makes scroll-driven stepping feel laggy. */
                  transition={{ duration: reduce ? 0 : 0.24, ease: [0.4, 0, 0.2, 1] }}
                >
                  <PanelSchematic phase={phase} reduce={reduce} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl px-6 sm:mt-0">
        <Link
          href="/casestudies"
          className="group inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
        >
          See a real build
          <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
