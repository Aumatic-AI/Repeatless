import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns, not the deprecated `domains` — `domains` warned on every
    // build and is slated for removal.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
