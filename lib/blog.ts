import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// File-based blog. Posts are .mdx files in /content/blog with frontmatter.
// The content-engine writes these; the site reads them at build time. Git is the DB.

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  keywords: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  author: string;
  readingTime: number; // minutes
  relatedProducts: string[]; // product slugs
  body: string; // markdown
}

interface FrontMatter extends Omit<BlogPost, 'slug' | 'body' | 'readingTime'> {
  readingTime?: number;
}

function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as FrontMatter;

  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    category: fm.category || 'Guides',
    keywords: fm.keywords || [],
    featuredImage: fm.featuredImage,
    featuredImageAlt: fm.featuredImageAlt,
    author: fm.author || 'The Truss People',
    readingTime: fm.readingTime || estimateReadingTime(content),
    relatedProducts: fm.relatedProducts || [],
    body: content,
  };
}

/** All posts, newest first. Safe if the dir doesn't exist yet. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f)).map((f) => f.replace(/\.mdx?$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? `${slug}.mdx` : fs.existsSync(md) ? `${slug}.md` : null;
  return file ? readPost(file) : null;
}
