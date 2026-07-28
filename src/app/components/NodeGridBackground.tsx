"use client";

import { useId } from "react";

// Signature decorative motif — a sparse node-and-connector pattern echoing the
// automation workflows this site sells. Used faintly behind 1-2 key sections only.
export default function NodeGridBackground({ className = "" }: { className?: string }) {
  const id = useId();

  return (
    <svg aria-hidden className={`absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width="140" height="140" patternUnits="userSpaceOnUse">
          <path d="M22 22 L108 52 M108 52 L58 110" stroke="rgba(2,132,199,0.3)" strokeWidth="1" fill="none" />
          <circle cx="22" cy="22" r="2.5" fill="rgba(2,132,199,0.4)" />
          <circle cx="108" cy="52" r="2.5" fill="rgba(2,132,199,0.4)" />
          <circle cx="58" cy="110" r="2.5" fill="rgba(2,132,199,0.4)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
