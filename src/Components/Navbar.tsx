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
      <nav
        className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full border border-white/10 bg-ink transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_14px_40px_-14px_rgba(8,18,26,0.6)]"
            : "shadow-[0_8px_24px_-16px_rgba(8,18,26,0.5)]"
        }`}
      >
        {/* Logo — white source SVG reads on the ink pill */}
        <Link href="/" className="flex items-center gap-2" aria-label="Repeatless home">
          <Image
            src="/images/logo.svg"
            alt="Repeatless"
            width={124}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white/70 font-medium text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-skybright after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Book a Demo (Desktop) — accent lives here */}
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 h-11 px-5 rounded-full bg-sky hover:bg-skydeep transition-colors text-white font-medium text-sm justify-center"
        >
          <FiPhoneCall className="w-4 h-4" />
          <span>Book a strategy call</span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl p-2"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="md:hidden mt-3 mx-1 rounded-3xl border border-white/10 bg-ink shadow-xl text-white flex flex-col items-center gap-5 py-8"
          >
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
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-11 px-6 rounded-full bg-sky hover:bg-skydeep transition-colors text-white font-medium text-sm justify-center"
            >
              <FiPhoneCall className="w-4 h-4" />
              <span>Book a strategy call</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
