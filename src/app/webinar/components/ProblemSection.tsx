"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";

const problems = [
  "You've seen people making money with AI but every time you try, you don't know where to start",
  "Your job doesn't pay enough, and every side hustle either needs capital or takes forever",
  "You think AI automation is \"for coders\" so you never even try",
  "Meanwhile, the gap between you and people already earning keeps growing",
];

export default function ProblemSection() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.55,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const listContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const listItem: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 12,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-12">

          {/* Left: Webinar Image */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="relative lg:col-span-2"
          >
            {/* Offset lime backdrop echoes the image's own accent color and keeps
                the dark illustration from reading as a flat cutout on bg-paper. */}
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-lime" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 bg-surface2">
              <Image
                src="/images/marketing/webinar.png"
                alt="AI automation webinar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Problems */}
          <div className="lg:col-span-3">
            <motion.h2
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="font-display text-[50px] font-semibold leading-tight tracking-tight text-ink"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Tired of Watching Others Make Money With AI While You&apos;re
              Stuck Scrolling?
            </motion.h2>

            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-12 flex flex-col gap-5"
            >
              {problems.map((item) => (
                <motion.li
                  key={item}
                  variants={listItem}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-sm bg-lime" />

                  <p className="text-lg leading-relaxed text-slate">
                    {item}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Closer */}
        <motion.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-12 max-w-2xl border-t-2 border-sky pt-5 text-center text-lg font-medium leading-relaxed text-ink"
        >
          The problem isn&apos;t AI. The problem is nobody&apos;s shown you the
          exact, simple path built for a complete beginner, with zero risk if
          it doesn&apos;t work.
        </motion.p>
      </div>
    </section>
  );
}