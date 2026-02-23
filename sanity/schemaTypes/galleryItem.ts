import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'page',
      title: 'Show On',
      type: 'string',
      options: {
        list: [
          { title: 'Home page gallery', value: 'home' },
          { title: 'Our Work page', value: 'ourWork' },
          { title: 'Both', value: 'both' },
        ],
      },
      initialValue: 'both',
    }),
    defineField({
      name: 'large',
      title: 'Large tile (Our Work page)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
});
