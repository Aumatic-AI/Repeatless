"use client";

import { useCallback, useEffect, useState } from "react";
import Hero from "../Hero";
import HeroIntro from "./HeroIntro";
import { hasSeenIntro, markIntroSeen } from "./introSeen";

const MIN_INTRO_DURATION = 1000;

export default function HeroGate() {
  const [introComplete, setIntroComplete] = useState(() =>
    hasSeenIntro()
  );

  const [pageReady, setPageReady] = useState(false);
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  // Detect when the browser has finished the initial page load.
  useEffect(() => {
    if (hasSeenIntro()) {
      setPageReady(true);
      setMinimumTimePassed(true);
      return;
    }

    if (document.readyState === "complete") {
      setPageReady(true);
    } else {
      const handleLoad = () => {
        setPageReady(true);
      };

      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  // Keep the intro visible for at least 3 seconds.
  useEffect(() => {
    if (hasSeenIntro()) return;

    const timer = window.setTimeout(() => {
      setMinimumTimePassed(true);
    }, MIN_INTRO_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // The intro can finish only when both conditions are met.
  const canFinishIntro =
    pageReady && minimumTimePassed;

  const handleIntroComplete = useCallback(() => {
    if (!canFinishIntro) return;

    markIntroSeen();
    setIntroComplete(true);
  }, [canFinishIntro]);

  // Tell HeroIntro that the page is ready and the minimum
  // intro duration has passed.
  useEffect(() => {
    if (!canFinishIntro || introComplete) return;

    window.dispatchEvent(
      new CustomEvent("hero-intro-ready")
    );
  }, [canFinishIntro, introComplete]);

  // Prevent scrolling while the intro is visible.
  useEffect(() => {
    if (introComplete) return;

    const originalBodyOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalBodyOverflow;
    };
  }, [introComplete]);

  return (
    <>
      {/* Hero mounts immediately behind the intro. */}
      <Hero introComplete={introComplete} />

      {/* Intro sits above the Hero while the page loads. */}
      {!introComplete && (
        <HeroIntro
          onComplete={handleIntroComplete}
          canFinish={canFinishIntro}
        />
      )}
    </>
  );
}