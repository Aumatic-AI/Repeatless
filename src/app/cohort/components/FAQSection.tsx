"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "I'm a complete beginner with zero technical knowledge. Can I still do this?",
    a: "Yes. This cohort is built specifically for beginners. Everything is taught step-by-step, with done-for-you templates so you're not starting from scratch.",
  },
  {
    q: "How much time do I need to commit daily?",
    a: "1-2 hours a day is enough for learning, building, and outreach. Consistency matters more than long hours.",
  },
  {
    q: "I have a full-time job/college. Can I still manage this?",
    a: "Yes. The cohort is designed around live & pre- recorded sessions and flexible outreach work you can do around your existing schedule.",
  },
  {
    q: "What if I don't make ₹1L even after doing everything?",
    a: "You get a full refund. As long as you complete all modules, hit the minimum outreach/demo requirements, and apply the strategy within the guarantee window if you still don't hit ₹1L, we refund 100%.",
  },
  {
    q: "How do I claim the refund?",
    a: "Email/message us at [contact] with your proof of work completed modules, outreach log, and demo submissions. We verify within [X] days and process your refund within [X] business days. No long forms, no arguments if you did the work and didn't hit ₹1L, you get paid back.",
  },
  {
    q: "Do I need money to start for tools, ads, etc.?",
    a: "No major investment needed. Most tools we teach have free tiers enough to land your first few clients. No ad spend required to start.",
  },
  {
    q: "What happens after the 48 days?",
    a: "You'll have your first client(s) and real experience. From there, you get discounted access to our mid-level course to scale further bigger clients, higher pricing, recurring revenue.",
  },
];

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          FAQ
        </motion.h2>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 flex flex-col gap-3"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
