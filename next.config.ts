import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns, not the deprecated `domains` — `domains` warned on every
    // build and is slated for removal.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      // YouTube's actual thumbnail CDN (img.youtube.com just 302s here) — kept
      // as YouTubeFacade's fallback for any future video that doesn't have a
      // downloaded `thumbnailSrc` yet; the current webinar/cohort VSLs are
      // self-hosted (public/images/marketing/vsl-thumbnail.webp) instead.
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
    // No image anywhere in the app renders wider than 672px (the VSL
    // thumbnail's slot, whose own source tops out at 1280px anyway) — the
    // stock deviceSizes go up to 3840 for 4K displays, which this site never
    // needs and which only bloats every generated srcset.
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  experimental: {
    // Named-import tree-shaking for libraries used across nearly every
    // section (framer-motion, react-icons) instead of pulling the whole package.
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  async headers() {
    return [
      {
        // Static, unhashed marketing assets — safe to cache long since a
        // content change means a new filename, not an overwrite.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
