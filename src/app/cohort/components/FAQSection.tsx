"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

type Block =
  | { t: "p"; v: string }
  | { t: "ul"; v: string[] }
  | { t: "table"; head: string[]; rows: string[][] };

type Item = { q: string; a: Block[] };
type Group = { title: string; items: Item[] };

const p = (v: string): Block => ({ t: "p", v });

const groups: Group[] = [
  {
    title: "",
    items: [
      {
        q: "I already have a few clients. Is this too basic for me?",
        a: [p(
          "No. This isn't about learning tools. It's about niche, positioning, outbound and pricing. If you can already build and deliver, this is the next step.",
        )],
      },
      {
        q: "Will Indian clients actually pay ₹1L a month?",
        a: [p(
          "Yes, when the offer is built around a business result and not a one-off bot. Module 1 teaches you to pick a high-budget niche, and you can also target international clients.",
        )],
      },
      {
        q: "Does LinkedIn outbound really work?",
        a: [p(
          "It works when your positioning and message are different from every \"I do AI automation\" DM. Module 4 gives you the exact system, so you start real conversations in the first month.",
        )],
      },
      {
        q: "What if I follow everything and don't make ₹1L?",
        a: [p(
          "You get a 100% refund. See the guarantee section for the exact terms.",
        )],
      },
      {
        q: "Is this live or recorded?",
        a: [p(
          "The cohort is recorded, so you get instant access. You also get bi-weekly live calls and priority support, so you're never stuck alone.",
        )],
      },
      {
        q: "Can I finish this while working or running client projects?",
        a: [p(
          "Yes. The program runs over 30 days, built so you can follow along with your current workload.",
        )],
      },
    ],
  },
];

function Answer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-3 px-6 pb-5 text-sm leading-relaxed text-slate">
      {blocks.map((b, i) => {
        if (b.t === "p") return <p key={i}>{b.v}</p>;
        if (b.t === "ul")
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-sky">
              {b.v.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        return (
          <div key={i} className="overflow-x-auto rounded-lg border border-ink/10">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead className="bg-surface2 text-ink">
                <tr>
                  {b.head.map((h) => (
                    <th key={h} className="px-3 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-ink/10 align-top">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-3 py-2 ${ci === 0 ? "font-medium text-ink" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          FAQ
        </Reveal>

        <div className="mt-12 flex flex-col gap-10">
          {groups.map((group, gi) => (
            <div key={group.title}>
              {group.title && <h3 className="eyebrow mb-4">{group.title}</h3>}
              <div className="flex flex-col gap-3">
                {group.items.map((item, i) => {
                  const key = `${gi}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="overflow-hidden rounded-xl border border-ink/10 bg-surface">
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
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
                            <Answer blocks={item.a} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
