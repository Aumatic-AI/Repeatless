"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DemoWindow } from "./frames";

// Weekly trend, plotted in a 300x110 viewBox
const LINE = "M0 92 C 30 88, 45 74, 70 70 S 115 64, 140 52 S 190 46, 215 34 S 270 22, 300 12";

// Small deterministic increments (not random — stays identical on every load,
// only the elapsed-time display genuinely reflects real time passing).
const TASK_TICKS = [3, 2, 4, 1, 3, 2];
const LEAD_TICKS = [1, 0, 1, 0, 0, 1];

export default function DashboardDemo() {
  const reduce = !!useReducedMotion();
  const [tasksAutomated, setTasksAutomated] = useState(3412);
  const [leadsCaptured, setLeadsCaptured] = useState(214);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [tickIndex, setTickIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setSecondsAgo((s) => {
        if (s >= 4) {
          setTasksAutomated((v) => v + TASK_TICKS[tickIndex % TASK_TICKS.length]);
          setLeadsCaptured((v) => v + LEAD_TICKS[tickIndex % LEAD_TICKS.length]);
          setTickIndex((i) => i + 1);
          return 0;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [reduce, tickIndex]);

  const kpis = [
    { value: "128", label: "hours saved / mo" },
    { value: tasksAutomated.toLocaleString(), label: "tasks automated" },
    { value: String(leadsCaptured), label: "leads captured" },
  ];

  return (
    <DemoWindow title="ops · live dashboard">
      <div className="p-5">
        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-2.5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-skysoft px-3 py-3">
              <motion.p
                key={k.value}
                initial={{ opacity: 0.4, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-xl font-semibold tracking-tight text-skydeep tabular-nums sm:text-2xl"
              >
                {k.value}
              </motion.p>
              <p className="mt-0.5 text-[10.5px] leading-tight text-skydeep/70">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Trend chart */}
        <div className="mt-4 rounded-xl border border-ink/10 p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-medium text-ink">Manual work replaced</p>
            <p className="text-[10.5px] text-slate2">last 8 weeks</p>
          </div>
          <svg viewBox="0 0 300 110" className="mt-3 block w-full" aria-hidden>
            {[22, 52, 82].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(10,15,20,0.06)" strokeWidth="1" />
            ))}
            <motion.path
              d={`${LINE} L 300 110 L 0 110 Z`}
              fill="var(--color-skysoft)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduce ? 0 : 0.8, delay: 0.5 }}
            />
            <motion.path
              d={LINE}
              fill="none"
              stroke="var(--color-sky)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduce ? 0 : 1.4, ease: [0.4, 0, 0.2, 1] }}
            />
            <circle cx="300" cy="12" r="4" fill="var(--color-sky)" />
            {!reduce && (
              <motion.circle
                cx="300"
                cy="12"
                r="4"
                fill="none"
                stroke="var(--color-sky)"
                strokeWidth="1.5"
                animate={{ r: [4, 11], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </svg>
        </div>

        {/* Live row */}
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
