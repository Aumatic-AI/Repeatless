"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiCornerUpLeft } from "react-icons/fi";
import { DemoWindow, useStageCycle } from "./frames";

/**
 * A pipeline board, not a list of steps. The copy promises "pipeline that fills",
 * and a board with deals crossing columns is the one artifact of outreach working
 * that reads without being read. The movement is the product: a deal physically
 * advances Contacted → Replied → Booked while the pipeline total climbs.
 */

const COLUMNS = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "replied", label: "Replied" },
  { key: "booked", label: "Booked" },
] as const;

type ColumnKey = (typeof COLUMNS)[number]["key"];

// The board holds still apart from one deal, so the eye has a fixed frame to read
// the movement against. Everything moving at once would read as noise.
//
// Single-word accounts on purpose. Four columns at mobile width leave roughly
// 59px of text per card, and two-word names truncated on every single card, which
// reads as a broken layout rather than as a board. Shortened account names are
// what a real CRM card shows anyway.
const RESTING_DEALS: { id: string; name: string; value: string; col: ColumnKey }[] = [
  { id: "vertex", name: "Vertex", value: "$12k", col: "new" },
  { id: "halden", name: "Halden", value: "$8k", col: "new" },
  { id: "arca", name: "Arca", value: "$31k", col: "contacted" },
  { id: "pinemark", name: "Pinemark", value: "$9k", col: "contacted" },
  { id: "corveau", name: "Corveau", value: "$18k", col: "replied" },
  { id: "sable", name: "Sable", value: "$27k", col: "booked" },
];

// It is the card the eye follows, so it is the one name that must never truncate.
const MOVER = { id: "northwind", name: "Northwind", value: "$24k" };

// Stages: sitting in Contacted → reply lands → held in Replied → books → hold, loop.
const DURATIONS = [2600, 1600, 2000, 3600];
const MOVER_COLUMN: ColumnKey[] = ["contacted", "replied", "replied", "booked"];
const PIPELINE_TOTAL = ["$105k", "$105k", "$105k", "$129k"];

function DealCard({
  id,
  name,
  value,
  highlight,
  reduce,
}: {
  id: string;
  name: string;
  value: string;
  highlight?: boolean;
  reduce: boolean;
}) {
  return (
    <motion.div
      layout={!reduce}
      layoutId={reduce ? undefined : id}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`rounded-lg border px-2 py-1.5 ${
        highlight ? "border-sky/50 bg-skysoft" : "border-ink/10 bg-surface"
      }`}
    >
      <p className="truncate text-[10.5px] font-medium leading-tight text-ink">{name}</p>
      <p className={`mt-0.5 text-[9.5px] leading-none ${highlight ? "text-skydeep" : "text-slate2"}`}>
        {value}
      </p>
    </motion.div>
  );
}

export default function LeadGenDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce, 3);
  const moverCol = MOVER_COLUMN[stage];

  return (
    <DemoWindow title="pipeline · outreach running">
      <div className="p-4">
        {/* Three columns on narrow screens. Four at 342px wide leaves 41px per
            card name, which truncated every card and read as a broken board
            rather than a pipeline. "New" is the stage the story needs least — the
            deal being followed starts in Contacted. */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {COLUMNS.map((col) => {
            const resting = RESTING_DEALS.filter((d) => d.col === col.key);
            const count = resting.length + (moverCol === col.key ? 1 : 0);
            return (
              <div
                key={col.key}
                className={`min-w-0 ${col.key === "new" ? "hidden sm:block" : ""}`}
              >
                {/* Count sits beside its own label, not pushed to the column's
                    right edge, where it read as belonging to the next column. */}
                <div className="mb-1.5 flex items-baseline gap-1.5">
                  <span className="truncate font-monoui text-[9.5px] uppercase tracking-wide text-slate2">
                    {col.label}
                  </span>
                  <span className="font-monoui text-[9.5px] tabular-nums text-ink/40">{count}</span>
                </div>
                {/* Reserved so the columns never resize as the deal crosses. */}
                <div className="flex min-h-[124px] flex-col gap-1.5 rounded-lg bg-surface2/70 p-1.5">
                  {resting.map((d) => (
                    <DealCard key={d.id} {...d} reduce={reduce} />
                  ))}
                  {moverCol === col.key && (
                    <DealCard {...MOVER} highlight reduce={reduce} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* What arrived, and what it did. The reply is why the deal moved. */}
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-ink/10 bg-surface p-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-skysoft text-skydeep">
            {stage >= 3 ? <FiCheck className="h-3.5 w-3.5" /> : <FiCornerUpLeft className="h-3.5 w-3.5" />}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <motion.p
              key={stage >= 3 ? "booked" : "replied"}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
              className="truncate text-[12.5px] font-medium text-ink"
            >
              {stage >= 3
                ? "Thursday 3pm confirmed · invite sent"
                : "Michael T. · CFO, Northwind"}
            </motion.p>
            <p className="mt-0.5 truncate text-[11px] text-slate2">
              {stage >= 3 ? "sequence stopped automatically" : "“Yes, Thursday works. Send an invite.”"}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-monoui text-[10px] uppercase tracking-wide text-slate2">
            Pipeline this week
          </span>
          <motion.span
            key={PIPELINE_TOTAL[stage]}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
            className="font-display text-lg font-semibold tabular-nums text-skydeep"
          >
            {PIPELINE_TOTAL[stage]}
          </motion.span>
        </div>
      </div>
    </DemoWindow>
  );
}
