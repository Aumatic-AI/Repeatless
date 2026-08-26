"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { blogs } from "../../../public/data/blogs";
import { useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

const caseStudies = blogs.filter((b) => b.category === "Case Study");
const rowOne = caseStudies.slice(0, Math.ceil(caseStudies.length / 2));
const rowTwo = caseStudies.slice(Math.ceil(caseStudies.length / 2));

type CaseStudy = (typeof caseStudies)[number];

function WorkTile({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/casestudies/${cs.slug}`}
      className="group mx-2.5 block w-[220px] shrink-0 sm:mx-3 sm:w-[340px]"
    >
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-[#0B0E1A] shadow-[0_24px_50px_-30px_rgba(8,18,26,0.5)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
          <span className="ml-1.5 truncate font-monoui text-[10px] lowercase text-white/45 sm:text-[11px]">
            workflow · {cs.hero.meta.solution}
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5 opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0">
            <p className="font-monoui text-[10px] uppercase tracking-[0.14em] text-skybright/80">
              {cs.hero.meta.solution}
            </p>
            <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
              {cs.hero.meta.stat}
            </p>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-5 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
            <p className="line-clamp-4 text-sm leading-relaxed text-white/80">{cs.excerpt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudies() {
  const reduce = useReducedMotion();

  return (
    <section id="case-studies" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">Selected work</p>
            <h2
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Real systems. Real results.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Every build below is a live automation we shipped — and still maintain.
            </p>
          </div>
          <Link
            href="/casestudies"
            className="group hidden shrink-0 items-center gap-1.5 font-medium text-slate transition-colors hover:text-ink sm:inline-flex"
          >
            View all case studies
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Marquee wall — two rows, opposite directions, full-bleed */}
      <div className="mt-12 flex flex-col gap-6 sm:mt-14">
        <Marquee speed={32} pauseOnHover play={!reduce} autoFill>
          {rowOne.map((cs) => (
            <WorkTile key={cs.slug} cs={cs} />
          ))}
        </Marquee>
        <Marquee
          speed={32}
          direction="right"
          pauseOnHover
          play={!reduce}
          autoFill
        >
          {rowTwo.map((cs) => (
            <WorkTile key={cs.slug} cs={cs} />
          ))}
        </Marquee>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <Link
          href="/casestudies"
          className="group inline-flex items-center gap-2 rounded-xl bg-ink px-8 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-400 hover:text-ink"
        >
          View all case studies
          <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
