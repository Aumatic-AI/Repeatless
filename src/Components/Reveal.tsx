"use client";

import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealVariant = "rise" | "scale" | "scalex" | "group";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  rise: "reveal-rise",
  scale: "reveal-scale",
  scalex: "reveal-scalex",
  group: "reveal-group",
};

const DEFAULT_DURATION: Record<RevealVariant, number> = {
  rise: 0.55,
  scale: 0.45,
  scalex: 0.5,
  group: 0.4,
};

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  amount?: number;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<string, unknown>;

// Drop-in replacement for the framer-motion `initial/whileInView` scroll-reveal
// pattern used across every marketing section — same visual result (fade +
// rise/scale/underline-wipe on first entering the viewport, once), but as a
// single shared IntersectionObserver + CSS transition instead of hydrating
// framer-motion's runtime per node. `prefers-reduced-motion` is handled
// globally in globals.css (collapses all transition durations), so this
// component doesn't need its own reduced-motion branch.
export default function Reveal({
  as = "div",
  variant = "rise",
  amount = 0.3,
  delay = 0,
  duration,
  y = 20,
  scale = 0.7,
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>(amount);
  const resolvedDuration = duration ?? DEFAULT_DURATION[variant];

  return createElement(
    as,
    {
      ref: ref as React.Ref<HTMLElement>,
      className: `${VARIANT_CLASS[variant]} ${inView ? "reveal-visible" : ""} ${className}`.trim(),
      style: {
        ...style,
        "--reveal-duration": `${resolvedDuration}s`,
        "--reveal-delay": `${delay}s`,
        "--reveal-y": `${y}px`,
        "--reveal-scale": scale,
      } as CSSProperties,
      ...rest,
    },
    children
  );
}
