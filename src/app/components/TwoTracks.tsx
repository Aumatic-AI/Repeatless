"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const CALENDLY = "https://calendly.com/chandannetha/30min";

const dfyStages = ["Discover", "Design", "Deploy", "Scale"];

const trainingSessions = [
  "AI infrastructure strategy session",
  "Tool selection & workflow mapping",
  "Team upskilling on automation & AI tools",
];

export default function TwoTracks() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Shared by the heading and the rectangle below it: the rectangle has no
  // `whileInView` of its own — at `w-screen` wide it can never satisfy an
  // area-based visibility threshold on its own box — so it's given only
  // `variants` and inherits the hidden/show state from its parent instead.
  const slideInRight: Variants = {
    hidden: { x: reduce ? 0 : 120, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: reduce ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section id="how-we-engage" className="relative bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-sky">How we engage</p>
          {/* The old accent was a thin bar beside the text. This one is the
              text's whole entrance: a fat lime rectangle, exactly the height
              of the heading, that slides in from off past the right edge of
              the screen and (once:false) slides back out the same way if you
              scroll past and return. `left-full` on a `relative` heading
              anchors it right where the text ends; `w-screen` guarantees it
              reaches the real viewport edge no matter how far that is from
              the text, and the overshoot is clipped by the page's own
              overflow-x-clip rather than anything local. */}
          <motion.h2
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.6 }}
            className="relative mt-4 inline-block max-w-[80%] font-display text-3xl font-semibold leading-[1] tracking-tight text-ink sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Done for you. Built with your team.
            <motion.span aria-hidden="true" variants={slideInRight} className="pointer-events-none absolute left-full top-0 h-full w-screen bg-lime" />
          </motion.h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Two ways to work with us: most companies want it built and run; some want the
            capability in-house. Both get the same expertise.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Done-For-You — dark system window, machine-run feel */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-[0_30px_70px_-40px_rgba(8,18,26,0.6)]"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 font-monoui text-[11px] lowercase text-white/40">
                repeatless · done-for-you
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-white">
                Done-For-You AI Infrastructure
              </h3>
              <p className="mt-3 text-white/60">
                We build, run and maintain the entire system (operations, marketing, content,
                outreach) without your team touching the plumbing.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {dfyStages.map((s, i) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 font-monoui text-[11px] text-white/50"
                  >
                    <span className="text-skybright">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-sky px-5 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep active:scale-[0.97]"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Training & Consulting — light, human, session-agenda feel */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: reduce ? 0 : 0.08 }}
            className="overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-[0_20px_50px_-32px_rgba(8,18,26,0.3)]"
          >
            <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-4">
              <span className="font-monoui text-[11px] lowercase text-slate2">
                repeatless · training &amp; consulting
              </span>
            </div>
            <div className="p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Training &amp; Consulting
              </h3>
              <p className="mt-3 text-slate">
                For teams who want to build AI capability in-house: the same expertise, handed to
                your people instead of run for you.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {trainingSessions.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-slate">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-skysoft">
                      <FiCheck className="h-3 w-3 text-sky" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-3 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-sky hover:text-sky active:scale-[0.97]"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
