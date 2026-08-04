"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import WhatsAppDemo from "./solutions/WhatsAppDemo";
import LeadGenDemo from "./solutions/LeadGenDemo";
import ContentDemo from "./solutions/ContentDemo";
import VoiceDemo from "./solutions/VoiceDemo";
import DashboardDemo from "./solutions/DashboardDemo";
import AgentsDemo from "./solutions/AgentsDemo";

// Each demo is a self-contained interface mockup — swap the component for the
// live integration (real WhatsApp, real voice call, …) when it's wired up.
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

// Tallest mockup is 482px and the shortest 254px, so the swap stage is pinned to
// one height. Without it the panel would resize mid-swap, and a container
// changing height underneath two crossing cards reads as a broken layout.
const STAGE_HEIGHT = 490;
const AUTOPLAY_MS = 5500;

export default function SolutionsSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(stageRef, { amount: 0.35 });

  // The tab strip scrolls on narrow screens, so an advance could land on a tab
  // that is off to the right. With the dots gone the tabs are the only indicator
  // of what you are looking at, so the active one is kept in view. This nudges
  // the strip's own scrollLeft rather than calling scrollIntoView, which would be
  // free to scroll the whole page vertically to reach the element.
  useEffect(() => {
    const strip = tabsRef.current;
    const current = strip?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!strip || !current) return;
    const centred = current.offsetLeft - (strip.clientWidth - current.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, centred), behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  // Advances on its own, but never while off screen, while a pointer is over the
  // stage, or while something inside it holds focus — so reading or tabbing
  // through never gets yanked to the next slide. `active` in the deps restarts
  // the countdown, which also gives a manual pick a full dwell before moving on.
  useEffect(() => {
    if (reduce || held || !onScreen) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % solutions.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduce, held, onScreen, active]);

  const s = solutions[active];

  return (
    <section id="solutions" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-sky">What we automate</p>
          <h2
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Six systems that do the work you shouldn&apos;t.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Real interfaces, real workflows. Pick one, combine them — or have us build the whole
            machine.
          </p>
        </div>

        {/* The tabs are the only control. They already name all six options, so
            dots would say less than the labels sitting right above them and arrows
            would duplicate a click. The line filling the active tab carries the
            dwell, which is what tells you the view advances on its own and that
            you can take it over. */}
        <div
          ref={stageRef}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)}
          onBlurCapture={() => setHeld(false)}
          className="mt-10"
        >
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {solutions.map((sol, i) => {
              const current = i === active;
              return (
                <button
                  key={sol.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={current}
                  className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    current
                      ? "border-ink bg-ink text-white"
                      : "border-ink/15 bg-surface text-slate hover:border-sky/50 hover:text-sky"
                  }`}
                >
                  {sol.tab}
                  {/* Absent whenever nothing is advancing — held, or reduced
                      motion — so an empty tab always means "this is not moving". */}
                  {current && !reduce && !held && (
                    <motion.span
                      key={active}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-skybright"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* No card around this. Every mockup is already a framed interface with
              its own border and shadow, so a bordered panel here would be a frame
              around a frame; it was only carrying padding. */}
          {/* Both columns centre against the stage height so the slack from the
              shorter mockups splits top and bottom instead of all pooling under
              the content. */}
          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* The pitch — pure crossfade, in place, nothing moves.
                All six blocks live in one grid cell rather than mounting and
                unmounting, for two reasons. It removes the gap: AnimatePresence's
                "wait" mode held the incoming copy until the outgoing had finished
                leaving, which is the pause that was visible. And the cell is always
                as tall as the tallest block at whatever the current width is, so
                swapping can never change the height and re-centre the copy — which
                would be movement. No reserved pixel height to get wrong.
                Inactive layers are inert so their links stay out of tab order and
                the five hidden headings stay out of the accessibility tree. */}
            {/* items-start, not centre: the layers differ in height, so centring
                each one would drop a short block's headline lower than a tall one's
                and the heading would appear to jump between swaps. Sharing a top
                edge pins every headline to the same line. The stack as a whole is
                still centred in the stage by the grid above. */}
            <div className="grid items-start [&>*]:col-start-1 [&>*]:row-start-1">
              {solutions.map((sol, i) => (
                <motion.div
                  key={sol.name}
                  inert={i !== active}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    // A straight 50/50 crossfade superimposes two headlines into
                    // unreadable doubled type for a moment. The outgoing copy
                    // blurring as it leaves keeps the pair from competing, so the
                    // swap reads as one dissolve instead of two texts overlapping.
                    filter: i === active ? "blur(0px)" : "blur(3px)",
                  }}
                  // Leaves faster than the next arrives, so the incoming copy is
                  // always the dominant one. Still overlapping, so there is no
                  // moment where neither is on screen.
                  transition={{
                    duration: reduce ? 0 : i === active ? 0.32 : 0.22,
                    ease: "easeOut",
                  }}
                >
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {sol.name}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-slate">{sol.desc}</p>
                  <a
                    href="/casestudies"
                    className="group mt-7 inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
                  >
                    See it in production
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* The interface — the outgoing mockup sinks while the incoming one
                rises into its place, the two crossing mid-swap. Both are mounted
                at once, so this cannot use AnimatePresence's "wait" mode, and both
                are absolutely positioned so they can occupy the same space.
                Deliberately no blur on the cross: these mockups are large, live
                subtrees and blurring them for the duration would cost real frames. */}
            <div className="relative" style={{ height: STAGE_HEIGHT }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ y: reduce ? 0 : 72, opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: reduce ? 0 : 72, opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 flex items-center justify-center lg:justify-end"
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
