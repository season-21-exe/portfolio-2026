import type { NextConfig } from "next";

/**
 * Static export: the whole portfolio builds to plain HTML/CSS/JS in /out,
 * deployable to Vercel, Netlify, GitHub Pages or any static host.
 * Images are pre-optimised to AVIF/WebP by `npm run assets:build`
 * (see scripts/build-assets.mjs), so Next's runtime optimiser is not needed.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
