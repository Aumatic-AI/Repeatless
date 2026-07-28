"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero signature visual — a live "system window" showing one Repeatless
 * workflow running: a lead arrives, the Claude agent decides, three
 * downstream actions complete.
 * All motion is SMIL inside the SVG on a 6s loop; with reduced motion the
 * diagram renders as a finished (all-green) state instead.
 */

const CYCLE = "6s";

// One shared 6s timeline, expressed as keyTimes fractions:
// 0.00–0.23  pulse travels trigger → agent
// 0.23–0.30  agent halo breathes
// 0.27–0.57  three pulses fan out to the action nodes (slight stagger)
// 0.55–0.95  done-checks hold, then reset for the next lead
const FAN_TIMES = [
  { travel: [0.27, 0.5], check: 0.52 },
  { travel: [0.29, 0.53], check: 0.55 },
  { travel: [0.31, 0.56], check: 0.58 },
];

type NodeBoxProps = {
  x: number;
  y: number;
  w: number;
  label: string;
  variant?: "plain" | "agent";
};

function NodeBox({ x, y, w, label, variant = "plain" }: NodeBoxProps) {
  const h = variant === "agent" ? 54 : 42;
  const isAgent = variant === "agent";
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={isAgent ? 14 : 11}
        fill={isAgent ? "var(--color-skysoft)" : "var(--color-surface)"}
        stroke={isAgent ? "rgba(2,132,199,0.35)" : "rgba(10,15,20,0.12)"}
        strokeWidth="1"
      />
      <text
        x={x}
        y={y + (isAgent ? -4 : 4)}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-monoui)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          fill: isAgent ? "var(--color-skydeep)" : "var(--color-slate)",
        }}
      >
        {label.toUpperCase()}
      </text>
      {isAgent && (
        <text
          x={x}
          y={y + 14}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-monoui)",
            fontSize: "8.5px",
            letterSpacing: "0.2em",
            fill: "var(--color-sky)",
          }}
        >
          READS · DECIDES · ROUTES
        </text>
      )}
    </g>
  );
}

function Pulse({
  pathId,
  times,
  reduce,
}: {
  pathId: string;
  times: [number, number];
  reduce: boolean;
}) {
  if (reduce) return null;
  const [start, end] = times;
  return (
    <circle r="4" fill="var(--color-skybright)" opacity="0">
      <animateMotion dur={CYCLE} repeatCount="indefinite" calcMode="linear" keyPoints={`0;0;1;1`} keyTimes={`0;${start};${end};1`} rotate="0">
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        dur={CYCLE}
        repeatCount="indefinite"
        values="0;0;1;1;0;0"
        keyTimes={`0;${start};${start + 0.02};${end - 0.02};${end};1`}
      />
    </circle>
  );
}

function CheckMark({
  x,
  y,
  appearAt,
  reduce,
}: {
  x: number;
  y: number;
  appearAt: number;
  reduce: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={reduce ? 1 : 0}>
      <circle r="9" fill="var(--color-sky)" />
      <path d="M -3.5 0 L -1 2.8 L 3.8 -2.8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {!reduce && (
        <animate
          attributeName="opacity"
          dur={CYCLE}
          repeatCount="indefinite"
          values="0;0;1;1;0"
          keyTimes={`0;${appearAt};${appearAt + 0.03};0.95;1`}
        />
      )}
    </g>
  );
}

export default function HeroSystemWindow() {
  const reduce = useReducedMotion() ?? false;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gridId = `grid${uid}`;
  const paths = {
    intake: `intake${uid}`,
    left: `left${uid}`,
    mid: `mid${uid}`,
    right: `right${uid}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative mx-auto w-full max-w-sm lg:max-w-md"
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-surface shadow-[0_40px_80px_-32px_rgba(8,18,26,0.35)]">
        {/* Window bar */}
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
          <span className="eyebrow text-slate2">repeatless · lead-to-invoice</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            <span className="eyebrow text-skydeep">live</span>
          </span>
        </div>

        {/* Diagram */}
        <svg viewBox="0 0 520 470" className="block w-full" role="img" aria-label="Diagram of a Repeatless workflow: a new lead is read by a Claude agent, which updates the CRM, sends the proposal, and notifies the team.">
          <defs>
            <pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(10,15,20,0.06)" />
            </pattern>
          </defs>
          <rect width="520" height="470" fill={`url(#${gridId})`} />

          {/* Connectors */}
          <g fill="none" stroke="rgba(10,15,20,0.14)" strokeWidth="1.5">
            <path id={paths.intake} d="M 260 96 C 260 130, 260 150, 260 173" />
            <path id={paths.left} d="M 260 227 C 260 300, 100 290, 100 359" />
            <path id={paths.mid} d="M 260 227 C 260 280, 260 300, 260 384" />
            <path id={paths.right} d="M 260 227 C 260 300, 420 290, 420 359" />
          </g>

          {/* Agent halo — breathes when the lead arrives */}
          <rect x={166} y={173} width={188} height={54} rx={14} fill="none" stroke="var(--color-skybright)" strokeWidth="5" opacity={0}>
            {!reduce && (
              <animate attributeName="opacity" dur={CYCLE} repeatCount="indefinite" values="0;0;0.5;0;0" keyTimes="0;0.22;0.26;0.32;1" />
            )}
          </rect>

          {/* Nodes */}
          <NodeBox x={260} y={75} w={140} label="New lead" />
          <NodeBox x={260} y={200} w={188} label="Claude agent" variant="agent" />
          <NodeBox x={100} y={380} w={146} label="CRM updated" />
          <NodeBox x={260} y={405} w={152} label="Proposal sent" />
          <NodeBox x={420} y={380} w={152} label="Team notified" />

          {/* Pulses */}
          <Pulse pathId={paths.intake} times={[0.02, 0.23]} reduce={reduce} />
          <Pulse pathId={paths.left} times={FAN_TIMES[0].travel as [number, number]} reduce={reduce} />
          <Pulse pathId={paths.mid} times={FAN_TIMES[1].travel as [number, number]} reduce={reduce} />
          <Pulse pathId={paths.right} times={FAN_TIMES[2].travel as [number, number]} reduce={reduce} />

          {/* Done ticks */}
          <CheckMark x={100 + 73} y={380 - 21} appearAt={FAN_TIMES[0].check} reduce={reduce} />
          <CheckMark x={260 + 76} y={405 - 21} appearAt={FAN_TIMES[1].check} reduce={reduce} />
          <CheckMark x={420 + 76} y={380 - 21} appearAt={FAN_TIMES[2].check} reduce={reduce} />
        </svg>

        {/* Window footer */}
        <div className="flex items-center justify-between border-t border-ink/10 px-5 py-3">
          <span className="eyebrow text-slate2">monitored 24/7</span>
          <span className="eyebrow text-sky">100+ in production</span>
        </div>
      </div>
    </motion.div>
  );
}
