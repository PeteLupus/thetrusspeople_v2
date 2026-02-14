// TypeScript interfaces for The Truss People website

export interface NavLink {
  label: string;
  href: string;
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface Product {
  title: string;
  description: string;
  features: string[];
  icon: 'truss' | 'frame' | 'floor' | 'ijoist';
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
