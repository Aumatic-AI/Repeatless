"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const modules = [
  {
    num: "01",
    title: "Foundation (Offer + Niche Selection)",
    bullets: [
      'Why "I sell voice bots" isn\'t an offer at all — it\'s a commodity, and it\'s quietly capping your income',
      "Pick one high-budget niche and build a real offer around it — setup fee + retainer, structured to scale to ₹1-2L+/month",
    ],
  },
  {
    num: "02",
    title: "Positioning",
    bullets: [
      "The one shift that stops you from being compared to every other bot-seller on the market",
      'Reposition your brand, portfolio, and profile from "freelancer" to "AI architect" — infrastructure, not gadgets',
    ],
  },
  {
    num: "03",
    title: "Architecture (Full Structure)",
    bullets: [
      "The step most builders skip before touching a single tool — and it's why their systems break under real use",
      "The complete 8-step build process from problem discovery to deployment, so every project runs on a blueprint, not guesswork",
    ],
    steps: [
      "Problem Discovery — the questions that surface what's actually broken (in the client's words and numbers, not yours)",
      "System Architecture — mapping the full data flow before anyone opens a tool",
      "Tool Selection — deciding what's n8n (orchestration/workflow) vs Claude Code/Codex (custom logic) vs a plain API call",
      'AI/Prompt Layer Design — how the AI actually "thinks": system prompts, context, guardrails',
      "Build — assembling triggers, nodes, and code steps into the actual workflow",
      "Testing & Edge Cases — breaking it yourself before the client does",
      "Deployment & Handoff — docs, credentials, monitoring, who owns what post-launch",
      "Iteration Loop — feedback → refinement → versioning",
    ],
  },
  {
    num: "04",
    title: "Outbound",
    bullets: [
      'The messaging mistake that makes you sound like every other "I do AI automation" DM in their inbox',
      "A LinkedIn + cold outreach system built specifically around your new positioning — designed to build a pipeline, not chase referrals",
    ],
  },
  {
    num: "05",
    title: "Conversion",
    bullets: [
      "The moment on a call where clients decide you're worth the retainer — most people miss it completely",
      "How to demonstrate infrastructure value instead of pitching features, plus how to handle the exact objections killing your deals",
    ],
  },
  {
    num: "06",
    title: "Scale",
    bullets: [
      "The pricing mistake that keeps skilled builders stuck charging project fees instead of retainers",
      "The exact close conversation, proposal structure, and path from your first client to scaling — before this shift saturates",
    ],
  },
];

export default function ModulesSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  // Modules step in one after another instead of the whole stack fading up
  // together.
  const moduleContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const moduleCard: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  // The 8-step list inside Module 3 gets its own quick stagger.
  const stepContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };

  const stepItem: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -12 },
    show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        >
          The 6-Module Breakdown
        </motion.h2>

        <motion.div
          variants={moduleContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 flex flex-col gap-5"
        >
          {modules.map((m) => (
            <motion.div
              key={m.num}
              variants={moduleCard}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:border-lime/50"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-8xl font-semibold text-white/[0.04] transition-colors duration-300 group-hover:text-lime/10"
              >
                {m.num}
              </span>

              <div className="relative flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lime/40 font-monoui text-xs text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                  {m.num}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">
                  Module {m.num.replace(/^0/, "")}: {m.title}
                </h3>
              </div>

              <ul className="relative mt-4 flex flex-col gap-3">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                    {b}
                  </li>
                ))}
              </ul>

              {m.steps && (
                <div className="relative mt-5 rounded-xl border border-white/10 bg-black/20 p-5">
                  <p className="font-monoui text-xs uppercase tracking-wide text-white/50">
                    8-Step Build Process
                  </p>
                  <motion.ol
                    variants={stepContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative mt-4 flex flex-col gap-3 border-l border-white/10 pl-4"
                  >
                    {m.steps.map((s, i) => (
                      <motion.li
                        key={s}
                        variants={stepItem}
                        className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
                      >
                        <span className="mt-0.5 shrink-0 font-monoui text-xs font-semibold text-lime">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s}
                      </motion.li>
                    ))}
                  </motion.ol>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
