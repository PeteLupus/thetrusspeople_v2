import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ─── Contact Info ───────────────────────────────────────────────
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),

    // ─── Navigation ─────────────────────────────────────────────────
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'URL (e.g. #about or /our-work)' },
          ],
        },
      ],
    }),

    // ─── Hero ────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label (small text above title)' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'ctaPrimary', type: 'string', title: 'Primary Button Text' },
        { name: 'ctaSecondary', type: 'string', title: 'Secondary Button Text' },
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: { hotspot: true },
        },
      ],
    }),

    // ─── Trust Items ─────────────────────────────────────────────────
    defineField({
      name: 'trustItems',
      title: 'Trust Items (Hero card)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon (text, number, or "checkmark")' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'string', title: 'Description' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),

    // ─── About ───────────────────────────────────────────────────────
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 4 },
        {
          name: 'image',
          type: 'image',
          title: 'About Image',
          options: { hotspot: true },
        },
      ],
    }),

    // ─── Accordion ───────────────────────────────────────────────────
    defineField({
      name: 'accordionItems',
      title: 'About Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'content', type: 'text', title: 'Content', rows: 3 },
          ],
        },
      ],
    }),

    // ─── Products Section ────────────────────────────────────────────
    defineField({
      name: 'productsSection',
      title: 'Products Section Header',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
      ],
    }),

    // ─── Stats ───────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'number', title: 'Number' },
            { name: 'suffix', type: 'string', title: 'Suffix (e.g. + or %)' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
        },
      ],
    }),

    // ─── Gallery Section ─────────────────────────────────────────────
    defineField({
      name: 'gallerySection',
      title: 'Gallery Section Header',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
      ],
    }),

    // ─── Testimonials Section ────────────────────────────────────────
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section Header',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
      ],
    }),

    // ─── Contact Section ─────────────────────────────────────────────
    defineField({
      name: 'contactSection',
      title: 'Contact Section Header',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
      ],
    }),

    // ─── Service Areas ───────────────────────────────────────────────
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ─── Footer ──────────────────────────────────────────────────────
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Column Title' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'href', type: 'string', title: 'URL' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // ─── Certifications ──────────────────────────────────────────────
    defineField({
      name: 'certifications',
      title: 'Certifications / Partner Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            {
              name: 'logo',
              type: 'image',
              title: 'Logo',
              options: { hotspot: false },
            },
          ],
        },
      ],
    }),
  ],
});
