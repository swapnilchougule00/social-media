import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during the build
  },
  /* Add other config options here */
};

export default nextConfig;
