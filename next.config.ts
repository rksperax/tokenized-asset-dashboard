import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['coin-images.coingecko.com'], // Allow images from this domain
  },
};

export default nextConfig;
