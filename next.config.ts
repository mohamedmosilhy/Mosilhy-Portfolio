import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: "/projects/:slug",
          destination: "/projects/not-found",
        },
      ],
    };
  },
};

export default nextConfig;
