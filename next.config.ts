import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Workaround for Windows build issue with dynamic routes
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
