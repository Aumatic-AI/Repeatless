"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { MagneticText } from "./hero/MagneticText";
import HeroNetworkScene from "./hero/HeroNetworkScene";

const proofPoints = [
  { value: "$100M+", label: "Combined client revenue" },
  { value: "100+", label: "Automations built" },
  { value: "30+", label: "Businesses automated" },
];

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -45]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -72]);
  const proofY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.76, 1], [1, 0.75, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.35]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section ref={sectionRef} id="home" className="relative w-full overflow-hidden bg-paper">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div style={{ scale: glowScale }} className="absolute left-1/2 top-[-18rem] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-black/[0.045] blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <HeroNetworkScene scrollProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto flex min-h-[96svh] max-w-6xl items-center px-6 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <motion.div variants={container} initial="hidden" animate="show"
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <motion.div variants={rise} style={{ y: eyebrowY, opacity: heroOpacity }}
            className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-surface/75 px-4 py-2 shadow-[0_14px_32px_-24px_rgba(0,0,0,0.55)] backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-25" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            <p className="eyebrow m-0 text-slate2">AI automation agency · Serving B2B worldwide</p>
          </motion.div>

          <motion.h1 variants={rise} style={{ y: titleY, opacity: heroOpacity }}
            className="relative mt-7 max-w-5xl font-sans text-[clamp(2.75rem,6.25vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-ink [text-wrap:balance]">
            <span className="block">We build AI that</span>
            <MagneticText text="runs your business." hoverText="works while you sleep." circleSize={240} className="mt-1 w-full" />
          </motion.h1>

          <motion.p variants={rise} style={{ y: copyY, opacity: heroOpacity }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-slate sm:text-xl">
            Unified AI infrastructure for B2B companies past $5M—built, operated, and maintained around the systems you already use.
          </motion.p>

          <motion.div variants={rise} style={{ y: copyY, opacity: heroOpacity }} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="https://calendly.com/chandannetha/30min" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-medium text-white shadow-[0_16px_34px_-16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate">
              Book a strategy call
              <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link href="/casestudies"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-ink/15 bg-surface px-6 py-3.5 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink">
              See recent work
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.dl variants={rise} style={{ y: proofY, opacity: heroOpacity }}
            className="mt-12 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-ink/12 bg-surface/55 text-left shadow-[0_28px_70px_-42px_rgba(0,0,0,0.45)] backdrop-blur-md sm:grid-cols-3">
            {proofPoints.map((point, index) => (
              <div key={point.label} className={`px-6 py-5 ${index > 0 ? "border-t border-ink/10 sm:border-l sm:border-t-0" : ""}`}>
                <dd className="font-sans text-3xl font-semibold tracking-[-0.035em] text-ink tabular-nums">{point.value}</dd>
                <dt className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate2">{point.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
