"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  canFinish?: boolean;
};

export default function HeroIntro({
  onComplete,
  canFinish = false,
}: Props) {
  const reduce = useReducedMotion() ?? false;

  const [frame, setFrame] = useState(0);
  const [exiting, setExiting] = useState(false);

  const hasCompletedRef = useRef(false);

  // Play the intro sequence continuously while the page loads.
  const sequence = useMemo(
    () => [...introScenes, ...introScenes],
    []
  );

  const scene = sequence[frame];

  const transitionDuration = reduce
    ? 0
    : Math.min(
        (DURATIONS[frame] ?? 300) / 1000,
        0.55
      );

  // Preload intro images.
  // Image optimization will be handled separately later.
  useEffect(() => {
    introScenes.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  // Hide scrollbar while intro is visible.
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

  // HeroGate dispatches this event once:
  // 1. The page has loaded.
  // 2. At least 3 seconds have passed.
  useEffect(() => {
    const handleReady = () => {
      if (!canFinish || exiting) return;

      setExiting(true);
    };

    window.addEventListener(
      "hero-intro-ready",
      handleReady
    );

    return () => {
      window.removeEventListener(
        "hero-intro-ready",
        handleReady
      );
    };
  }, [canFinish, exiting]);

  // Continue cycling through the intro scenes.
  // The sequence itself no longer determines when the intro ends.
  useEffect(() => {
    if (exiting) return;

    if (reduce) {
      return;
    }

    const timer = window.setTimeout(() => {
      setFrame((current) => {
        if (current >= sequence.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, DURATIONS[frame] ?? 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    frame,
    exiting,
    reduce,
    sequence.length,
  ]);

  return (
    <motion.div
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
        if (
          exiting &&
          !hasCompletedRef.current
        ) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
      }}
      aria-hidden="true"
    >
      {/* IMAGE */}

      <AnimatePresence
        initial={false}
        mode="sync"
      >
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

      {/* OVERLAY */}

      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* LOGO */}

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