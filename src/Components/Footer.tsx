"use client";

import { FiMail, FiMapPin, FiPhone, FiInstagram } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Case Studies", href: "/casestudies" },
  { label: "About", href: "/about" },
  { label: "Book a strategy call", href: "https://calendly.com/chandannetha/30min" },
];

const socials = [
  { icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/chandan_cheripally_" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@chandankumarnetha" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky/20 blur-[110px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex max-w-xs flex-col gap-5">
          <Image src="/images/logo.svg" alt="Repeatless" width={132} height={44} className="object-contain" />
          <p className="text-sm leading-relaxed text-white/60">
            An AI automation agency helping teams across the USA, Canada &amp; Europe eliminate repetitive
            work with custom Claude AI &amp; n8n systems.
          </p>
          <p className="mt-2 text-sm text-white/40">© 2026 Repeatless. All rights reserved.</p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 font-medium text-white">Quick Links</h4>
          {quickLinks.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="mb-1 font-medium text-white">Contact</h4>
          <a
            href="mailto:contact@repeatless.in"
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <FiMail className="h-4 w-4 shrink-0 text-skybright" /> contact@repeatless.in
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C+L.B.+Nagar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <FiMapPin className="h-4 w-4 shrink-0 text-skybright" /> Hyderabad, L.B. Nagar
          </a>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <FiPhone className="h-4 w-4 shrink-0 text-skybright" /> +91 98498 84501
          </span>
          <div className="mt-2 flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-sky/50 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized brand wordmark closing the page. Decorative only — the
          accessible brand name is already carried by the logo above, so this
          is hidden from assistive tech and excluded from selection. Sized in
          vw (capped) so it holds the same edge-to-edge proportion at every
          width, and clipped so it sits flush to the bottom of the page. */}
      <div aria-hidden className="relative mt-4 border-t border-white/[0.07] pb-8 pt-10 sm:pb-12 sm:pt-14">
        <div className="mx-auto max-w-[1600px] overflow-hidden px-4 sm:px-6">
          {/* leading-none, not tighter: a cropped 'p' descender reads as a bug
              rather than a deliberate crop. */}
          <span className="block select-none bg-gradient-to-b from-[#cafb00]/[0.35] via-[#cafb00]/[0.15] to-[#cafb00]/[0.03] bg-clip-text text-center font-sans text-[clamp(2.75rem,18.8vw,18.4rem)] font-semibold leading-none tracking-[-0.055em] text-transparent">
            Repeatless
          </span>
        </div>
      </div>
    </footer>
  );
}
