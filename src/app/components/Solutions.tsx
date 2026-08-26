"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import WhatsAppDemo from "./solutions/WhatsAppDemo";
import LeadGenDemo from "./solutions/LeadGenDemo";
import ContentDemo from "./solutions/ContentDemo";
import VoiceDemo from "./solutions/VoiceDemo";
import DashboardDemo from "./solutions/DashboardDemo";
import AgentsDemo from "./solutions/AgentsDemo";

const solutions = [
  {
    name: "WhatsApp & CRM automation",
    tab: "WhatsApp & CRM",
    desc: "Every lead captured, qualified and followed up — WhatsApp, your CRM and your pipeline moving as one.",
    Demo: WhatsAppDemo,
  },
  {
    name: "Lead gen & outreach",
    tab: "Lead gen",
    desc: "LinkedIn, email and cold calls that run themselves — pipeline that fills while your team sells.",
    Demo: LeadGenDemo,
  },
  {
    name: "Content & publishing",
    tab: "Content",
    desc: "Blogs, images and video — researched, produced and published on schedule, on autopilot.",
    Demo: ContentDemo,
  },
  {
    name: "Voice AI agents",
    tab: "Voice AI",
    desc: "Lifelike AI calls that book, remind and follow up — thousands of conversations, no call center.",
    Demo: VoiceDemo,
  },
  {
    name: "Dashboards & internal tools",
    tab: "Dashboards",
    desc: "One live view of your business — custom dashboards and tools built around how you actually work.",
    Demo: DashboardDemo,
  },
  {
    name: "Multi-agent AI systems",
    tab: "Multi-agent AI",
    desc: "Full AI infrastructure — agents that plan, delegate and execute across your business. The whole machine, built and run for you.",
    Demo: AgentsDemo,
  },
];

const STAGE_HEIGHT = 490;
const AUTOPLAY_MS = 5500;

export default function SolutionsSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Same rise-on-scroll pattern used everywhere else in this codebase
  // (TwoTracks, Scroll) — this header was the one block with no entrance
  // animation at all.
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const onScreen = useInView(stageRef, {
    amount: 0.35,
  });

  useEffect(() => {
    const strip = tabsRef.current;

    const current =
      strip?.querySelector<HTMLElement>(
        '[aria-pressed="true"]',
      );

    if (!strip || !current) return;

    const centred =
      current.offsetLeft -
      (strip.clientWidth - current.offsetWidth) / 2;

    strip.scrollTo({
      left: Math.max(0, centred),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  useEffect(() => {
    if (reduce || held || !onScreen) return;

    const id = setInterval(() => {
      setActive(
        (current) =>
          (current + 1) % solutions.length,
      );
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [reduce, held, onScreen, active]);

  const s = solutions[active];

  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-paper"
    >
      {/* =====================================================
          GREEN INTRO AREA
          ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          bg-[#CAFB00]
          px-6
          pb-8
          pt-12
          sm:pb-10
          sm:pt-16
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="eyebrow font-semibold text-black">
              What we automate
            </p>

            <h2
              className="
                mt-3
                font-display
                text-5xl
                font-bold
                tracking-normal
                text-black
                sm:text-6xl
                lg:text-7xl
              "
              style={{
                textWrap: "balance",
              }}
            >
              Six systems that do the work
              you shouldn&apos;t.
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-black/65 sm:text-xl">
              Real interfaces, real workflows. Pick one,
              combine them — or have us build the whole
              machine.
            </p>
          </motion.div>

          {/* =================================================
              SIX SYSTEM SELECTOR
          ================================================== */}

          <motion.div
            ref={stageRef}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : 0.12 }}
            onPointerEnter={() => setHeld(true)}
            onPointerLeave={() => setHeld(false)}
            onFocusCapture={() => setHeld(true)}
            onBlurCapture={() => setHeld(false)}
            className="mt-7"
          >
            <div
              ref={tabsRef}
              className="
                mx-auto
                flex
                max-w-6xl
                justify-center
                gap-1.5
                overflow-x-auto
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {solutions.map((sol, i) => {
                const current = i === active;

                return (
                  <button
                    key={sol.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={current}
                    className={`
                      relative
                      shrink-0
                      overflow-hidden
                      rounded-full
                      border
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      transition-all
                      duration-200
                      sm:px-5
                      ${
                        current
                          ? `
                            border-black
                            bg-black
                            text-white
                          `
                          : `
                            border-black/10
                            bg-white
                            text-black
                            hover:border-black/25
                            hover:bg-black/[0.06]
                          `
                      }
                    `}
                  >
                      {sol.tab}

                      {current &&
                        !reduce &&
                        !held && (
                          <motion.span
                            key={active}
                            className="
                              absolute
                              inset-x-0
                              bottom-0
                              h-[2px]
                              origin-left
                              bg-white
                            "
                            initial={{
                              scaleX: 0,
                            }}
                            animate={{
                              scaleX: 1,
                            }}
                            transition={{
                              duration:
                                AUTOPLAY_MS / 1000,
                              ease: "linear",
                            }}
                          />
                        )}
                    </button>
                  );
                })}
              </div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          NORMAL BACKGROUND CONTENT AREA
          ===================================================== */}

      <div className="relative bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-10
              lg:grid-cols-[0.85fr_1.15fr]
              lg:gap-14
            "
          >
            {/* =================================================
                LEFT COPY
            ================================================== */}

            <div
              className="
                relative
                grid
                items-start
                [&>*]:col-start-1
                [&>*]:row-start-1
              "
            >
              {/* Background card behind the copy — a lime panel that slides
                  in from the left every time the active solution changes,
                  keyed on `active` so it remounts (and replays its entrance)
                  on each swap instead of just sitting there. */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  aria-hidden="true"
                  initial={{
                    x: reduce ? 0 : -72,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="
                    absolute
                    -inset-x-6
                    -inset-y-5
                    bg-[#CAFB00]
                  "
                />
              </AnimatePresence>

              {solutions.map((sol, i) => (
                <motion.div
                  key={sol.name}
                  className="relative"
                  inert={i !== active}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    filter:
                      i === active
                        ? "blur(0px)"
                        : "blur(3px)",
                  }}
                  transition={{
                    duration:
                      reduce
                        ? 0
                        : i === active
                          ? 0.32
                          : 0.22,
                    ease: "easeOut",
                  }}
                >
                  <h3
                    className="
                      font-display
                      text-3xl
                      font-semibold
                      tracking-tight
                      text-ink
                      sm:text-4xl
                    "
                  >
                    {sol.name}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-md
                      text-lg
                      leading-relaxed
                      text-slate
                    "
                  >
                    {sol.desc}
                  </p>

                  <a
                    href="/casestudies"
                    className="
                      group
                      mt-7
                      inline-flex
                      items-center
                      gap-1.5
                      font-medium
                      text-ink
                      transition-colors
                    "
                  >
                    See it in production

                    <FiArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* =================================================
                RIGHT DEMO
            ================================================== */}

            <div
              className="relative"
              style={{
                height: STAGE_HEIGHT,
              }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{
                    y: reduce ? 0 : 72,
                    opacity: 0,
                    scale: reduce ? 1 : 0.96,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    y: reduce ? 0 : 72,
                    opacity: 0,
                    scale: reduce ? 1 : 0.96,
                  }}
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    ease: [
                      0.23,
                      1,
                      0.32,
                      1,
                    ],
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    lg:justify-end
                  "
                >
                  <s.Demo />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}