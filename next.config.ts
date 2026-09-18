import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns, not the deprecated `domains` — `domains` warned on every
    // build and is slated for removal.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      // YouTube's actual thumbnail CDN (img.youtube.com just 302s here) — used
      // by the hero video facade's LCP thumbnail.
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
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
