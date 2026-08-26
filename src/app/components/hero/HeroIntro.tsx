"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { introScenes } from "./introScenes";
import HeroIntroLogo from "./HeroIntroLogo";

const DURATIONS = [
  40,
  50,
  65,
  85,
  120,
  160,
  220,
  280,
  350,
  450,
];

type Props = {
  onComplete?: () => void;
};

export default function HeroIntro({ onComplete }: Props) {
  const reduce = useReducedMotion() ?? false;

  const [frame, setFrame] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Guards onComplete so it only ever fires once, and only for the genuine
  // exit-fade completion — not the (possibly no-op) mount-time animation.
  const hasCompletedRef = useRef(false);

  // 5 images × 2 cycles
  const sequence = useMemo(
    () => [...introScenes, ...introScenes],
    []
  );

  const scene = sequence[frame];

  // Image transition duration.
  // Fast at the beginning → progressively slower toward the end.
  const transitionDuration = reduce
    ? 0
    : Math.min((DURATIONS[frame] ?? 300) / 1000, 0.55);

  // Preload all intro images.
  useEffect(() => {
    introScenes.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  // Hide scrollbar during intro.
  useEffect(() => {
    document.documentElement.classList.add(
      "intro-scrollbar-hidden"
    );

    return () => {
      document.documentElement.classList.remove(
        "intro-scrollbar-hidden"
      );
    };
  }, []);

  // Image sequence controller.
  useEffect(() => {
    if (exiting) return;

    // Reduced motion:
    // immediately jump to the final frame.
    if (reduce) {
      setFrame(sequence.length - 1);

      const timer = window.setTimeout(() => {
        setExiting(true);
      }, 400);

      return () => window.clearTimeout(timer);
    }

    // Final frame:
    // hold the final image before fading out.
    if (frame === sequence.length - 1) {
      const timer = window.setTimeout(() => {
        setExiting(true);
      }, 700);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setFrame((current) => current + 1);
    }, DURATIONS[frame] ?? 300);

    return () => window.clearTimeout(timer);
  }, [frame, exiting, reduce, sequence.length]);

  return (
    <motion.div
      // No pointer-events-none here: while the intro is up it must block
      // interaction with whatever is behind it, not let clicks pass through.
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      animate={{
        opacity: exiting ? 0 : 1,
      }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={() => {
        // `animate` above also resolves (trivially) on mount, while
        // `exiting` is still false — ignore that call and only treat the
        // fade-to-0 as done, and only once.
        if (exiting && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
      }}
      aria-hidden="true"
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={frame}
          src={scene.src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{
            opacity: 0,
            scale: reduce ? 1 : 1.025,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            opacity: {
              duration: transitionDuration,
              ease: "linear",
            },
            scale: {
              duration: transitionDuration,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        />
      </AnimatePresence>

      {/* =====================================================
          OVERLAYS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* =====================================================
          PERSISTENT LOGO
          Color changes SNAP instantly between scenes.
      ===================================================== */}

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: exiting ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <HeroIntroLogo
          color={scene.logoColor}
          outline={scene.logoOutline}
        />
      </motion.div>
    </motion.div>
  );
}