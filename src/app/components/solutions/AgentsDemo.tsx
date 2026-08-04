"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DemoWindow, useStageCycle } from "./frames";

/**
 * Lanes on a shared timeline rather than a list of agents. A stacked list can
 * only ever say "these four things happened"; overlapping bars say "these four
 * ran at once and handed off", which is the only thing that distinguishes a
 * multi-agent system from a single agent doing chores in order.
 *
 * Deliberately not a node graph: the hero already runs one and the "One system"
 * card is a hub and spoke, so a third flow diagram would just repeat the site.
 */

// Spans as fractions of the run. Researcher and Writer overlap on purpose — that
// overlap is the whole argument, so it has to be wide enough to actually see.
const LANES = [
  { name: "Planner", start: 0, end: 0.2, task: "split the goal into 4 tasks" },
  { name: "Researcher", start: 0.16, end: 0.58, task: "order history · 3 sources merged" },
  { name: "Writer", start: 0.44, end: 0.86, task: "drafting proposal v2" },
  { name: "Reviewer", start: 0.8, end: 1, task: "pricing and terms checked" },
];

const DURATIONS = [1800, 1700, 1700, 1700, 3600];
const PLAYHEAD = [0.22, 0.5, 0.72, 0.92, 1];

// Kept under ~40 characters: the log block is 274px wide at mobile, and longer
// lines truncated, which hid the one line that states the parallelism.
const LOG_LINES = [
  "› goal: renewal proposal · Acme Co",
  "› 4 tasks delegated · 2 in parallel",
  "› research merged into draft",
];

const LABEL_W = 82;

export default function AgentsDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce, 4);
  const head = PLAYHEAD[stage];

  return (
    <DemoWindow title="agents · one goal, four hands" dark>
      <div className="p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-monoui text-[10px] uppercase tracking-wide text-white/40">
            Run timeline
          </span>
          <span className="font-monoui text-[10px] text-skybright/80">2 running in parallel</span>
        </div>

        <div className="relative">
          {/* Playhead. The element spans the full track and is shifted by a
              percentage of its own width, so "now" moves on a transform instead
              of an animated left offset. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 overflow-hidden" style={{ left: LABEL_W }}>
            <motion.div
              className="absolute inset-y-0 left-0 w-full border-l border-dashed border-skybright/45"
              initial={false}
              animate={{ x: `${head * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.7, ease: "linear" }}
            />
          </div>

          <div className="flex flex-col gap-3">
            {LANES.map((lane) => {
              const span = lane.end - lane.start;
              const progress = Math.max(0, Math.min(1, (head - lane.start) / span));
              const state = head < lane.start ? "pending" : head < lane.end ? "working" : "done";
              return (
                <div key={lane.name} className="flex items-start gap-2">
                  <span
                    className={`shrink-0 truncate pt-px text-[11.5px] font-medium leading-none ${
                      state === "pending" ? "text-white/30" : "text-white"
                    }`}
                    style={{ width: LABEL_W }}
                  >
                    {lane.name}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.07]">
                      <motion.div
                        className="absolute inset-y-0 origin-left rounded-full"
                        style={{
                          left: `${lane.start * 100}%`,
                          width: `${span * 100}%`,
                          background: state === "done" ? "var(--color-sky)" : "var(--color-skybright)",
                        }}
                        initial={false}
                        animate={{ scaleX: progress }}
                        transition={{ duration: reduce ? 0 : 0.7, ease: "linear" }}
                      />
                    </div>
                    <p
                      className={`mt-1.5 truncate text-[9.5px] leading-none ${
                        state === "working"
                          ? "text-skybright"
                          : state === "done"
                            ? "text-white/45"
                            : "text-white/25"
                      }`}
                    >
                      {state === "pending" ? "queued" : lane.task}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 px-3.5 py-3 font-monoui text-[10.5px] leading-relaxed text-white/45">
          {LOG_LINES.slice(0, Math.min(3, stage + 1)).map((l) => (
            <p key={l} className="truncate">
              {l}
            </p>
          ))}
          <AnimatePresence>
            {stage >= 4 && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="truncate text-skybright"
              >
                › proposal ready for review ✓
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoWindow>
  );
}
