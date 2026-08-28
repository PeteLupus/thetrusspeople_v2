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
      // www.thetrusspeople.com.au answered 200 with the whole live site until
      // 2026-08-28, so every page existed on two hostnames and GSC was reporting page
      // rows under both. The apex is canonical; www redirects to it. Checked before
      // adding: WORKLOG's 2026-04-21 "www is already CNAME to apex" describes the old
      // cPanel DNS, not Vercel's behaviour after the May Cloudflare migration.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.thetrusspeople.com.au' }],
        destination: 'https://thetrusspeople.com.au/:path*',
        permanent: true,
      },
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
