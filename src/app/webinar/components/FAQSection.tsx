"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

const faqs = [
  {
    q: "What time is the webinar and how do I join?",
    a: "September 27, 2026. You'll get the live link via WhatsApp/email right after you register.",
  },
  {
    q: "Do I need any prior AI or technical knowledge to attend?",
    a: "1-2 hours a day is enough for learning, building, and outreach. Consistency matters more than long hours.",
  },
  {
    q: "I have a full-time job/college. Can I still manage this?",
    a: "Yes. The cohort is designed around live & pre-recorded sessions and flexible outreach work you can do around your existing schedule.",
  },
  {
    q: "Is this webinar in Telugu or English?",
    a: "[Telugu/mix of Telugu-English] built specifically for the Telugu community.",
  },
  {
    q: "Will you be selling something during the webinar?",
    a: "Yes at the end, I'll share how you can go deeper with our full cohort if you want hands-on help implementing this. No pressure, the training itself is complete value on its own.",
  },
];

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          FAQ
        </Reveal>

        <Reveal as="div" amount={0.3} className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-ink/10 bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-ink"
                >
                  {item.q}
                  <FiChevronDown
                    className={`h-4 w-4 shrink-0 text-sky transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-slate">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
