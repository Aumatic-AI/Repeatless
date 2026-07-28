"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiFileText, FiInstagram, FiLinkedin, FiCheck, FiClock } from "react-icons/fi";
import { DemoWindow, useStageCycle } from "./frames";

type Status = "published" | "scheduled" | "generating";

const ROW1 = { icon: FiFileText, title: "SEO blog — “AI in retail logistics”", meta: "1,900 words · 4 images" };
const ROW2 = { icon: FiInstagram, title: "Reel — product teaser #14", meta: "auto-captioned · 32s" };
const ROW3 = { icon: FiLinkedin, title: "LinkedIn post — founder note", meta: "drafted from this week’s blog" };
const ROW4 = { icon: FiInstagram, title: "Carousel — 5 slides, client wins", meta: "queued next in the pipeline" };

// Stages: row3 finishes generating → a 4th item enters the queue → it finishes too → hold, loop.
const DURATIONS = [4000, 2500, 4000, 2500, 2200];

function Row({ row, status }: { row: typeof ROW1; status: Status }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-center gap-3 rounded-xl border border-ink/10 bg-surface p-3.5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-skysoft text-skydeep">
        <row.icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-sm font-medium text-ink">{row.title}</p>
        <p className="mt-0.5 text-xs text-slate2">{row.meta}</p>
        {status === "generating" && (
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink/8">
            <motion.div
              className="h-full w-1/3 rounded-full bg-sky"
              animate={{ x: ["-110%", "320%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {status === "published" && (
          <motion.span
            key="published"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-skysoft px-2.5 py-1 text-[11px] font-medium text-skydeep"
          >
            <FiCheck className="h-3 w-3" /> Published
          </motion.span>
        )}
        {status === "scheduled" && (
          <motion.span
            key="scheduled"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1 text-[11px] font-medium text-slate"
          >
            <FiClock className="h-3 w-3" /> 14:00
          </motion.span>
        )}
        {status === "generating" && (
          <motion.span
            key="generating"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="shrink-0 rounded-full bg-sky px-2.5 py-1 text-[11px] font-medium text-white"
          >
            Writing…
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContentDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce);

  const row3Status: Status = stage >= 1 ? "published" : "generating";
  const showRow4 = stage >= 2;
  const row4Status: Status = stage >= 3 ? "published" : "generating";

  return (
    <DemoWindow title="content · publishing queue">
      <div className="flex flex-col gap-3 p-5">
        <Row row={ROW1} status="published" />
        <Row row={ROW2} status="scheduled" />
        <Row row={ROW3} status={row3Status} />
        <AnimatePresence>{showRow4 && <Row key="row4" row={ROW4} status={row4Status} />}</AnimatePresence>

        <p className="pt-1 text-center text-xs text-slate2">
          12 pieces this week — researched, produced and published on schedule.
        </p>
      </div>
    </DemoWindow>
  );
}
