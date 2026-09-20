"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

// Homepage sections tracked for scroll-spy highlighting, in document order.
const HASH_SECTION_IDS = ["home", "solutions", "contact"];

const CALENDLY = "https://calendly.com/chandannetha/30min";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeHash, setActiveHash] = useState("home");

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Scroll-spy: only the homepage has sections matching these ids.
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = HASH_SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href.slice(2);
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -110 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden flex-1 justify-center md:flex">
          <div
            className={`flex items-center gap-5 rounded-full border border-white/10 bg-ink px-6 py-2.5 text-[13px] font-medium tracking-wide text-white/70 transition-shadow duration-300 lg:gap-7 lg:text-sm ${
              scrolled
                ? "shadow-[0_14px_40px_-14px_rgba(8,18,26,0.6)]"
                : "shadow-[0_8px_24px_-16px_rgba(8,18,26,0.5)]"
            }`}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap py-0.5 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-skybright after:transition-all ${
                    active
                      ? "font-semibold text-white after:w-full"
                      : "hover:text-white after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Desktop Book a Call */}
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-11 shrink-0 items-center justify-center gap-2 rounded-none bg-sky px-5 text-sm font-medium text-white shadow-[0_10px_28px_-14px_rgba(2,132,199,0.7)] transition-colors hover:bg-skydeep md:flex"
        >
          <FiPhoneCall className="h-4 w-4" />

          <span className="lg:hidden">Book a call</span>
          <span className="hidden lg:inline">Book a strategy call</span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-ink/10 bg-surface text-xl text-ink shadow-[0_8px_24px_-16px_rgba(8,18,26,0.5)] md:hidden"
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
            className="mt-3 mx-1 flex flex-col items-center rounded-none border border-white/10 bg-ink text-white shadow-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-5 px-6 pb-8 pt-8">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`text-lg transition ${
                      active
                        ? "font-semibold text-white"
                        : "font-medium text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-sky px-8 py-4 text-base font-medium text-white transition-colors hover:bg-skydeep"
            >
              <FiPhoneCall className="h-5 w-5" />
              <span>Book a strategy call</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;