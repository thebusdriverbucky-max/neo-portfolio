import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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

export default withNextIntl(nextConfig);
