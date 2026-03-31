import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
