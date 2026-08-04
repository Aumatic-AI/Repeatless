"use client";

import { useEffect, useId } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";

/**
 * Geometry contract
 * -----------------
 * The scene is laid out in a 1600 x 700 viewBox and rendered with
 * `xMidYMax meet`, which scales by min(W/1600, H/700). `meet` never
 * overflows its box, so no node can escape the hero on any viewport.
 *
 * (The earlier `slice` fitting scaled by *max*, which always overflows one
 * axis: wide screens blew the scene up vertically and pushed the core node
 * below the fold, narrow ones pushed the side nodes off the left/right edges.)
 *
 * The 1600:700 ratio (~2.29) is deliberately wider than the hero so the
 * composition is width-governed through ~1920px — the side nodes stay out
 * near the edges as designed. Past that it becomes height-governed and
 * letterboxes horizontally, keeping the group centred instead of oversized.
 *
 * YMax (bottom-anchored) rather than YMid: any leftover vertical slack is
 * given to the top, which keeps the core card pinned to the hero's lower
 * edge just under the proof strip. Centring it instead parks the core
 * behind the strip on short viewports, where it disappears entirely.
 */
const VB_W = 1600;
const VB_H = 700;

// Opacity of the ambient layer (fade wash, orbit rings, connectors, pulses).
// The node cards sit above this and render at full strength.
const DECOR_OPACITY = 0.68;

// Node centres. CORE_Y is tuned so the core card clears the proof strip
// above it and still sits comfortably inside the hero at every width.
const Y = { whatsapp: 208, crm: 215, voice: 474, publishing: 467, core: 620 };

type Props = { scrollProgress: MotionValue<number> };
type NodeProps = { x: number; y: number; width: number; label: string; status: string; delay: number; dark?: boolean };

function SystemNode({ x, y, width, label, status, delay, dark = false }: NodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.72 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, type: "spring", damping: 18 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <rect x={x - width / 2} y={y - 31} width={width} height="62" rx="16"
        fill={dark ? "#0A0A0A" : "rgba(255,255,255,0.9)"}
        stroke={dark ? "rgba(255,255,255,0.16)" : "rgba(10,10,10,0.14)"} />
      <circle cx={x - width / 2 + 19} cy={y - 9} r="3.5" fill={dark ? "#FFFFFF" : "#0A0A0A"} />
      <text x={x - width / 2 + 31} y={y - 5} style={{ fontFamily: "var(--font-monoui)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", fill: dark ? "rgba(255,255,255,0.92)" : "rgba(10,10,10,0.88)" }}>
        {label.toUpperCase()}
      </text>
      <text x={x - width / 2 + 19} y={y + 15} style={{ fontFamily: "var(--font-monoui)", fontSize: "8px", letterSpacing: "0.13em", fill: dark ? "rgba(255,255,255,0.4)" : "rgba(10,10,10,0.42)" }}>
        {status.toUpperCase()}
      </text>
    </motion.g>
  );
}

function Pulse({ pathId, delay, reduce }: { pathId: string; delay: number; reduce: boolean }) {
  if (reduce) return null;
  return (
    <circle r="4" fill="#0A0A0A" opacity="0">
      <animateMotion dur="5.8s" begin={`${delay}s`} repeatCount="indefinite" rotate="auto">
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate attributeName="opacity" dur="5.8s" begin={`${delay}s`} repeatCount="indefinite"
        values="0;0;0.9;0.9;0" keyTimes="0;0.08;0.14;0.86;1" />
    </circle>
  );
}

export default function HeroNetworkScene({ scrollProgress }: Props) {
  const reduce = useReducedMotion() ?? false;
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 22, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 22, mass: 0.45 });
  const sceneX = useTransform(smoothX, [-1, 1], [reduce ? 0 : -24, reduce ? 0 : 24]);
  const sceneY = useTransform(smoothY, [-1, 1], [reduce ? 0 : -15, reduce ? 0 : 15]);
  const sceneScale = useTransform(scrollProgress, [0, 1], [1, reduce ? 1 : 1.14]);
  // Full strength at rest, fading out on scroll. The quietness of the
  // background lives on DECOR_OPACITY below rather than up here, so the node
  // cards — the near-black core especially — composite at their true colour
  // instead of being washed out to grey by a scene-wide 0.68.
  const sceneOpacity = useTransform(scrollProgress, [0, 0.72, 1], [1, 0.66, 0]);
  const ringRotate = useTransform(scrollProgress, [0, 1], [0, reduce ? 0 : 22]);

  useEffect(() => {
    if (reduce) return;
    const handlePointer = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [pointerX, pointerY, reduce]);

  const paths = {
    whatsapp: `hero-whatsapp-${id}`,
    crm: `hero-crm-${id}`,
    voice: `hero-voice-${id}`,
    content: `hero-content-${id}`,
  };

  return (
    <motion.div aria-hidden style={{ x: sceneX, y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
      className="pointer-events-none absolute inset-x-0 bottom-0 top-20 hidden origin-center will-change-transform lg:block">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMax meet" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id={`hero-fade-${id}`} cx="50%" cy="47%" r="54%">
            <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.035" />
            <stop offset="62%" stopColor="#0A0A0A" stopOpacity="0.012" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
          </radialGradient>
          <filter id={`hero-shadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#000000" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Background layer — deliberately quiet. Kept on its own opacity so
            the node cards above can render at full strength. */}
        <g opacity={DECOR_OPACITY}>
          <ellipse cx="800" cy="346" rx="570" ry="303" fill={`url(#hero-fade-${id})`} />

          <motion.g style={{ rotate: ringRotate, transformOrigin: "800px 350px" }}>
            <ellipse cx="800" cy="350" rx="525" ry="245" fill="none" stroke="rgba(10,10,10,0.075)" strokeDasharray="3 11" />
            <ellipse cx="800" cy="350" rx="385" ry="179" fill="none" stroke="rgba(10,10,10,0.055)" strokeDasharray="1 9" />
            <circle cx="275" cy="350" r="4" fill="rgba(10,10,10,0.34)" />
            <circle cx="1185" cy="227" r="4" fill="rgba(10,10,10,0.34)" />
            <circle cx="415" cy="482" r="3" fill="rgba(10,10,10,0.24)" />
          </motion.g>

          <g fill="none" stroke="rgba(10,10,10,0.13)" strokeWidth="1.35">
            <motion.path id={paths.whatsapp} d="M 212 208 C 385 233, 430 509, 705 604" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} />
            <motion.path id={paths.crm} d="M 1382 215 C 1195 245, 1165 506, 895 604" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }} />
            <motion.path id={paths.voice} d="M 168 474 C 360 451, 470 572, 705 618" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }} />
            <motion.path id={paths.content} d="M 1432 467 C 1230 447, 1115 568, 895 618" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }} />
          </g>

          <Pulse pathId={paths.whatsapp} delay={0} reduce={reduce} />
          <Pulse pathId={paths.crm} delay={1.4} reduce={reduce} />
          <Pulse pathId={paths.voice} delay={2.7} reduce={reduce} />
          <Pulse pathId={paths.content} delay={4} reduce={reduce} />
        </g>

        <g filter={`url(#hero-shadow-${id})`}>
          <SystemNode x={212} y={Y.whatsapp} width={190} label="WhatsApp" status="Lead qualified · routed" delay={0.28} />
          <SystemNode x={1382} y={Y.crm} width={180} label="CRM" status="Pipeline synced" delay={0.4} />
          <SystemNode x={168} y={Y.voice} width={182} label="Voice AI" status="Calls active" delay={0.52} />
          <SystemNode x={1432} y={Y.publishing} width={194} label="Publishing" status="Content scheduled" delay={0.64} />
          <SystemNode x={800} y={Y.core} width={242} label="Repeatless core" status="Reads · decides · executes" delay={0.76} dark />
        </g>
      </svg>
    </motion.div>
  );
}
