"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Motif = "voice" | "chat" | "cart" | "video" | "content" | "pipeline" | "hub";

// Maps each case study's actual solution type to a motif — content-relevant,
// not decorative. Order matters: first match wins, most specific rules first.
function motifFor(solution: string): Motif {
  const s = solution.toUpperCase();
  if (s.includes("VOICE")) return "voice";
  if (s.includes("E-COMMERCE") || s.includes("CART") || s.includes("SHOPIFY")) return "cart";
  if (s.includes("WHATSAPP") || s.includes("DM") || s.includes("COMMENT") || s.includes("COMMERCE") || s.includes("MESSAG")) return "chat";
  if (s.includes("MULTI-AGENT") || s.includes("FULL-STACK") || s.includes("STACK") || s.includes("OPERATIONS") || s.includes("PRODUCTIVITY")) return "hub";
  if (s.includes("LEAD") || s.includes("REAL ESTATE") || s.includes("EVENT") || s.includes("DELIVERABILITY") || s.includes("LOCAL SERVICES")) return "pipeline";
  if (s.includes("VIDEO") || s.includes("CREATIVE") || s.includes("REELS")) return "video";
  if (s.includes("CONTENT") || s.includes("SEO") || s.includes("INSTAGRAM") || s.includes("CREATOR") || s.includes("GUIDE") || s.includes("DISTRIBUTION")) return "content";
  return "hub";
}

const SKY = "#0284C7";
const SKYBRIGHT = "#38BDF8";
const INK = "#0B0E1A";

type MotifProps = { active: boolean; reduce: boolean };

function VoiceMotif({ active, reduce }: MotifProps) {
  const bars = [
    { x: 60, h: 34 },
    { x: 82, h: 56 },
    { x: 104, h: 78 },
    { x: 126, h: 50 },
    { x: 148, h: 68 },
    { x: 170, h: 40 },
    { x: 192, h: 26 },
  ];
  return (
    <g>
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          width={12}
          rx={6}
          fill={i % 2 === 0 ? SKY : SKYBRIGHT}
          initial={false}
          animate={{
            y: 75 - b.h / 2,
            height: b.h,
            scaleY: !active ? 0.15 : reduce ? 1 : [0.35, 1, 0.55, 0.9, 0.35],
            opacity: active ? 1 : 0,
          }}
          style={{ transformOrigin: "center" }}
          transition={
            !active || reduce
              ? { duration: 0.25 }
              : { scaleY: { duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.09 }, opacity: { duration: 0.3 } }
          }
        />
      ))}
    </g>
  );
}

function ChatMotif({ active, reduce }: MotifProps) {
  return (
    <g>
      <motion.rect
        x={48}
        y={38}
        width={92}
        height={34}
        rx={17}
        fill={SKY}
        fillOpacity={0.22}
        stroke={SKY}
        strokeWidth={2.5}
        initial={{ opacity: 0, y: 46 }}
        animate={active ? { opacity: 1, y: 38 } : { opacity: 0, y: 46 }}
        transition={{ duration: reduce ? 0 : 0.4, delay: active && !reduce ? 0.1 : 0 }}
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={70 + i * 14}
          cy={55}
          r={3}
          fill={SKY}
          initial={{ opacity: 0 }}
          animate={active && !reduce ? { opacity: [0, 1, 0], y: [55, 51, 55] } : { opacity: 0 }}
          transition={{ duration: 0.9, repeat: Infinity, delay: 0.5 + i * 0.15, ease: "easeInOut" }}
        />
      ))}
      <motion.rect
        x={100}
        y={88}
        width={100}
        height={38}
        rx={19}
        fill={SKYBRIGHT}
        initial={{ opacity: 0, y: 96, scale: 0.9 }}
        animate={active ? { opacity: 1, y: 88, scale: 1 } : { opacity: 0, y: 96, scale: 0.9 }}
        transition={{ duration: reduce ? 0 : 0.4, delay: active && !reduce ? 0.85 : 0, ease: [0.4, 0, 0.2, 1] }}
      />
    </g>
  );
}

function CartMotif({ active, reduce }: MotifProps) {
  return (
    <g>
      <motion.path
        d="M78,58 L166,58 L156,104 L92,104 Z"
        fill={SKY}
        fillOpacity={0.18}
        stroke={SKY}
        strokeWidth={3}
        strokeLinejoin="round"
        initial={{ opacity: 0, y: 8 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
      />
      <motion.path
        d="M64,50 L78,50 L84,58"
        fill="none"
        stroke={SKY}
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.3 }}
      />
      <circle cx={102} cy={116} r={7} fill={INK} stroke={SKYBRIGHT} strokeWidth={3} />
      <circle cx={146} cy={116} r={7} fill={INK} stroke={SKYBRIGHT} strokeWidth={3} />
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: reduce ? 0 : 0.3, delay: active && !reduce ? 0.55 : 0, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: "178px 46px" }}
      >
        <circle cx={178} cy={46} r={16} fill={SKYBRIGHT} />
        <path d="M171,46 L176,51 L186,40" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </g>
  );
}

function VideoMotif({ active, reduce }: MotifProps) {
  const frames = [
    { x: 52, y: 42, r: -8 },
    { x: 158, y: 40, r: 7 },
    { x: 60, y: 96, r: 10 },
    { x: 156, y: 100, r: -6 },
  ];
  return (
    <g>
      {frames.map((f, i) => (
        <motion.rect
          key={i}
          x={f.x}
          y={f.y}
          width={30}
          height={22}
          rx={4}
          fill="none"
          stroke={SKY}
          strokeWidth={2.5}
          style={{ transformOrigin: `${f.x + 15}px ${f.y + 11}px` }}
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          animate={active ? { opacity: 0.8, scale: 1, rotate: f.r } : { opacity: 0, scale: 0.6, rotate: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, delay: active && !reduce ? i * 0.08 : 0, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
      <motion.circle
        cx={120}
        cy={75}
        r={30}
        fill={SKY}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          !active
            ? { scale: 0, opacity: 0 }
            : reduce
            ? { scale: 1, opacity: 1 }
            : { scale: [1, 1.08, 1], opacity: 1 }
        }
        transition={
          !active ? { duration: 0.2 } : reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <path d="M112,62 L112,88 L136,75 Z" fill="#ffffff" />
    </g>
  );
}

function ContentMotif({ active, reduce }: MotifProps) {
  const sheets = [
    { x: 92, y: 34, delay: 0 },
    { x: 102, y: 44, delay: 0.06 },
    { x: 112, y: 54, delay: 0.12 },
  ];
  return (
    <g>
      {sheets.map((sh, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: sh.y + 10 }}
          animate={active ? { opacity: 1, y: i === sheets.length - 1 ? sh.y - 6 : sh.y } : { opacity: 0, y: sh.y + 10 }}
          transition={{ duration: reduce ? 0 : 0.4, delay: active && !reduce ? sh.delay : 0, ease: [0.4, 0, 0.2, 1] }}
        >
          <rect x={sh.x} y={0} width={64} height={78} rx={6} fill={INK} stroke={i === sheets.length - 1 ? SKYBRIGHT : SKY} strokeWidth={2.5} />
          {i === sheets.length - 1 && (
            <>
              <line x1={sh.x + 12} y1={20} x2={sh.x + 52} y2={20} stroke={SKY} strokeWidth={3} strokeLinecap="round" />
              <line x1={sh.x + 12} y1={34} x2={sh.x + 44} y2={34} stroke={SKY} strokeWidth={3} strokeLinecap="round" />
              <line x1={sh.x + 12} y1={48} x2={sh.x + 52} y2={48} stroke={SKY} strokeWidth={3} strokeLinecap="round" />
            </>
          )}
        </motion.g>
      ))}
    </g>
  );
}

function PipelineMotif({ active, reduce }: MotifProps) {
  const nodes = [60, 100, 140, 180];
  return (
    <g>
      <line x1={60} y1={75} x2={180} y2={75} stroke={SKY} strokeWidth={3} />
      {nodes.map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={75}
          r={8}
          fill={INK}
          stroke={SKYBRIGHT}
          strokeWidth={3}
          initial={{ scale: 0 }}
          animate={active ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, delay: active && !reduce ? i * 0.08 : 0, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
      <motion.circle
        cx={60}
        cy={75}
        r={5}
        fill={SKYBRIGHT}
        initial={{ opacity: 0 }}
        animate={
          !active ? { opacity: 0 } : reduce ? { opacity: 1, cx: 180 } : { opacity: [0, 1, 1, 0], cx: [60, 60, 180, 180] }
        }
        transition={!active || reduce ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </g>
  );
}

function HubMotif({ active, reduce }: MotifProps) {
  const satellites: [number, number][] = [
    [63.6, 54.5],
    [85.6, 25.9],
    [120, 15],
    [154.4, 25.9],
    [176.4, 54.5],
  ];
  const hub: [number, number] = [120, 90];
  return (
    <g>
      {satellites.map((n, i) => (
        <motion.line
          key={i}
          x1={hub[0]}
          y1={hub[1]}
          x2={n[0]}
          y2={n[1]}
          stroke={SKY}
          strokeWidth={3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: active && !reduce ? i * 0.08 : 0, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
      {satellites.map((n, i) => (
        <motion.circle
          key={i}
          cx={n[0]}
          cy={n[1]}
          r={7}
          fill={INK}
          stroke={SKYBRIGHT}
          strokeWidth={3}
          initial={{ scale: 0 }}
          animate={active ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, delay: active && !reduce ? i * 0.08 + 0.1 : 0, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
      <motion.circle
        cx={hub[0]}
        cy={hub[1]}
        r={12}
        fill={SKY}
        animate={
          !active
            ? { scale: 0, opacity: 0 }
            : reduce
            ? { scale: 1, opacity: 1 }
            : { scale: [1, 1.15, 1], opacity: [1, 0.75, 1] }
        }
        transition={
          !active ? { duration: 0.2 } : reduce ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </g>
  );
}

type Props = {
  solution: string;
  active: boolean;
  className?: string;
};

export default function CaseStudyAbstract({ solution, active, className }: Props) {
  const reduce = !!useReducedMotion();
  const motif = motifFor(solution);

  const wrap: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: reduce ? 0 : 0.2 } },
  };

  const motifProps: MotifProps = { active, reduce };

  return (
    <motion.svg
      viewBox="0 0 240 150"
      className={className}
      variants={wrap}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      aria-hidden
    >
      {motif === "voice" && <VoiceMotif {...motifProps} />}
      {motif === "chat" && <ChatMotif {...motifProps} />}
      {motif === "cart" && <CartMotif {...motifProps} />}
      {motif === "video" && <VideoMotif {...motifProps} />}
      {motif === "content" && <ContentMotif {...motifProps} />}
      {motif === "pipeline" && <PipelineMotif {...motifProps} />}
      {motif === "hub" && <HubMotif {...motifProps} />}
    </motion.svg>
  );
}
