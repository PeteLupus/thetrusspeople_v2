/**
 * Sanity Studio embedded at /studio
 * Access it at: yourdomain.com/studio
 *
 * This route is intentionally excluded from the public navigation.
 * Only you (the site manager) need to know it exists.
 */
'use client';

import dynamic from 'next/dynamic';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const config = require('../../../sanity.config').default;
  return <NextStudio config={config} />;
}
