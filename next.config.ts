import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use 'export' if we are specifically building for Capacitor
  output: process.env.IS_CAPACITOR ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;