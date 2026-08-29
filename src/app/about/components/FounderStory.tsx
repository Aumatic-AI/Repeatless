"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const socials = [
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/chandan_cheripally_" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@chandankumarnetha" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/" },
];

export default function FounderStory() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-36 sm:pb-28 sm:pt-40">
      <div className="mx-auto grid max-w-5xl items-start gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[300px] lg:sticky lg:top-32 lg:max-w-none"
        >
          {/* Own relative wrapper around just the image — sizing the lime
              backdrop against `motion.div` directly made it stretch to that
              div's full height (image + gap + the social row below), which
              bled the backdrop down over the social links. */}
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full bg-lime" />
            <div className="relative overflow-hidden rounded-none bg-surface2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder-repeatless.webp"
                alt="Chandan Kumar, founder & CEO of Repeatless"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2 text-sm font-medium text-slate transition-colors hover:border-sky/40 hover:text-sky active:scale-[0.97]"
              >
                <Icon className="h-4 w-4 text-sky" />
                {label}
                <FiArrowUpRight className="h-3.5 w-3.5 text-slate2 transition-colors group-hover:text-sky" />
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="eyebrow text-sky">About Repeatless</p>
          <h1
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Founder-led. Team-delivered.
          </h1>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate">
            <p>
              I started Repeatless because I couldn&apos;t stand watching good businesses drown in
              work that software should quietly handle.
            </p>
            <p>
              Today my team and I build real AI infrastructure for $5M+ businesses (the latest
              tools like Claude and Antigravity, combined with the systems you already run),{" "}
              <span className="font-semibold text-ink">
                fully done-for-you, so your team never touches the plumbing.
              </span>
            </p>
            <p>
              Companies representing <span className="font-semibold text-ink">$100M+ in combined revenue</span>{" "}
              move faster because we removed the busywork entirely. And for teams who want to build
              that capability in-house instead, we run Training &amp; Consulting: the same
              expertise, handed to your team rather than run for you.
            </p>
            <p>
              Repeatless isn&apos;t me working alone with AI tools. It&apos;s a named team, each
              person an expert in their lane, building and maintaining every system we ship.
            </p>
          </div>

          <div className="mt-8">
            <p className="font-display text-3xl italic text-ink">Chandan Kumar</p>
            <p className="mt-1 text-sm text-slate2">Founder · Sales, Content &amp; Growth · Repeatless</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
