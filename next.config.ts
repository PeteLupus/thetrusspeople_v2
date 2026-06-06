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
  // Pre-relaunch .html URLs still indexed by Google (and 404-ing). 301 them to the
  // new equivalents to recapture ranking equity. Source data: GSC, 2026-06 baseline.
  async redirects() {
    return [
      { source: '/timber-trusses-melbourne.html', destination: '/products/timber-roof-trusses', permanent: true },
      { source: '/roof-trusses-melbourne.html', destination: '/products/timber-roof-trusses', permanent: true },
      { source: '/prefab-trusses-melbourne.html', destination: '/products/timber-roof-trusses', permanent: true },
      { source: '/floor-trusses-melbourne.html', destination: '/products/floor-joists', permanent: true },
      { source: '/floor-joists.html', destination: '/products/floor-joists', permanent: true },
      { source: '/timber-wall-frames.html', destination: '/products/wall-frames', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/gallery.html', destination: '/our-work', permanent: true },
      { source: '/about.html', destination: '/#about', permanent: true },
      { source: '/testimonials.html', destination: '/#testimonials', permanent: true },
      { source: '/contact.html', destination: '/#contact', permanent: true },
    ];
  },
};

export default nextConfig;
