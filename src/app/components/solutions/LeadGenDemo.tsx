"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiClock, FiMail, FiLinkedin, FiRepeat } from "react-icons/fi";
import { DemoWindow, useStageCycle } from "./frames";

type StepState = "done" | "working" | "pending";

// Stages: intro + LinkedIn already done → follow-up activates → reply arrives, meeting booked → hold, loop.
const DURATIONS = [3000, 2200, 1500, 3500];

function StepIcon({ state, icon: Icon }: { state: StepState; icon: typeof FiMail }) {
  return (
    <span
      className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
        state === "pending" ? "border border-ink/15 text-slate2" : "bg-skysoft text-skydeep"
      }`}
    >
      {state === "working" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky/40" />
      )}
      <Icon className="relative h-3.5 w-3.5" />
    </span>
  );
}

export default function LeadGenDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce, 3);

  const followUpState: StepState = stage === 0 ? "pending" : stage === 1 ? "working" : "done";
  const steps = [
    { icon: FiMail, label: "Intro email", detail: "412 sent · 38% opened", state: "done" as StepState },
    { icon: FiLinkedin, label: "LinkedIn touch", detail: "day 3 · profile view + note", state: "done" as StepState },
    { icon: FiRepeat, label: "Follow-up", detail: stage <= 1 ? "day 5 · only if no reply" : "sent · reply came in first", state: followUpState },
  ];

  return (
    <DemoWindow title="outreach · active sequence">
      <div className="p-5">
        {/* Sequence steps */}
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div key={s.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepIcon state={s.state} icon={s.icon} />
                {i < steps.length - 1 && <span className="w-px flex-1 bg-ink/10" />}
              </div>
              <div className="pb-5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink">{s.label}</p>
                  {s.state === "done" ? (
                    <FiCheck className="h-3.5 w-3.5 text-sky" />
                  ) : s.state === "working" ? (
                    <span className="text-[11px] font-medium text-sky">sending…</span>
                  ) : (
                    <FiClock className="h-3 w-3 text-slate2" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate2">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply detected */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-xl border border-sky/25 bg-skysoft/60 p-3.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky text-[11px] font-semibold text-white">
                  MT
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-medium text-ink">Michael T. · CFO, logistics firm</p>
                  <p className="mt-0.5 truncate text-xs text-slate">&ldquo;Yes — Thursday works. Send an invite.&rdquo;</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky px-2.5 py-1 text-[11px] font-medium text-white">
                  <FiCheck className="h-3 w-3" /> Meeting booked
                </span>
                <span className="text-[11px] text-slate2">sequence stopped automatically</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoWindow>
  );
}
