import { client } from './client';
import {
  HERO,
  TRUST_ITEMS,
  ABOUT,
  ACCORDION_ITEMS,
  PRODUCTS_SECTION,
  PRODUCTS,
  STATS,
  GALLERY_SECTION,
  GALLERY_ITEMS,
  OUR_WORK_ITEMS,
  TESTIMONIALS_SECTION,
  TESTIMONIALS,
  CONTACT_SECTION,
  SERVICE_AREAS,
  FOOTER_COLUMNS,
  CERTIFICATIONS,
  NAV_LINKS,
  PHONE,
  EMAIL,
  ADDRESS,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from '../constants';

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0]{
        phone, email, address, facebookUrl, instagramUrl,
        navLinks,
        hero{ label, title, description, ctaPrimary, ctaSecondary, backgroundImage },
        trustItems,
        about{ label, title, description, image },
        accordionItems,
        productsSection,
        stats,
        gallerySection,
        testimonialsSection,
        contactSection,
        serviceAreas,
        footerColumns,
        certifications
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    return data || null;
  } catch {
    return null;
  }
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts() {
  try {
    const data = await client.fetch(
      `*[_type == "product"] | order(order asc) {
        _id, title, description, features, icon, image, longDescription, specs, applications
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    return data?.length ? data : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials() {
  try {
    const data = await client.fetch(
      `*[_type == "testimonial"] | order(order asc) {
        _id, stars, text, author, company, initials
      }`,
      {},
      { next: { revalidate: 60 } }
    );
    return data?.length ? data : TESTIMONIALS;
  } catch {
    return TESTIMONIALS;
  }
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getGalleryItems(page: 'home' | 'ourWork' | 'both' = 'home') {
  try {
    const filter =
      page === 'home'
        ? `*[_type == "galleryItem" && (page == "home" || page == "both")]`
        : `*[_type == "galleryItem" && (page == "ourWork" || page == "both")]`;

    const data = await client.fetch(
      `${filter} | order(order asc) { _id, title, description, image, large }`,
      {},
      { next: { revalidate: 60 } }
    );
    return data?.length ? data : (page === 'home' ? GALLERY_ITEMS : OUR_WORK_ITEMS);
  } catch {
    return page === 'home' ? GALLERY_ITEMS : OUR_WORK_ITEMS;
  }
}

// ─── Products Page ────────────────────────────────────────────────────────────

export async function getProductPage() {
  try {
    const data = await client.fetch(
      `*[_type == "productPage"][0]`,
      {},
      { next: { revalidate: 60 } }
    );
    return data || null;
  } catch {
    return null;
  }
}

// ─── Convenience: fetch everything for the home page in one go ────────────────

export async function getHomePageData() {
  const [settings, products, testimonials, galleryItems] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getTestimonials(),
    getGalleryItems('home'),
  ]);

  // Merge Sanity data with constants fallbacks
  return {
    phone: settings?.phone ?? PHONE,
    email: settings?.email ?? EMAIL,
    address: settings?.address ?? ADDRESS,
    facebookUrl: settings?.facebookUrl ?? FACEBOOK_URL,
    instagramUrl: settings?.instagramUrl ?? INSTAGRAM_URL,
    navLinks: settings?.navLinks ?? NAV_LINKS,
    hero: settings?.hero ?? HERO,
    trustItems: settings?.trustItems ?? TRUST_ITEMS,
    about: settings?.about ?? ABOUT,
    accordionItems: settings?.accordionItems ?? ACCORDION_ITEMS,
    productsSection: settings?.productsSection ?? PRODUCTS_SECTION,
    products,
    stats: settings?.stats ?? STATS,
    gallerySection: settings?.gallerySection ?? GALLERY_SECTION,
    galleryItems,
    testimonialsSection: settings?.testimonialsSection ?? TESTIMONIALS_SECTION,
    testimonials,
    contactSection: settings?.contactSection ?? CONTACT_SECTION,
    serviceAreas: settings?.serviceAreas ?? SERVICE_AREAS,
    footerColumns: settings?.footerColumns ?? FOOTER_COLUMNS,
    certifications: settings?.certifications ?? CERTIFICATIONS,
  };
}
