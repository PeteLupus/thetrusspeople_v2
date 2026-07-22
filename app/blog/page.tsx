import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Truss & Frame Guides for Melbourne Builders',
  description:
    'Practical guides on roof trusses, wall frames and floor joists for Melbourne & Victoria builders and owner-builders — specs, costs, timelines and how prefab works.',
  alternates: { canonical: '/blog' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-charcoal pt-[80px]">
        <div className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-12 md:pb-20">
          <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
            The Truss People Blog
          </span>
          <h1 className="mb-6 max-w-3xl font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Trusses, frames & joists — explained
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Straight answers for Melbourne builders and owner-builders. Specs, costs, timelines and
            how prefabricated trusses and frames actually go together on site.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="bg-white py-24">
          <div className="mx-auto max-w-[1400px] px-6 text-center">
            <p className="text-lg text-text-light">New guides are on the way. Check back soon.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <section className="bg-white py-16 md:py-20">
              <div className="mx-auto max-w-[1400px] px-6">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid gap-8 overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:grid-cols-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                    {featured.featuredImage ? (
                      <Image
                        src={featured.featuredImage}
                        alt={featured.featuredImageAlt || featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-charcoal/5">
                        <span className="text-sm text-text-light">The Truss People</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:pr-12">
                    <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-terracotta">
                      <span>{featured.category}</span>
                      <span className="text-text-light">·</span>
                      <span className="flex items-center gap-1 text-text-light"><Clock className="h-3 w-3" />{featured.readingTime} min read</span>
                    </div>
                    <h2 className="mb-4 font-heading text-2xl font-bold text-charcoal md:text-3xl">{featured.title}</h2>
                    <p className="mb-6 text-base leading-relaxed text-text-light">{featured.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-all group-hover:gap-3">
                      Read the guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Rest of the posts */}
          {rest.length > 0 && (
            <section className="bg-warm-white py-16 md:py-24">
              <div className="mx-auto max-w-[1400px] px-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt={post.featuredImageAlt || post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-charcoal/5">
                            <span className="text-sm text-text-light">The Truss People</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta">
                          <span>{post.category}</span>
                          <span className="text-text-light">·</span>
                          <span className="text-text-light">{post.readingTime} min</span>
                        </div>
                        <h3 className="mb-2 font-heading text-lg font-bold text-charcoal">{post.title}</h3>
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-light line-clamp-3">{post.description}</p>
                        <span className="text-xs text-text-light">{formatDate(post.date)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">Got a project on the boards?</h2>
          <p className="mx-auto mb-8 max-w-xl text-base text-gray-300">
            Send us your plans for a comprehensive, no-obligation quote.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
