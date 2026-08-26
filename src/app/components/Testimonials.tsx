"use client";

import { useState, useEffect } from "react";
import { TestimonialData } from "../../../public/data/testimonialData";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const items = TestimonialData;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const active = items[i];

  return (
    <section
      id="testimonials"
      className="relative bg-surface py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-6">
        <p className="eyebrow text-sky">Testimonials</p>
        <h2
          className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          What clients say about working with us.
        </h2>

        {/* Active quote */}
        <div className="relative mt-12 min-h-[260px] sm:min-h-[240px]">
          <AnimatePresence>
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: reduce ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -24 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 border-l-2 border-sky pl-6 sm:pl-8"
            >
              <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                &ldquo;{active.review}&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-skysoft font-monoui text-sm font-semibold text-sky">
                  {initials(active.name)}
                </span>
                <span className="leading-tight">
                  <span className="block font-medium text-ink">{active.name}</span>
                  <span className="block text-sm text-slate2">{active.position}</span>
                </span>
              </div>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Selector rail — initials, no fake photos */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {items.map((t, idx) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Read ${t.name}'s testimonial`}
              aria-pressed={idx === i}
              className={`flex h-11 w-11 items-center justify-center rounded-full border font-monoui text-sm transition-colors ${
                idx === i
                  ? "border-sky bg-skysoft text-sky"
                  : "border-ink/15 bg-surface text-slate2 hover:border-sky/50 hover:text-sky"
              }`}
            >
              {initials(t.name)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
