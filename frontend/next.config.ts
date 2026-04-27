import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint warnings/errors won't block production builds.
    // Run `npm run lint` separately in CI to catch issues.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
