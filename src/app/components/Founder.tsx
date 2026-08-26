"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const socials = [
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/chandan_cheripally_" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@chandankumarnetha" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/" },
];

export default function FounderSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -28, reduce ? 0 : 28]);

  return (
    <section id="founder" ref={sectionRef} className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Portrait — the candid, human shot */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[300px] lg:max-w-none"
        >
          <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full bg-lime" />
          <motion.div
            style={{ y: portraitY }}
            className="relative overflow-hidden rounded-none bg-surface2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder-repeatless.webp"
              alt="Chandan Kumar — founder & CEO of Repeatless"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* The note */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="eyebrow text-sky">A note from the founder</p>

          <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate">
            <p>
              I started Repeatless because I couldn&apos;t stand watching good businesses drown in work
              that software should quietly handle.
            </p>
            <p>
              Today my team and I build real AI infrastructure for $5M+ businesses — the latest tools
              like Claude and Antigravity, combined with the systems you already run —{" "}
              <span className="font-semibold text-ink">fully done-for-you, so your team never touches the plumbing.</span>
            </p>
            <p>
              Companies representing <span className="font-semibold text-ink">$100M+ in combined revenue</span>{" "}
              move faster because we removed the busywork entirely.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-8">
            <p className="font-display text-3xl italic text-ink">Chandan Kumar</p>
            <p className="mt-1 text-sm text-slate2">Founder &amp; CEO · Repeatless · Hyderabad, India</p>
          </div>

          {/* Platforms */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2 text-sm font-medium text-slate transition-colors hover:border-sky/40 hover:text-sky"
              >
                <Icon className="h-4 w-4 text-sky" />
                {label}
                <FiArrowUpRight className="h-3.5 w-3.5 text-slate2 transition-colors group-hover:text-sky" />
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 font-medium text-sky transition-colors hover:text-skydeep"
            >
              Meet the full team
              <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
