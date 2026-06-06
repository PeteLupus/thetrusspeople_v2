import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

// Renders engine-generated markdown into branded, accessible blog content.
// Internal links (/products/...) become next/link; external links get rel=noopener.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 font-heading text-2xl font-bold text-charcoal md:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-heading text-xl font-bold text-charcoal">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-base leading-relaxed text-text-primary">{children}</p>
  ),
  ul: ({ children }) => <ul className="mb-5 ml-1 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 ml-5 list-decimal space-y-2">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-base leading-relaxed text-text-primary">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-xs text-terracotta">✓</span>
      <span>{children}</span>
    </li>
  ),
  a: ({ href, children }) => {
    const url = href || '#';
    if (url.startsWith('/')) {
      return <Link href={url} className="font-medium text-timber underline decoration-terracotta/40 underline-offset-2 transition-colors hover:text-terracotta">{children}</Link>;
    }
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-timber underline decoration-terracotta/40 underline-offset-2 transition-colors hover:text-terracotta">
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-terracotta bg-warm-white py-2 pl-5 pr-4 text-lg italic text-charcoal">{children}</blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-charcoal">{children}</strong>,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt }) => (
    <img src={typeof src === 'string' ? src : ''} alt={alt || ''} loading="lazy" className="my-8 w-full rounded-2xl border border-border" />
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border border-border bg-warm-white px-4 py-2 font-heading font-semibold text-charcoal">{children}</th>,
  td: ({ children }) => <td className="border border-border px-4 py-2 text-text-primary">{children}</td>,
};

export default function PostBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
