/**
 * Sanity Studio embedded at /studio
 * Access it at: yourdomain.com/studio
 *
 * This route is intentionally excluded from the public navigation.
 * Only you (the site manager) need to know it exists.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-dynamic';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
