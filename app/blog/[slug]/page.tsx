import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { PRODUCT_PAGES } from '@/lib/constants';
import PostBody from '@/components/blog/PostBody';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetrusspeople.com.au';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.featuredImageAlt || post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = post.relatedProducts
    .map((s) => ({ slug: s, title: PRODUCT_PAGES[s]?.title }))
    .filter((p): p is { slug: string; title: string } => Boolean(p.title));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.featuredImage ? `${BASE_URL}${post.featuredImage}` : `${BASE_URL}/assets/og-image.jpg`,
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    author: { '@type': 'Organization', name: post.author, url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'The Truss People',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-charcoal pt-[80px]">
        {post.featuredImage && (
          <div className="absolute inset-0">
            <Image src={post.featuredImage} alt={post.featuredImageAlt || post.title} fill className="object-cover opacity-25" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/85 to-charcoal/70" />
          </div>
        )}
        <div className="relative mx-auto max-w-[820px] px-6 pb-14 pt-12 md:pb-16">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-terracotta line-clamp-1">{post.title}</span>
          </nav>

          <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-terracotta">
            <span>{post.category}</span>
            <span className="text-gray-400">·</span>
            <span className="flex items-center gap-1 text-gray-300"><Clock className="h-3 w-3" />{post.readingTime} min read</span>
          </div>
          <h1 className="mb-5 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="text-lg text-gray-300">{post.description}</p>
          <p className="mt-6 text-sm text-gray-400">{post.author} · {formatDate(post.date)}</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 md:py-20">
        <article className="mx-auto max-w-[760px] px-6">
          <PostBody markdown={post.body} />
        </article>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-warm-white py-16 md:py-20">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
                What we make
              </span>
              <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">Related products</h2>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-heading text-lg font-bold text-charcoal">{rp.title}</span>
                  <ArrowRight className="h-5 w-5 text-terracotta transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">Ready to price your job?</h2>
          <p className="mx-auto mb-8 max-w-xl text-base text-gray-300">
            Send us your plans and get a comprehensive quote within 24 hours.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
