"use client";

import { useEffect, useState } from "react";

/**
 * Shared device frames for the solution demos. Each demo renders inside one
 * of these so the interfaces read as real products, and each demo can later
 * be swapped for the live integration without touching the carousel.
 */

/**
 * Drives a demo through a looping sequence of stages so it reads as an
 * ongoing, live system rather than a one-time reveal — each stage holds for
 * its own duration, then advances, wrapping back to 0. Pass a module-level
 * (stable) durations array. Under reduced motion, freezes on `settleStage`
 * (the fully-resolved state) instead of cycling.
 */
export function useStageCycle(durations: number[], reduce: boolean, settleStage = durations.length - 1) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % durations.length), durations[stage]);
    return () => clearTimeout(t);
  }, [stage, reduce, durations]);

  return reduce ? settleStage : stage;
}

export function DemoWindow({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-lg overflow-hidden rounded-2xl border shadow-[0_34px_70px_-34px_rgba(8,18,26,0.45)] ${
        dark ? "border-white/10 bg-ink" : "border-ink/10 bg-surface"
      }`}
    >
      <div
        className={`flex items-center gap-2 border-b px-4 py-2.5 ${
          dark ? "border-white/10" : "border-ink/10"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/20" : "bg-ink/15"}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/20" : "bg-ink/15"}`} />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-white/20" : "bg-ink/15"}`} />
        <span
          className={`ml-2 truncate font-monoui text-[11px] lowercase tracking-wide ${
            dark ? "text-white/45" : "text-slate2"
          }`}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export function DemoPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[290px] overflow-hidden rounded-[2.2rem] border-[6px] border-ink bg-ink shadow-[0_34px_70px_-30px_rgba(8,18,26,0.55)]">
      <div className="relative overflow-hidden rounded-[1.85rem]">{children}</div>
    </div>
  );
}
