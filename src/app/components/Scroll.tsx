"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Network, Users, ArrowUpRight, ArrowRight } from "lucide-react";
import { tools } from "./toolsData";

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Real client contexts drawn from the case studies.
const contexts = [
  "New York ad agency",
  "Toronto content brand",
  "Canadian SEO publisher",
  "Chicago luxury retail",
  "Vancouver marketing team",
  "Austin consulting firm",
  "US local services",
  "Book publisher",
  "B2B LinkedIn brands",
  "Ohio home services",
];

// Context wheel settings
const WHEEL_STEP = 12;
const WHEEL_RADIUS = 200;
const WHEEL_REACH = 3;
const WHEEL_DWELL = 2600;
const WHEEL_FADE = [1, 0.42, 0.12, 0.04, 0];
const WHEEL_BLUR = [0, 1.1, 2.4, 3.6, 4];
const WHEEL_SCALE = [1, 0.92, 0.84, 0.78, 0.78];

// Round values to avoid hydration mismatches.
const seatRound = (n: number) => Math.round(n * 100) / 100;

function wheelSeat(distance: number) {
  const radians = (distance * WHEEL_STEP * Math.PI) / 180;
  const depth = Math.min(
    Math.abs(distance),
    WHEEL_FADE.length - 1
  );

  return {
    x: seatRound(
      -WHEEL_RADIUS * (1 - Math.cos(radians))
    ),
    y: seatRound(
      WHEEL_RADIUS * Math.sin(radians)
    ),
    rotate: distance * WHEEL_STEP,
    scale: WHEEL_SCALE[depth],
    opacity: WHEEL_FADE[depth],
    filter: `blur(${WHEEL_BLUR[depth]}px)`,
  };
}

// Shortest signed distance from focus.
function wheelDistance(index: number, focus: number) {
  const half = contexts.length / 2;

  return (
    ((index - focus + half + contexts.length) %
      contexts.length) -
    half
  );
}

const teamTraits = ["Senior specialists only"];

const teamStages = [
  {
    label: "Design",
    scope: "Scoped with you, not for you",
  },
  {
    label: "Build",
    scope: "The same specialists who scoped it",
  },
  {
    label: "Run",
    scope: "Monitored and maintained after launch",
  },
];

// Five scattered nodes reorganize around a central hub.
const HUB = {
  cx: 120,
  cy: 63,
};

const PATCHWORK_NODES = [
  { id: "a", cx: 28, cy: 28 },
  { id: "b", cx: 96, cy: 14 },
  { id: "c", cx: 168, cy: 33 },
  { id: "d", cx: 206, cy: 88 },
  { id: "e", cx: 54, cy: 98 },
];

const SYSTEM_NODES = [
  { id: "a", cx: 120, cy: 15 },
  { id: "b", cx: 167, cy: 45 },
  { id: "c", cx: 150, cy: 100 },
  { id: "d", cx: 90, cy: 100 },
  { id: "e", cx: 73, cy: 45 },
];

const PATCHWORK_LINES = [
  {
    x1: 28,
    y1: 28,
    x2: 206,
    y2: 88,
  },
  {
    x1: 96,
    y1: 14,
    x2: 54,
    y2: 98,
  },
  {
    x1: 168,
    y1: 33,
    x2: 28,
    y2: 28,
    dashed: true,
  },
];

// --------------------------------------------------
// Team rail
// --------------------------------------------------

function TeamRail() {
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  const drawn = inView || reduce;

  return (
    <div
      ref={ref}
      className="relative mt-5 pl-6"
    >
      <div className="absolute inset-y-1 left-[3px] w-[2px] overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="h-full w-full origin-top rounded-full bg-sky"
          initial={
            reduce
              ? false
              : {
                  scaleY: 0,
                }
          }
          animate={{
            scaleY: drawn ? 1 : 0,
          }}
          transition={{
            duration: reduce ? 0 : 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      </div>

      <div className="flex flex-col gap-5">
        {teamStages.map((stage, i) => (
          <motion.div
            key={stage.label}
            className="relative"
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    x: 6,
                  }
            }
            animate={{
              opacity: drawn ? 1 : 0,
              x: drawn ? 0 : 6,
            }}
            transition={{
              duration: reduce ? 0 : 0.4,
              delay: reduce
                ? 0
                : 0.25 + i * 0.13,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <span className="absolute -left-6 top-[7px] h-2 w-2 rounded-full bg-sky ring-4 ring-surface" />

            <p className="font-display text-base font-semibold leading-relaxed text-ink">
              {stage.label}
            </p>

            <p className="mt-1 text-sm leading-relaxed text-slate">
              {stage.scope}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------
// System diagram
// --------------------------------------------------

function SystemDiagram() {
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  const [mode, setMode] = useState<
    "patchwork" | "system"
  >("patchwork");

  const replayTimer = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setMode("system");
      return;
    }

    if (!inView) return;

    const id = setTimeout(
      () => setMode("system"),
      1100
    );

    return () => clearTimeout(id);
  }, [inView, reduce]);

  useEffect(() => {
    return () => {
      if (replayTimer.current) {
        window.clearTimeout(
          replayTimer.current
        );
      }
    };
  }, []);

  const replay = () => {
    if (reduce || mode !== "system") return;

    setMode("patchwork");

    replayTimer.current = window.setTimeout(
      () => setMode("system"),
      700
    );
  };

  const nodes =
    mode === "system"
      ? SYSTEM_NODES
      : PATCHWORK_NODES;

  return (
    <div
      ref={ref}
      className="mt-5"
      onPointerEnter={replay}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{
            opacity: 0,
            y: 4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -4,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`eyebrow ${
            mode === "system"
              ? "text-sky"
              : "text-slate2"
          }`}
        >
          {mode === "system"
            ? "One system"
            : "Patchwork"}
        </motion.p>
      </AnimatePresence>

      <svg
        viewBox="0 0 240 130"
        className="mt-3 block h-32 w-full sm:h-36"
      >
        {/* Patchwork connections */}
        <g
          style={{
            opacity:
              mode === "patchwork" ? 1 : 0,
            transition:
              "opacity 0.4s",
          }}
        >
          {PATCHWORK_LINES.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(10,15,20,0.22)"
              strokeWidth="1.5"
              strokeDasharray={
                line.dashed ? "3 4" : undefined
              }
            />
          ))}
        </g>

        {/* System connections */}
        <g
          style={{
            opacity:
              mode === "system" ? 1 : 0,
            transition:
              "opacity 0.4s",
          }}
        >
          {SYSTEM_NODES.map((node) => (
            <line
              key={node.id}
              x1={HUB.cx}
              y1={HUB.cy}
              x2={node.cx}
              y2={node.cy}
              stroke="var(--color-sky)"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* Hub halo */}
        <motion.circle
          cx={HUB.cx}
          cy={HUB.cy}
          r={18}
          fill="var(--color-skysoft)"
          animate={{
            opacity:
              mode === "system" ? 1 : 0,
            scale:
              mode === "system" ? 1 : 0.5,
          }}
          transition={{
            duration: reduce ? 0 : 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            transformOrigin: `${HUB.cx}px ${HUB.cy}px`,
          }}
        />

        {/* Hub */}
        <motion.circle
          cx={HUB.cx}
          cy={HUB.cy}
          r={8}
          fill="var(--color-sky)"
          animate={{
            opacity:
              mode === "system" ? 1 : 0,
            scale:
              mode === "system" ? 1 : 0.4,
          }}
          transition={{
            duration: reduce ? 0 : 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Hub pulse */}
        {mode === "system" && !reduce && (
          <motion.circle
            cx={HUB.cx}
            cy={HUB.cy}
            r={8}
            fill="none"
            stroke="var(--color-skybright)"
            strokeWidth="2"
            initial={{
              opacity: 0.6,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 2.2,
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            animate={{
              cx: node.cx,
              cy: node.cy,
            }}
            transition={{
              duration: reduce ? 0 : 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            r={6}
            fill={
              mode === "system"
                ? "var(--color-skysoft)"
                : "var(--color-surface)"
            }
            stroke={
              mode === "system"
                ? "var(--color-sky)"
                : "rgba(10,15,20,0.3)"
            }
            strokeWidth="2"
            style={{
              transition:
                "fill 400ms cubic-bezier(0.4,0,0.2,1), stroke 400ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ))}
      </svg>

      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="mt-3 text-base text-slate"
        >
          {mode === "system"
            ? "One infrastructure. Built once, wired to scale."
            : "Disconnected tools. Manual handoffs. Something always breaks."}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// --------------------------------------------------
// Context wheel
// --------------------------------------------------

function ContextWheel() {
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    amount: 0.4,
  });

  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;

    const id = setInterval(
      () =>
        setFocus(
          (n) => (n + 1) % contexts.length
        ),
      WHEEL_DWELL
    );

    return () => clearInterval(id);
  }, [reduce, inView]);

  return (
    <div
      ref={ref}
      className="relative mt-4 h-36 overflow-hidden"
    >
      <ArrowRight
        className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
        aria-hidden="true"
      />

      {contexts.map((label, i) => {
        const distance = reduce
          ? i === 0
            ? 0
            : WHEEL_REACH + 1
          : wheelDistance(i, focus);

        const tracked =
          Math.abs(distance) <= WHEEL_REACH;

        return (
          <motion.span
            key={label}
            className={`absolute left-9 top-1/2 -mt-[9px] whitespace-nowrap font-display text-lg leading-none ${
              distance === 0
                ? "font-semibold text-ink"
                : "font-medium text-slate2"
            }`}
            style={{
              transformOrigin: "left center",
            }}
            initial={false}
            animate={wheelSeat(distance)}
            transition={
              tracked
                ? {
                    type: "spring",
                    stiffness: 200,
                    damping: 26,
                  }
                : {
                    duration: 0,
                  }
            }
            aria-hidden="true"
          >
            {label}
          </motion.span>
        );
      })}

      <span className="sr-only">
        {contexts.join(", ")}
      </span>
    </div>
  );
}

// --------------------------------------------------
// Features section
// --------------------------------------------------

export default function FeaturesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-paper py-20 sm:py-28">
      <div className="relative z-20 mx-auto grid max-w-6xl min-w-0 gap-6 px-6 lg:grid-cols-12 lg:gap-6">

        {/* ---------------------------------------- */}
        {/* INTRO */}
        {/* ---------------------------------------- */}

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          className="min-w-0 lg:col-span-4 lg:col-start-1 lg:row-start-1"
        >
          <p className="eyebrow text-sky">
            Why Repeatless
          </p>

          <h2
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            style={
              {
                textWrap: "balance",
              } as React.CSSProperties
            }
          >
            Built to deliver, not to dazzle.
          </h2>

          <p className="mt-3 max-w-md text-base leading-relaxed text-slate">
            The proof, the tooling, and the team standing behind both.
          </p>

          <a
            href="/casestudies"
            className="group mt-4 inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
          >
            See the results

            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* ---------------------------------------- */}
        {/* WHERE AUTOMATIONS ALREADY RUN */}
        {/* Small card directly underneath intro */}
        {/* ---------------------------------------- */}

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: reduce ? 0 : 0.24,
          }}
          className="min-w-0 rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] lg:col-span-4 lg:col-start-1 lg:row-start-2"
        >
          <p className="eyebrow text-slate2">
            Where our automations already run
          </p>

          <ContextWheel />
        </motion.div>

        {/* ---------------------------------------- */}
        {/* ONE SYSTEM */}
        {/* Tall middle card */}
        {/* ---------------------------------------- */}

        <motion.article
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: reduce ? 0 : 0.06,
          }}
          className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] sm:p-8 lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-1"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-skysoft text-sky">
              <Network className="h-5 w-5" />
            </span>

            <h3 className="font-display text-xl font-semibold text-ink">
              One system. Not a patchwork.
            </h3>
          </div>

          <p className="mt-4 text-base text-slate">
            Built for B2B and D2C teams who refuse to repeat themselves.
          </p>

          <SystemDiagram />
        </motion.article>

        {/* ---------------------------------------- */}
        {/* DEDICATED TEAM */}
        {/* Tall right card */}
        {/* ---------------------------------------- */}

        <motion.article
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: reduce ? 0 : 0.12,
          }}
          className="rounded-3xl border border-ink/10 bg-surface p-7 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] sm:p-8 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-skysoft text-sky">
              <Users className="h-5 w-5" />
            </span>

            <h3 className="font-display text-xl font-semibold text-ink">
              A dedicated team, senior-led
            </h3>
          </div>

          <p className="mt-4 text-base text-slate">
            No offshore queue. No hand-offs.
          </p>

          <TeamRail />

          <div className="mt-5 flex flex-wrap gap-2.5">
            {teamTraits.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-surface2 px-3.5 py-1.5 text-sm font-medium text-ink"
              >
                {trait}
              </span>
            ))}
          </div>
        </motion.article>

        {/* ---------------------------------------- */}
        {/* THE STACK */}
        {/* Full-width bottom card */}
        {/* ---------------------------------------- */}

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: reduce ? 0 : 0.18,
          }}
          className="min-w-0 rounded-3xl border border-ink/10 bg-surface p-6 shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] lg:col-span-12 lg:col-start-1 lg:row-start-3"
        >
          <p className="eyebrow text-slate2">
            The stack we build with
          </p>

          <div
            className="relative mt-5 h-32 overflow-hidden sm:h-36"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            }}
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : {
                      x: ["0%", "-50%"],
                    }
              }
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex h-full w-max items-center gap-10"
            >
              {[...tools, ...tools].map(
                (tool, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${tool.name}-${i}`}
                    src={tool.icon}
                    alt={tool.name}
                    title={tool.name}
                    className="h-11 w-11 shrink-0 opacity-75 grayscale-0 transition-all duration-300 hover:scale-110 hover:opacity-100 sm:h-12 sm:w-12"
                  />
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}