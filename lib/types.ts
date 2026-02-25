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
  files?: CompletedFile[];
}

export interface UploadFile {
  localId: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  objectName?: string;
  error?: string;
}

export interface CompletedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
