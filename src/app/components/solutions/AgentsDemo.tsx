"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { DemoWindow, useStageCycle } from "./frames";

type AgentState = "done" | "working" | "pending";

// Stages: Researcher works while Writer waits → Researcher finishes, Writer starts →
// Writer finishes, proposal ready → hold, loop. Log lines arrive in the same order
// the agents actually finish, so the log never contradicts the status badges.
const DURATIONS = [2500, 2800, 4200];

const LOG_LINES = [
  "› goal received: renewal proposal for Acme Co",
  "› planner → researcher · researcher → writer",
  "› 3 sources merged, pricing table updated",
];

function StatusDot({ state }: { state: AgentState }) {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      {state === "working" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skybright opacity-50" />
      )}
      <span
        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
          state === "working" ? "bg-skybright" : state === "done" ? "bg-white/30" : "bg-white/15"
        }`}
      />
    </span>
  );
}

export default function AgentsDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce, 2);

  const researcherState: AgentState = stage === 0 ? "working" : "done";
  const writerState: AgentState = stage === 0 ? "pending" : stage === 1 ? "working" : "done";

  const agents = [
    { name: "Planner", task: "broke the goal into 4 tasks", state: "done" as AgentState },
    {
      name: "Researcher",
      task: researcherState === "working" ? "pulling order history from the CRM" : "order history pulled · 3 sources merged",
      state: researcherState,
    },
    {
      name: "Writer",
      task: writerState === "pending" ? "waiting on research" : writerState === "working" ? "drafting proposal v2" : "proposal v2 drafted · ready for review",
      state: writerState,
    },
  ];

  return (
    <DemoWindow title="agents · one goal, six hands" dark>
      <div className="flex flex-col gap-2.5 p-5">
        {agents.map((a) => (
          <motion.div
            key={a.name}
            layout
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
          >
            <StatusDot state={a.state} />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-sm font-medium text-white">{a.name}</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={a.task}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-0.5 truncate text-xs text-white/50"
                >
                  {a.task}
                </motion.p>
              </AnimatePresence>
            </div>
            {a.state === "done" && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-medium text-skybright">
                <FiCheck className="h-3 w-3" /> done
              </span>
            )}
          </motion.div>
        ))}

        {/* Run log */}
        <div className="mt-1 rounded-xl border border-white/10 bg-black/30 px-3.5 py-3 font-monoui text-[10.5px] leading-relaxed text-white/45">
          {LOG_LINES.slice(0, stage >= 1 ? 3 : 2).map((l) => (
            <p key={l} className="truncate">
              {l}
            </p>
          ))}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-skybright"
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
