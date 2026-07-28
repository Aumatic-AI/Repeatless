"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import CaseStudyAbstract from "./CaseStudyAbstract";

type Props = {
  solution: string;
  stat: string;
  className?: string;
};

export default function CaseStudyVisual({ solution, stat, className }: Props) {
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden bg-[#0B0E1A] ${className ?? ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* Text layer — default state */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center gap-2 p-5"
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.3 }}
      >
        <p className="font-monoui text-[10px] uppercase tracking-[0.14em] text-skybright/80">{solution}</p>
        <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{stat}</p>
      </motion.div>

      {/* Abstract layer — hover / focus state */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <CaseStudyAbstract solution={solution} active={active} className="h-full w-full" />
      </div>
    </div>
  );
}
