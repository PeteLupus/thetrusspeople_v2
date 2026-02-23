import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'thetrusspeople',
  title: 'The Truss People',

  // TODO: Replace with your actual Sanity project ID and dataset
  // Get these from sanity.io/manage after creating your project
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('galleryItem').title('Gallery Items'),
            S.divider(),
            S.documentTypeListItem('productPage').title('Products Page'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
