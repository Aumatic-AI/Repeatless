"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "framer-motion";
import {
  TrendingUp,
  Network,
  Users,
  ArrowUpRight,
  Megaphone,
  PenTool,
  Search,
  ShoppingBag,
  Target,
  Briefcase,
  Wrench,
  BookOpen,
  Share2,
  Home,
} from "lucide-react";
import { tools } from "./toolsData";

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

const heroResult: Stat = { value: 68, suffix: "%", label: "less manual work" };
const supportingResults: Stat[] = [
  { value: 21, suffix: "%", label: "faster lead response" },
  { value: 3.2, prefix: "$", suffix: "k", decimals: 1, label: "saved / month" },
];

const teamTraits = ["Senior specialists only", "Here long after launch"];

// Five generic "tool" nodes, scattered with a couple of stray/broken
// connections (patchwork) vs. arranged around a central hub (one system).
// Coordinates live in a 240x130 viewBox.
const HUB = { cx: 120, cy: 63 };
const PATCHWORK_NODES = [
  { id: "a", cx: 28, cy: 28 },
  { id: "b", cx: 96, cy: 14 },
  { id: "c", cx: 168, cy: 33 },
  { id: "d", cx: 206, cy: 88 },
  { id: "e", cx: 54, cy: 98 },
];
const SYSTEM_NODES = [
  { id: "a", cx: 120, cy: 15 },
  { id: "b", cx: 167, cy: 45 },
  { id: "c", cx: 150, cy: 100 },
  { id: "d", cx: 90, cy: 100 },
  { id: "e", cx: 73, cy: 45 },
];
const PATCHWORK_LINES = [
  { x1: 28, y1: 28, x2: 206, y2: 88 },
  { x1: 96, y1: 14, x2: 54, y2: 98 },
  { x1: 168, y1: 33, x2: 28, y2: 28, dashed: true },
];

// Real client contexts drawn from the case studies — breadth without fabricated logos.
const contexts = [
  { label: "New York ad agency", icon: Megaphone },
  { label: "Toronto content brand", icon: PenTool },
  { label: "Canadian SEO publisher", icon: Search },
  { label: "Chicago luxury retail", icon: ShoppingBag },
  { label: "Vancouver marketing team", icon: Target },
  { label: "Austin consulting firm", icon: Briefcase },
  { label: "US local services", icon: Wrench },
  { label: "Book publisher", icon: BookOpen },
  { label: "B2B LinkedIn brands", icon: Share2 },
  { label: "Ohio home services", icon: Home },
];

// Cascading drop-and-bounce timing for the context chips — each chip's own
// repeat period must equal CHIP_CYCLE exactly so the wave stays in sync
// forever instead of drifting; only the stagger delay differs per chip.
const CHIP_STAGGER = 0.12;
const CHIP_BOUNCE_DURATION = 0.9;
const CHIP_CYCLE_PAUSE = 1.6;
const CHIP_CYCLE = contexts.length * CHIP_STAGGER + CHIP_BOUNCE_DURATION + CHIP_CYCLE_PAUSE;

// Counts up from 0 when it scrolls into view — proof that reads as live data,
// not a static claim.
function StatNumber({ value, prefix = "", suffix = "", decimals = 0 }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf: number;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// A compact, simulated exchange — dramatizes "no ticket queues, direct line
// to the builder" instead of stating it as a bullet point.
function TeamChatDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [stage, setStage] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const t1 = setTimeout(() => setStage(1), 650);
    const t2 = setTimeout(() => setStage(2), 1850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduce]);

  return (
    <div ref={ref} className="mt-6 flex flex-col gap-2">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-surface2 px-3.5 py-2 text-sm text-ink">
        &ldquo;Can we tweak the WhatsApp flow before Friday?&rdquo;
      </div>
      <AnimatePresence mode="wait">
        {stage === 1 && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-14 items-center justify-center gap-1 rounded-2xl rounded-tl-md bg-skysoft px-3 py-2.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-sky"
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        )}
        {stage === 2 && (
          <motion.div
            key="reply"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-[85%] rounded-2xl rounded-tl-md bg-skysoft px-3.5 py-2 text-sm text-skydeep"
          >
            &ldquo;Done — pushed the fix, live now.&rdquo;{" "}
            <span className="text-xs text-skydeep/60">Chandan · just now</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Five scattered nodes reorganize around a central hub when toggled — the
// visual argument for "one system, not a patchwork," with no tool named.
function SystemDiagram() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [mode, setMode] = useState<"patchwork" | "system">("patchwork");

  useEffect(() => {
    if (reduce) {
      setMode("system");
      return;
    }
    if (!inView) return;
    let showSystem = false;
    const id = setInterval(() => {
      showSystem = !showSystem;
      setMode(showSystem ? "system" : "patchwork");
    }, 2200);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const nodes = mode === "system" ? SYSTEM_NODES : PATCHWORK_NODES;

  return (
    <div ref={ref} className="mt-5">
      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className={`eyebrow ${mode === "system" ? "text-sky" : "text-slate2"}`}
        >
          {mode === "system" ? "One system" : "Patchwork"}
        </motion.p>
      </AnimatePresence>

      <svg viewBox="0 0 240 130" className="mt-3 block h-32 w-full sm:h-36">
        {/* Patchwork connections — messy, one dashed/broken */}
        <g style={{ opacity: mode === "patchwork" ? 1 : 0, transition: "opacity 0.4s" }}>
          {PATCHWORK_LINES.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="rgba(10,15,20,0.22)"
              strokeWidth="1.5"
              strokeDasharray={l.dashed ? "3 4" : undefined}
            />
          ))}
        </g>

        {/* System connections — clean spokes to the hub */}
        <g style={{ opacity: mode === "system" ? 1 : 0, transition: "opacity 0.4s" }}>
          {SYSTEM_NODES.map((n) => (
            <line key={n.id} x1={HUB.cx} y1={HUB.cy} x2={n.cx} y2={n.cy} stroke="var(--color-sky)" strokeWidth="1.5" />
          ))}
        </g>

        {/* Hub — only present in system mode */}
        <motion.circle
          cx={HUB.cx}
          cy={HUB.cy}
          r={8}
          fill="var(--color-sky)"
          animate={{ opacity: mode === "system" ? 1 : 0, scale: mode === "system" ? 1 : 0.4 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
        {mode === "system" && !reduce && (
          <motion.circle
            cx={HUB.cx}
            cy={HUB.cy}
            r={8}
            fill="none"
            stroke="var(--color-skybright)"
            strokeWidth="2"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* The five nodes — morph between scattered and hub-arranged */}
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            animate={{ cx: n.cx, cy: n.cy }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
            r={6}
            fill="var(--color-surface)"
            stroke={mode === "system" ? "var(--color-sky)" : "rgba(10,15,20,0.3)"}
            strokeWidth="2"
          />
        ))}
      </svg>

      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 text-sm text-slate"
        >
          {mode === "system"
            ? "One infrastructure. Built once, wired to scale."
            : "Disconnected tools. Manual handoffs. Something always breaks."}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// The client-context chips drop in from above and bounce into place, one
// after another, in an endless wave — a calm cascade, not a jiggling grid.
function ContextGrid() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const active = inView && !reduce;

  return (
    <div ref={ref} className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {contexts.map(({ label, icon: Icon }, i) => (
        <motion.div
          key={label}
          className="group flex items-center gap-2.5 rounded-xl border border-ink/10 bg-surface2/60 px-3 py-2.5 transition-colors duration-300 hover:border-sky/40 hover:bg-surface hover:shadow-[0_10px_24px_-16px_rgba(8,18,26,0.35)]"
          animate={
            active
              ? { y: [-18, 2, -7, 1, -3, 0], opacity: [0, 1, 1, 1, 1, 1] }
              : { y: 0, opacity: 1 }
          }
          transition={
            active
              ? {
                  duration: CHIP_BOUNCE_DURATION,
                  times: [0, 0.35, 0.55, 0.72, 0.86, 1],
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: CHIP_CYCLE - CHIP_BOUNCE_DURATION,
                  delay: i * CHIP_STAGGER,
                }
              : { duration: 0 }
          }
          whileHover={{ y: -3 }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-skysoft text-sky transition-colors duration-300 group-hover:bg-sky group-hover:text-white">
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm text-slate transition-colors duration-300 group-hover:text-ink">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper py-20 sm:py-28">
      <div className="relative z-20 mx-auto grid max-w-6xl min-w-0 gap-12 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Intro */}
        <div className="min-w-0">
          <p className="eyebrow text-sky">Why Repeatless</p>
          <h2
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Built to deliver, not to dazzle.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
            The proof, the tooling, and the team standing behind both.
          </p>
          <a
            href="/casestudies"
            className="group mt-7 inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
          >
            See the results
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* 4 — The stack, always moving, in its own colors */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : 0.18 }}
            className="mt-8 min-w-0 rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)]"
          >
            <p className="eyebrow text-slate2">The stack we build with</p>
            <div
              className="relative mt-5 h-32 overflow-hidden sm:h-36"
              style={{
                maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              }}
            >
              <motion.div
                animate={reduce ? undefined : { x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="flex h-full w-max items-center gap-10"
              >
                {[...tools, ...tools].map((tool, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${tool.name}-${i}`}
                    src={tool.icon}
                    alt={tool.name}
                    title={tool.name}
                    className="h-11 w-11 shrink-0 opacity-75 grayscale-0 transition-all duration-300 hover:scale-110 hover:opacity-100 sm:h-12 sm:w-12"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* 5 — Where it already runs, scanning like a live status board */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : 0.24 }}
            className="mt-6 rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)]"
          >
            <p className="eyebrow text-slate2">Where our automations already run</p>
            <ContextGrid />
          </motion.div>
        </div>

        {/* Reason cards — bento: proof spans full width, tooling and team sit side by side */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* 1 — Proven results, counting up live */}
          <motion.article
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] sm:col-span-2 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-skysoft text-skydeep">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">Proven results</h3>
            </div>
            <p className="mt-4 text-slate">Real numbers from real builds — not projections.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-skysoft px-5 py-5 sm:col-span-2">
                <div className="font-display text-4xl font-semibold text-skydeep sm:text-[2.75rem]">
                  <StatNumber {...heroResult} />
                </div>
                <div className="mt-1 text-sm font-medium text-skydeep/80">{heroResult.label}</div>
              </div>
              {supportingResults.map((r) => (
                <div key={r.label} className="rounded-2xl bg-surface2 px-4 py-4 text-center">
                  <div className="font-display text-2xl font-semibold text-ink">
                    <StatNumber {...r} />
                  </div>
                  <div className="mt-1 text-xs leading-tight text-slate2">{r.label}</div>
                </div>
              ))}
            </div>
          </motion.article>

          {/* 2 — One system, not a patchwork; built to scale, for B2B and D2C alike */}
          <motion.article
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : 0.06 }}
            className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-skysoft text-sky">
                <Network className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">One system. Not a patchwork.</h3>
            </div>
            <p className="mt-4 text-slate">Built for B2B and D2C teams who refuse to repeat themselves.</p>
            <SystemDiagram />
          </motion.article>

          {/* 3 — Dedicated, senior-led team, shown not told */}
          <motion.article
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : 0.12 }}
            className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-skysoft text-sky">
                <Users className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">A dedicated team, senior-led</h3>
            </div>
            <p className="mt-4 text-slate">No offshore queue. No hand-offs.</p>
            <TeamChatDemo />
            <div className="mt-4 flex flex-wrap gap-2.5">
              {teamTraits.map((trait) => (
                <span key={trait} className="rounded-full bg-surface2 px-3.5 py-1.5 text-sm font-medium text-ink">
                  {trait}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
