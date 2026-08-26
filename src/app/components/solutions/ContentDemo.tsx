"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiFileText, FiPlay, FiLayers, FiLinkedin, FiCheck } from "react-icons/fi";
import { DemoWindow, useStageCycle } from "./frames";

/**
 * A calendar, not a queue. The copy promises work "published on schedule", and a
 * schedule is a thing people recognise on sight. A week grid shows volume,
 * format mix and timing in one glance, where a list of rows showed none of them.
 *
 * Formats are told apart by icon and chip height rather than by colour: the site
 * runs a single sky accent, and four hues would break that. Taller chips are
 * longer pieces, the way duration reads as height on a real calendar.
 */

type Format = "blog" | "reel" | "carousel" | "linkedin";

const FORMATS: Record<Format, { icon: typeof FiFileText; label: string; tall: boolean; tinted: boolean }> = {
  blog: { icon: FiFileText, label: "Blog", tall: true, tinted: false },
  reel: { icon: FiPlay, label: "Reel", tall: false, tinted: true },
  carousel: { icon: FiLayers, label: "Carousel", tall: false, tinted: true },
  linkedin: { icon: FiLinkedin, label: "Post", tall: false, tinted: false },
};

type Piece = { id: string; day: number; format: Format };

// Mon–Fri keeps each column wide enough to label a chip. Seven columns at this
// width would leave 62px and force every chip down to an unlabelled square.
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TODAY = 2;

// A full week on purpose. A sparse grid reads as an empty calendar, which argues
// against the volume the copy claims.
const PLACED: Piece[] = [
  { id: "p1", day: 0, format: "blog" },
  { id: "p2", day: 0, format: "linkedin" },
  { id: "p3", day: 1, format: "reel" },
  { id: "p4", day: 1, format: "carousel" },
  { id: "p5", day: 1, format: "linkedin" },
  { id: "p6", day: 2, format: "blog" },
  { id: "p7", day: 2, format: "reel" },
  { id: "p8", day: 3, format: "reel" },
  { id: "p9", day: 3, format: "carousel" },
  { id: "p10", day: 4, format: "blog" },
  { id: "p11", day: 4, format: "linkedin" },
];

// Stages: the week as it stands → a reel lands on Thu → a carousel lands on Fri →
// Wed's blog goes live → hold, loop.
const DURATIONS = [2600, 2000, 2000, 2600, 3200];
const ARRIVALS: Piece[] = [
  { id: "p12", day: 3, format: "linkedin" },
  { id: "p13", day: 4, format: "blog" },
];

function Chip({ piece, live, reduce }: { piece: Piece; live: boolean; reduce: boolean }) {
  const f = FORMATS[piece.format];
  return (
    <motion.div
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`relative flex flex-col justify-between rounded-lg border px-1.5 py-1 ${
        f.tall ? "h-[42px]" : "h-[30px]"
      } ${
        live
          ? "border-sky/50 bg-skysoft"
          : f.tinted
            ? "border-sky/20 bg-skysoft/50"
            : "border-ink/10 bg-surface2"
      }`}
    >
      {/* Five day columns leave 17px of text at mobile, so the label drops and the
          icon carries the format on its own — which is what the legend decodes.
          Chip height still separates a long piece from a short one. */}
      <div className="flex items-center justify-center gap-1 sm:justify-start">
        <f.icon className={`h-2.5 w-2.5 shrink-0 ${live ? "text-skydeep" : "text-slate2"}`} />
        <span
          className={`hidden truncate text-[9px] font-medium leading-none sm:inline ${
            live ? "text-skydeep" : "text-slate"
          }`}
        >
          {f.label}
        </span>
      </div>
      {live && (
        <span className="flex items-center justify-center gap-0.5 text-[8.5px] font-medium leading-none text-skydeep sm:justify-start">
          <FiCheck className="h-2 w-2 shrink-0" />
          <span className="hidden sm:inline">live</span>
        </span>
      )}
    </motion.div>
  );
}

export default function ContentDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce, 4);

  const pieces = [...PLACED, ...ARRIVALS.slice(0, Math.max(0, Math.min(2, stage - 1)))];
  const livePieceId = stage >= 3 ? "p6" : null;

  return (
    <DemoWindow title="content · this week">
      <div className="p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-monoui text-[10px] uppercase tracking-wide text-slate2">
            Week of 27 Jul
          </span>
          <motion.span
            key={pieces.length}
            initial={reduce ? false : { opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
            className="font-monoui text-[10px] tabular-nums text-ink/45"
          >
            {pieces.length} scheduled
          </motion.span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {DAYS.map((day, i) => (
            <div key={day} className="min-w-0">
              <div
                className={`mb-1.5 flex items-center justify-center rounded-md py-0.5 text-[9.5px] font-medium ${
                  i === TODAY ? "bg-ink text-white" : "text-slate2"
                }`}
              >
                {day}
              </div>
              {/* Reserved to the fullest day so columns never resize as pieces
                  land, and no taller than that or the week reads as empty. */}
              <div className="flex min-h-[140px] flex-col gap-1.5 rounded-lg bg-surface2/60 p-1.5">
                <AnimatePresence initial={false}>
                  {pieces
                    .filter((p) => p.day === i)
                    .map((p) => (
                      <Chip key={p.id} piece={p} live={p.id === livePieceId} reduce={reduce} />
                    ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Legend, because format is carried by icon rather than colour. */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 border-t border-ink/10 pt-3">
          {(Object.keys(FORMATS) as Format[]).map((key) => {
            const f = FORMATS[key];
            return (
              <span key={key} className="flex items-center gap-1 text-[10px] text-slate2">
                <f.icon className="h-2.5 w-2.5 shrink-0" />
                {f.label}
              </span>
            );
          })}
          <span className="ml-auto font-monoui text-[10px] text-ink/40">researched · produced · posted</span>
        </div>
      </div>
    </DemoWindow>
  );
}
