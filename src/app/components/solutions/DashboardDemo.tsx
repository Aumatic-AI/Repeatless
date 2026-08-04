"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DemoWindow } from "./frames";

/**
 * Stacked weeks instead of one rising line.
 *
 * The panel is titled "manual work replaced", and a single line going up cannot
 * show replacement — it only shows growth. Two opposing series can: automated
 * rising as manual falls, in the same column, week over week. That is the claim,
 * drawn.
 *
 * The chart also has to move. Previously the counters ticked to claim live data
 * while the chart was frozen after one whileInView draw, so the panel argued with
 * itself. Now the newest week grows on the same tick the counters do.
 */

// Share of each week's work handled without a person. Deterministic so server and
// client agree; only the newest week moves once mounted.
const WEEKS = [0.16, 0.24, 0.31, 0.42, 0.53, 0.63, 0.74, 0.82];
const TICK_MS = 1000;
const TICKS_PER_UPDATE = 5;

export default function DashboardDemo() {
  const reduce = !!useReducedMotion();
  const [tasks, setTasks] = useState(3412);
  const [leads, setLeads] = useState(214);
  const [hours, setHours] = useState(128);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [growth, setGrowth] = useState(0);

  // A ref, not a dep. Keying the interval on the tick counter tore it down and
  // rebuilt it on every single tick, which made the cadence drift.
  const round = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setSecondsAgo((s) => {
        if (s < TICKS_PER_UPDATE - 1) return s + 1;
        const i = round.current++;
        setTasks((v) => v + [3, 2, 4, 1, 3, 2][i % 6]);
        setLeads((v) => v + [1, 0, 1, 1, 0, 1][i % 6]);
        setHours((v) => v + (i % 3 === 0 ? 1 : 0));
        // Creeps toward, but never past, fully automated.
        setGrowth((g) => Math.min(0.11, g + 0.012));
        return 0;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const weeks = WEEKS.map((w, i) => (i === WEEKS.length - 1 ? Math.min(0.95, w + growth) : w));

  return (
    <DemoWindow title="ops · live dashboard">
      <div className="p-5">
        {/* One number leads. Three identical tiles gave the eye nowhere to land. */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="col-span-2 rounded-xl bg-skysoft px-4 py-3">
            <motion.p
              key={hours}
              initial={reduce ? false : { opacity: 0.5, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
              className="font-display text-3xl font-semibold tracking-tight text-skydeep tabular-nums"
            >
              {hours}
            </motion.p>
            <p className="mt-0.5 text-[11px] leading-tight text-skydeep/70">
              hours of manual work removed this month
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { v: tasks.toLocaleString(), l: "tasks automated" },
              { v: String(leads), l: "leads captured" },
            ].map((k) => (
              <div key={k.l} className="flex-1 rounded-xl bg-surface2 px-3 py-2">
                <motion.p
                  key={k.v}
                  initial={reduce ? false : { opacity: 0.5, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                  className="font-display text-base font-semibold tabular-nums leading-none text-ink"
                >
                  {k.v}
                </motion.p>
                <p className="mt-0.5 text-[9.5px] leading-none text-slate2">{k.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3.5 rounded-xl border border-ink/10 p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-medium text-ink">Manual work replaced</p>
            <p className="text-[10.5px] text-slate2">last 8 weeks</p>
          </div>

          <div className="mt-3 flex h-[104px] items-end gap-1.5">
            {weeks.map((share, i) => (
              <div key={i} className="flex h-full flex-1 flex-col justify-end overflow-hidden rounded-md bg-ink/10">
                {/* Grows from the bottom on a transform, so the bar animating every
                    few seconds never triggers layout. */}
                <motion.div
                  className="w-full origin-bottom rounded-md bg-sky"
                  style={{ height: "100%" }}
                  initial={false}
                  animate={{ scaleY: share }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[9.5px] text-slate2">
                <span className="h-2 w-2 rounded-sm bg-sky" /> automated
              </span>
              {/* Same token as the bar track — a legend swatch that does not match
                  the series it labels is just wrong. */}
              <span className="flex items-center gap-1.5 text-[9.5px] text-slate2">
                <span className="h-2 w-2 rounded-sm bg-ink/10" /> still manual
              </span>
            </div>
            <span className="font-monoui text-[9.5px] tabular-nums text-ink/40">
              {Math.round(weeks[weeks.length - 1] * 100)}% this week
            </span>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-center gap-1.5">
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-60" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
          </span>
          <span className="eyebrow text-slate2">
            {secondsAgo === 0 ? "updated just now" : `updated ${secondsAgo}s ago`}
          </span>
        </div>
      </div>
    </DemoWindow>
  );
}
