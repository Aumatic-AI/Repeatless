"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiCheck, FiPhoneCall } from "react-icons/fi";
import { DemoPhone, useStageCycle } from "./frames";

/**
 * A conversation reaching an outcome, not a call-control screen.
 *
 * The previous version showed one call with mute, speaker and hang-up buttons,
 * which implied a person sitting on the line operating it — the opposite of
 * "thousands of conversations, no call center". Those controls are gone. What is
 * left is the part that is actually hard: the agent holding a real back-and-forth
 * and landing a booking, with a concurrency count carrying the volume claim.
 */

type Turn = { who: "agent" | "caller"; text: string };

const CALLS: { contact: string; direction: string; turns: Turn[]; outcome: string }[] = [
  {
    contact: "Priya Menon",
    direction: "Outbound · service reminder",
    turns: [
      { who: "agent", text: "Hi Priya, calling about your service visit on Tuesday." },
      { who: "caller", text: "Can we push it to Thursday?" },
      { who: "agent", text: "Thursday at 3 is free. Moved it and sent a confirmation." },
    ],
    // Kept under ~34 characters; the chip is 208px wide at 10.5px and longer
    // strings truncated mid-word.
    outcome: "Rescheduled · Thu 3:00 PM",
  },
  {
    contact: "Daniel Whitcombe",
    direction: "Inbound · new enquiry",
    turns: [
      { who: "caller", text: "Do you cover the Leeds area for installs?" },
      { who: "agent", text: "We do. I can hold a slot for next Wednesday morning." },
      { who: "caller", text: "That works, book it." },
    ],
    outcome: "Booked · Wed 9:30 AM · synced",
  },
];

// One flat list of frames instead of two nested cycles, so the visible turn count
// and the clock can never disagree. The clock is per frame, which is also what
// stops it running away — the old version incremented from 163s forever and
// carried the same total across three different calls.
const FRAMES: { call: number; turns: number; clock: string; done?: boolean }[] = [
  { call: 0, turns: 1, clock: "0:04" },
  { call: 0, turns: 2, clock: "0:09" },
  { call: 0, turns: 3, clock: "0:16" },
  { call: 0, turns: 3, clock: "0:21", done: true },
  { call: 1, turns: 1, clock: "0:03" },
  { call: 1, turns: 2, clock: "0:11" },
  { call: 1, turns: 3, clock: "0:15" },
  { call: 1, turns: 3, clock: "0:19", done: true },
];
// Opening turn is held briefly — it is the emptiest frame, so it should not linger.
const DURATIONS = [1500, 2100, 2400, 2600, 1500, 2100, 2400, 2600];

// 11 bars, not 21. It only runs while the agent is the one talking, so the motion
// means "this side has the floor" rather than decorating the panel.
const BARS = Array.from({ length: 11 }, (_, i) => 7 + ((i * 37) % 17));

function Waveform({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <div className="flex h-4 items-center gap-[3px]" aria-hidden>
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className={`w-[2.5px] rounded-full ${active ? "bg-skybright" : "bg-white/12"}`}
          style={{ height: 3 }}
          animate={active && !reduce ? { height: [5, h, 5] } : { height: 3 }}
          transition={
            active && !reduce
              ? { duration: 0.8 + (i % 4) * 0.12, repeat: Infinity, delay: (i % 5) * 0.08, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

export default function VoiceDemo() {
  const reduce = !!useReducedMotion();
  const frameIndex = useStageCycle(DURATIONS, reduce, 3);
  const frame = FRAMES[frameIndex];
  const call = CALLS[frame.call];
  const visible = call.turns.slice(0, frame.turns);
  const agentHasFloor = !frame.done && visible[visible.length - 1]?.who === "agent";

  // statusBg matches the top of the gradient so the screen has no seam.
  return (
    <DemoPhone statusBg="#0E1720">
      {/* Sized so a full three-turn thread nearly fills the screen. Any taller and
          the opening turn of each call sits above a large void. */}
      <div className="flex h-[372px] flex-col bg-gradient-to-b from-[#0E1720] to-[#0A0F14] px-4 pb-7 pt-4 text-white">
        {/* Concurrency is the volume claim, so it sits in the chrome where a real
            console would put it. */}
        <div className="flex items-center justify-between">
          <p className="eyebrow text-white/40">AI voice agent</p>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 font-monoui text-[9.5px] text-skybright">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skybright opacity-60" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-skybright" />
            </span>
            14 live
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky">
            <FiPhoneCall className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <AnimatePresence mode="wait">
              <motion.p
                key={call.contact}
                initial={reduce ? false : { opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
                className="truncate text-[13.5px] font-medium"
              >
                {call.contact}
              </motion.p>
            </AnimatePresence>
            <p className="mt-0.5 truncate text-[10px] text-white/45">{call.direction}</p>
          </div>
          <span className="shrink-0 font-monoui text-[10.5px] tabular-nums text-white/45">
            {frame.clock}
          </span>
        </div>

        <div className="mt-3">
          <Waveform active={agentHasFloor} reduce={reduce} />
        </div>

        {/* Fills downward from the top, the way a transcript actually reads, with
            the slack collecting above the pinned outcome slot. Anchoring to the
            bottom instead pushed 180px of void between the header and the first
            turn. */}
        <div className="mt-3 flex flex-1 flex-col justify-start gap-1.5 overflow-hidden">
          <AnimatePresence initial={false}>
            {visible.map((t, i) => (
              <motion.div
                key={`${frame.call}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${
                  t.who === "agent"
                    ? "self-start rounded-tl-sm bg-sky text-white"
                    : "self-end rounded-tr-sm bg-white/10 text-white/85"
                }`}
              >
                {t.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Outcome reserves its slot, so the thread does not jump when it lands. */}
        <div className="mt-3 flex h-9 items-center">
          <AnimatePresence>
            {frame.done && (
              <motion.div
                key={`${frame.call}-outcome`}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
                className="flex w-full items-center gap-2 rounded-xl bg-skybright/15 px-3 py-2"
              >
                <FiCheck className="h-3.5 w-3.5 shrink-0 text-skybright" />
                <span className="truncate text-[10.5px] font-medium text-skybright">
                  {call.outcome}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoPhone>
  );
}
