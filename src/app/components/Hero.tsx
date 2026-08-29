"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { MagneticText } from "./hero/MagneticText";
import HeroNetworkScene from "./hero/HeroNetworkScene";

const proofPoints = [
  { value: "$50M+", label: "Combined client revenue" },
  { value: "40+", label: "Automations built" },
  { value: "30+", label: "Businesses automated" },
];

type HeroProps = {
  introComplete: boolean;
};

const Hero = ({ introComplete }: HeroProps) => {
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const eyebrowY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : -45]
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : -110]
  );

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : -72]
  );

  const proofY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : 90]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.76, 1],
    [1, 0.75, 0]
  );

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const rise: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden bg-black"
    >
      <HeroNetworkScene
        scrollProgress={scrollYProgress}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate={
            introComplete
              ? "show"
              : "hidden"
          }
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        >
          {/* Eyebrow */}

          <motion.div
            variants={rise}
            style={{
              y: eyebrowY,
              opacity: heroOpacity,
            }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2"
          >
            <span
              className="relative flex h-2 w-2"
              aria-hidden
            >
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CAFB00] opacity-30" />
              )}

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CAFB00]" />
            </span>

            <p className="eyebrow m-0 text-white/80">
              AI automation agency · Serving B2B worldwide
            </p>
          </motion.div>

          {/* Heading */}

          <motion.h1
            variants={rise}
            style={{
              y: titleY,
              opacity: heroOpacity,
            }}
            className="relative mt-7 max-w-5xl font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white [text-wrap:balance]"
          >
            <span className="block text-[#CAFB00]">
              We build custom AI that
            </span>

            <MagneticText
              text="scales your business."
              hoverText="works while you sleep."
              circleSize={240}
              className="mt-1 w-full"
              textClassName="text-white"
              hoverTextClassName="text-[#CAFB00]"
            />
          </motion.h1>

          {/* Description */}

          <motion.p
            variants={rise}
            style={{
              y: copyY,
              opacity: heroOpacity,
            }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-xl"
          >
            Unified AI infrastructure for B2B companies past $5M: built,
            operated, and maintained around the systems you already use.
          </motion.p>

          {/* CTA buttons */}

          <motion.div
            variants={rise}
            style={{
              y: copyY,
              opacity: heroOpacity,
            }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://calendly.com/chandannetha/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-white bg-ink px-6 py-3.5 font-medium text-white shadow-[0_16px_34px_-16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-slate"
            >
              Book a strategy call

              <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <Link
              href="/casestudies"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-ink/15 bg-surface px-6 py-3.5 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink"
            >
              See recent work

              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Proof points */}

          <motion.dl
            variants={rise}
            style={{
              y: proofY,
              opacity: heroOpacity,
            }}
            className="mt-12 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] text-left sm:grid-cols-3"
          >
            {proofPoints.map((point, index) => (
              <div
                key={point.label}
                className={`px-6 py-5 ${
                  index > 0
                    ? "border-t border-white/10 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <dd className="font-sans text-3xl font-semibold tracking-[-0.035em] text-white tabular-nums">
                  {point.value}
                </dd>

                <dt className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                  {point.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;