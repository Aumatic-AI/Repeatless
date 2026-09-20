"use client";

import { useState } from "react";
import Image from "next/image";

type YouTubeFacadeProps = {
  videoId: string;
  title: string;
  // A pre-downloaded local thumbnail (self-hosted, matching the container's
  // aspect-video ratio) avoids a third-party i.ytimg.com round trip for what
  // is usually the LCP element. Falls back to the remote hqdefault thumbnail
  // for callers that haven't downloaded one.
  thumbnailSrc?: string;
};

export default function YouTubeFacade({ videoId, title, thumbnailSrc }: YouTubeFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block h-full w-full cursor-pointer"
    >
      {/* i.ytimg.com directly — img.youtube.com just 302s here, costing a
          full extra round trip on this LCP-critical request. */}
      <Image
        src={thumbnailSrc ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="(min-width: 768px) 672px, 100vw"
        className="object-cover"
        priority
        fetchPriority="high"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5 fill-ink">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
