import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.shootside.in',
          },
        ],
        destination: 'https://shootside.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
