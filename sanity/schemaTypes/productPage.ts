import { defineType, defineField } from 'sanity';

// Singleton document for the /products page content
export default defineType({
  name: 'productPage',
  title: 'Products Page',
  type: 'document',
  // Singleton — creation/deletion handled by Studio structure
  fields: [
    defineField({
      name: 'hero',
      title: 'Page Hero',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'title', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text intro displayed above the product grid',
    }),
    defineField({
      name: 'whySection',
      title: 'Why Choose Our Products',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        {
          name: 'points',
          type: 'array',
          title: 'Points',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Point Title' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'buttonText', type: 'string', title: 'Button Text' },
        { name: 'buttonHref', type: 'string', title: 'Button Link' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description', rows: 2 },
      ],
    }),
  ],
});
