// TypeScript interfaces for The Truss People website

export interface NavLink {
  label: string;
  href: string;
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface Product {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  icon: 'truss' | 'frame' | 'floor' | 'steelwood' | 'measure' | 'crane' | 'delivery';
  image?: string;
}

export interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

export interface GalleryItem {
  image: string;
  title: string;
  description: string;
  large?: boolean;
  location?: string;
}

export interface Testimonial {
  stars: number;
  text: string;
  author: string;
  company: string;
  initials: string;
}

export interface ContactInfo {
  icon: 'map' | 'phone' | 'mail';
  title: string;
  content: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

// ─── Product Pages ────────────────────────────────────────────────────────────

export interface ProductBenefit {
  icon: 'shield' | 'timber' | 'ruler' | 'truck' | 'leaf' | 'users' | 'clock' | 'zap';
  title: string;
  description: string;
}

export interface ProductPageData {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  benefits: ProductBenefit[];
  content: string[];
  contentTitle?: string;
  features: string[];
  process: { step: string; description: string }[];
  processTitle?: string;
}

// ─── Quote Form ────────────────────────────────────────────────────────────────

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  preferredContact: 'email' | 'phone' | 'either';
  projectType: string;
  projectTypeOther?: string;
  projectStage: string;
  suburb: string;
  state: string;
  storeys: string;
  estimatedTimeline: string;
  additionalDetails?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
