import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Don’t block builds because of ESLint errors
    ignoreDuringBuilds: true,
  },
  // ✅ Enable static HTML export
  output: "export",
  // ✅ Disable Next.js Image Optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
