"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiVideo, FiPhone, FiPlus, FiCamera, FiMic } from "react-icons/fi";
import { DemoPhone, useStageCycle } from "./frames";

// WhatsApp light-mode colors, matched to the real app:
// header #075E54 · canvas #ECE5DD · outgoing bubble #DCF8C6 · brand #25D366 · read ticks #53BDEB

function Ticks() {
  return (
    <svg viewBox="0 0 18 10" className="h-2.5 w-4 shrink-0" fill="none" aria-hidden>
      <path d="M1 5.5 L4 8.5 L9.5 1.5" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5.5 L10 8.5 L15.5 1.5" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pop = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
};

// Stage durations (ms): empty → incoming → typing → reply → document → system event (hold), loop.
const DURATIONS = [500, 1300, 1100, 1300, 1300, 2800];

export default function WhatsAppDemo() {
  const reduce = !!useReducedMotion();
  const stage = useStageCycle(DURATIONS, reduce);

  // Status bar takes the header green; the home bar goes dark because the input
  // bar it floats over is light.
  return (
    <DemoPhone statusBg="#075E54" indicatorTint="dark">
      {/* Header */}
      <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2.5 text-white">
        <FiChevronLeft className="h-4 w-4 shrink-0 text-white/90" />
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[11px] font-semibold">
          R
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-medium">Repeatless Assistant</p>
          <p className="text-[10px] text-white/70">online</p>
        </div>
        <FiVideo className="h-4 w-4 text-white/90" />
        <FiPhone className="ml-2 h-3.5 w-3.5 text-white/90" />
      </div>

      {/* Chat canvas */}
      {/* Trimmed from 360px: the status bar added 30px and the phone has to stay
          inside the 490px stage the carousel reserves. */}
      <div className="flex h-[322px] flex-col gap-1.5 overflow-hidden bg-[#ECE5DD] px-2.5 pt-2.5 text-[12px] leading-snug text-[#111B21]">
        <div className="mx-auto rounded-md bg-[#DCF2FA] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-[#54656F] shadow-sm">
          Today
        </div>

        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              key="incoming"
              variants={pop}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-[80%] self-start rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm"
            >
              Hi! Do you have pricing for bulk orders?
              <span className="ml-2 align-bottom text-[9px] text-[#667781]">10:24</span>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="typing"
              variants={pop}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex w-14 items-center justify-center gap-1 self-start rounded-lg rounded-tl-none bg-white px-2.5 py-2.5 shadow-sm"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#9AA5AC]"
                  animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="reply"
              variants={pop}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-[80%] self-end rounded-lg rounded-tr-none bg-[#DCF8C6] px-2.5 py-1.5 shadow-sm"
            >
              Hey Sarah 👋 Yes, here&apos;s our full catalog with bulk rates.
              <span className="ml-2 inline-flex items-center gap-1 align-bottom text-[9px] text-[#667781]">
                10:24 <Ticks />
              </span>
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="document"
              variants={pop}
              initial="hidden"
              animate="show"
              exit="exit"
              className="max-w-[80%] self-end rounded-lg rounded-tr-none bg-[#DCF8C6] p-1.5 shadow-sm"
            >
              <div className="flex items-center gap-2 rounded-md bg-[#D1F0BC] px-2 py-1.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white">
                  PDF
                </span>
                <div className="leading-tight">
                  <p className="text-[11px] font-medium">Catalog_2026.pdf</p>
                  <p className="text-[9px] text-[#667781]">2 pages · 1.2 MB</p>
                </div>
              </div>
              <span className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-[#667781]">
                10:24 <Ticks />
              </span>
            </motion.div>
          )}

          {stage >= 5 && (
            <motion.div
              key="system"
              variants={pop}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mx-auto mt-1 rounded-md bg-[#FCF4CB] px-2.5 py-1 text-center text-[9.5px] font-medium text-[#71600F] shadow-sm"
            >
              ⚡ Lead qualified · added to CRM · deal #1042
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      {/* Extra bottom padding leaves the home indicator clear space to sit in */}
      <div className="flex items-center gap-1.5 bg-[#F0F2F5] px-2 pb-4 pt-2">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[#8696A0]">
          <FiPlus className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-[11px]">Type a message</span>
          <FiCamera className="h-3.5 w-3.5 shrink-0" />
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
          <FiMic className="h-3.5 w-3.5" />
        </span>
      </div>
    </DemoPhone>
  );
}
