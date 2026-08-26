"use client";

import { useState } from "react";

type Props = {
  image: string;
  solution: string;
  stat: string;
  className?: string;
};

export default function CaseStudyVisual({ image, solution, stat, className }: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#0B0E1A] ${className ?? ""}`}>
      {!errored ? (
        <>
          <img
            src={image}
            alt={solution}
            onError={() => setErrored(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 bg-[#0B0E1A]/0 p-5 opacity-0 transition-all duration-300 ease-out group-hover:bg-[#0B0E1A]/70 group-hover:opacity-100">
            <p className="font-monoui text-[10px] uppercase tracking-[0.14em] text-skybright/80">{solution}</p>
            <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{stat}</p>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-center gap-2 p-5">
          <p className="font-monoui text-[10px] uppercase tracking-[0.14em] text-skybright/80">{solution}</p>
          <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{stat}</p>
        </div>
      )}
    </div>
  );
}
