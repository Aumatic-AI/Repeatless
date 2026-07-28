"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiMic, FiMicOff, FiVolume2, FiPhone } from "react-icons/fi";
import { DemoPhone, useStageCycle } from "./frames";

const BAR_COUNT = 21;
// Deterministic pseudo-random heights so SSR and client render identically
const heights = Array.from({ length: BAR_COUNT }, (_, i) => 8 + ((i * 37) % 23));

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Cycles through a small set of real calls this same agent is handling — the
// point isn't the specific quote, it's that the line keeps changing while the
// call clock keeps running, which is what actually reads as "live."
const CALLS = [
  { name: "Riya · Booking Agent", line: "Perfect — you're booked for Tuesday at 3 PM. A confirmation is on its way." },
  { name: "Max · Support Agent", line: "I've refunded that order — you'll see it back in 3 to 5 business days." },
  { name: "Riya · Booking Agent", line: "Thursday works better? Let me move that for you — done, you're all set." },
];
const CALL_DURATIONS = [6200, 6200, 6200];

export default function VoiceDemo() {
  const reduce = !!useReducedMotion();
  const [seconds, setSeconds] = useState(163);
  const callIndex = useStageCycle(CALL_DURATIONS, reduce, 0);
  const call = CALLS[callIndex];

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <DemoPhone>
      <div className="flex h-[470px] flex-col items-center bg-gradient-to-b from-[#0E1720] to-[#0A0F14] px-5 pb-5 pt-8 text-white">
        <p className="eyebrow text-white/40">AI voice agent</p>

        {/* Caller identity */}
        <div className="relative mt-6">
          {!reduce && (
            <motion.span
              className="absolute inset-0 rounded-full border border-skybright/50"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky text-2xl font-semibold">
            <FiMic className="h-8 w-8" />
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={call.name}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 font-display text-xl font-semibold"
          >
            {call.name}
          </motion.p>
        </AnimatePresence>
        <p className="mt-1 text-[12px] text-white/50">
          On call · <span className="tabular-nums">{formatTime(seconds)}</span>
        </p>

        {/* Live waveform */}
        <div className="mt-7 flex h-12 items-center gap-[3px]" aria-hidden>
          {heights.map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-skybright"
              style={{ height: reduce ? h : 6 }}
              animate={reduce ? undefined : { height: [6, h, 6] }}
              transition={{
                duration: 0.9 + (i % 5) * 0.14,
                repeat: Infinity,
                delay: (i % 7) * 0.09,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Transcript */}
        <div className="mt-6 w-full rounded-xl bg-white/5 px-4 py-3 text-center">
          <p className="eyebrow text-white/35">live transcript</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={call.line}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-1.5 text-[12.5px] leading-relaxed text-white/80"
            >
              &ldquo;{call.line}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-auto flex items-center gap-5 pt-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80">
            <FiMicOff className="h-4 w-4" />
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EF4444] text-white">
            <FiPhone className="h-5 w-5 rotate-[135deg]" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80">
            <FiVolume2 className="h-4 w-4" />
          </span>
        </div>
      </div>
    </DemoPhone>
  );
}
