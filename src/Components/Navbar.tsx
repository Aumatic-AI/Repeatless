"use client";

import Link from "next/link";
import Image from "next/image";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/casestudies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const CALENDLY = "https://calendly.com/chandannetha/30min";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 12);

      if (Math.abs(currentScroll - lastScrollY) > 10) {
        setVisible(currentScroll < lastScrollY || currentScroll < 80);
        setLastScrollY(currentScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -110 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Logo — sits on the page ground, ink via filter (source SVG is white) */}
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-70"
          aria-label="Repeatless home"
        >
          <Image
            src="/images/logo.svg"
            alt="Repeatless"
            width={118}
            height={38}
            className="object-contain brightness-0"
            priority
          />
        </Link>

        {/* The dark pill — links only, Home → Contact */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div
            className={`flex items-center gap-5 lg:gap-7 px-6 py-2.5 rounded-full border border-white/10 bg-ink text-white/70 font-medium text-[13px] lg:text-sm tracking-wide transition-shadow duration-300 ${
              scrolled
                ? "shadow-[0_14px_40px_-14px_rgba(8,18,26,0.6)]"
                : "shadow-[0_8px_24px_-16px_rgba(8,18,26,0.5)]"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative whitespace-nowrap py-0.5 transition-colors hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-skybright after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Book a call (Desktop) — outside the pill, accent lives here */}
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex shrink-0 items-center gap-2 h-11 px-5 rounded-none bg-sky hover:bg-skydeep transition-colors text-white font-medium text-sm justify-center whitespace-nowrap shadow-[0_10px_28px_-14px_rgba(2,132,199,0.7)]"
        >
          <FiPhoneCall className="w-4 h-4" />
          <span className="lg:hidden">Book a call</span>
          <span className="hidden lg:inline">Book a strategy call</span>
        </a>

        {/* Mobile Toggle — Book a call lives inside the menu it opens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-ink/10 bg-surface text-ink text-xl shadow-[0_8px_24px_-16px_rgba(8,18,26,0.5)]"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="md:hidden mt-3 mx-1 rounded-none border border-white/10 bg-ink shadow-xl text-white flex flex-col items-center"
          >
            <div className="flex flex-col items-center gap-5 px-6 pb-8 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/80 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Full-width, zero-margin footer button — a direct child of the
                panel (not the padded div above) so it always sits flush
                against the panel's own left/right/bottom edges. */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-sky px-8 py-4 text-base font-medium text-white transition-colors hover:bg-skydeep"
            >
              <FiPhoneCall className="w-5 h-5" />
              <span>Book a strategy call</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
