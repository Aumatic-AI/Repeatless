"use client";

import Link from "next/link";
import Image from "next/image";

export default function MinimalNavbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <Link
        href="/"
        className="inline-flex shrink-0 transition-opacity hover:opacity-70"
        aria-label="Repeatless home"
      >
        <Image
          src="/images/logo.svg"
          alt="Repeatless"
          width={118}
          height={38}
          className="object-contain brightness-0 invert"
          priority
        />
      </Link>
    </header>
  );
}
