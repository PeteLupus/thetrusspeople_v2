import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'quotePage',
  title: 'Quote Page',
  type: 'document',
  // Singleton — creation/deletion handled by Studio structure
  fields: [
    defineField({
      name: 'hero',
      title: 'Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Label' }),
        defineField({ name: 'title', type: 'string', title: 'Heading' }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Message Title',
      type: 'string',
      description: 'Heading shown after form is submitted',
    }),
    defineField({
      name: 'successDescription',
      title: 'Success Message Description',
      type: 'text',
      description: 'Message shown after form is submitted',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Quote Page' };
    },
  },
});
