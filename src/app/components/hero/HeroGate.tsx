"use client";

import { useCallback, useEffect, useState } from "react";
import Hero from "../Hero";
import HeroIntro from "./HeroIntro";
import { hasSeenIntro, markIntroSeen } from "./introSeen";

// Hero is not mounted until HeroIntro finishes, so its entrance animations
// (initial/animate) start fresh at the right moment instead of playing out
// hidden underneath the intro.
//
// The intro is a loading screen for an actual page load, not a splash that
// replays every time this route is visited. It should play on a genuine
// first load or hard reload, but not when a client-side navigation (e.g. a
// <Link> back from /casestudies) simply remounts this component. The lazy
// initializer reads `hasSeenIntro()` at mount time: false on a real
// load/reload (the module has just re-evaluated from scratch), still true
// if this is a same-session remount after the intro already played once.
export default function HeroGate() {
  const [introComplete, setIntroComplete] = useState(() => hasSeenIntro());

  const handleIntroComplete = useCallback(() => {
    markIntroSeen();
    setIntroComplete(true);
  }, []);

  // Locked only while the intro is up, and restored to whatever it was
  // before as soon as it completes/unmounts — never a hardcoded "auto".
  useEffect(() => {
    if (introComplete) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [introComplete]);

  return (
    <>
      {!introComplete && <HeroIntro onComplete={handleIntroComplete} />}
      {!introComplete && (
        // Not mounting Hero yet means nothing occupies its slot, so every
        // section below it would sit ~100svh higher in the document than it
        // normally does — right at the top of the (locked, invisible-behind-
        // the-intro) viewport. Any of their whileInView(once: true) reveals
        // would then fire for real while genuinely hidden, and never replay
        // once Hero mounts and pushes them back down. This inert placeholder
        // just reserves Hero's real footprint so nothing below moves.
        <div aria-hidden="true" className="min-h-[100svh] w-full bg-black" />
      )}
      {introComplete && <Hero />}
    </>
  );
}
