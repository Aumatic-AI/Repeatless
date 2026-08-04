"use client";

import { useEffect, useState } from "react";
import { FiWifi } from "react-icons/fi";

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

/**
 * Device chrome for the phone demos: status bar, camera cutout and home
 * indicator, so the mockups read as a screenshot off a real handset rather than
 * as a rounded rectangle.
 *
 * `statusBg` takes the app's own header colour because on a real phone the app
 * paints up behind the status bar — a neutral strip above the header would give
 * the frame a seam no real screenshot has. The cutout stays black regardless: it
 * is a hole in the display, not a UI surface.
 */
export function DemoPhone({
  children,
  statusBg = "transparent",
  indicatorTint = "light",
}: {
  children: React.ReactNode;
  statusBg?: string;
  indicatorTint?: "light" | "dark";
}) {
  return (
    <div className="w-full max-w-[290px] rounded-[2.6rem] border-[7px] border-ink bg-ink shadow-[0_34px_70px_-30px_rgba(8,18,26,0.55)]">
      <div className="relative overflow-hidden rounded-[2.1rem]">
        <div
          className="relative flex h-[30px] items-center justify-between px-5 text-white"
          style={{ background: statusBg }}
        >
          <span className="font-medium text-[11px] tabular-nums tracking-tight">9:41</span>

          {/* Camera cutout */}
          <span className="absolute left-1/2 top-[7px] h-[17px] w-[58px] -translate-x-1/2 rounded-full bg-black" />

          <span className="flex items-center gap-[5px]">
            {/* Signal, composed from primitives rather than a drawn glyph */}
            <span className="flex items-end gap-[1.5px]">
              {[3, 5, 7, 9].map((h) => (
                <span key={h} className="w-[2.5px] rounded-[1px] bg-white" style={{ height: h }} />
              ))}
            </span>
            <FiWifi className="h-[11px] w-[11px]" strokeWidth={2.5} />
            <span className="flex items-center gap-[1px]">
              <span className="flex h-[10px] w-[19px] items-center rounded-[3px] border border-white/70 p-[1.5px]">
                <span className="h-full w-[70%] rounded-[1.5px] bg-white" />
              </span>
              <span className="h-[4px] w-[1.5px] rounded-r-sm bg-white/70" />
            </span>
          </span>
        </div>

        {children}

        {/* Home indicator floats over the app, the way it does on a real device */}
        <span
          className={`pointer-events-none absolute bottom-[5px] left-1/2 h-[3.5px] w-[94px] -translate-x-1/2 rounded-full ${
            indicatorTint === "dark" ? "bg-ink/30" : "bg-white/50"
          }`}
        />
      </div>
    </div>
  );
}
