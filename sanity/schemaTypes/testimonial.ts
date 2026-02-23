import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Role',
      type: 'string',
    }),
    defineField({
      name: 'initials',
      title: 'Initials (shown in avatar)',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'stars',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
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
    select: { title: 'author', subtitle: 'company' },
  },
});
