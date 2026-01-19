import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isLoggedInOrPublished } from '@/access/isLoggedInOrPublished'
// import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: isLoggedInOrPublished,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Different separate pages',
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOrUpdatedAt',
      type: 'date',
      required: true,
      admin: {
          date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
          },
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    // ...SlugField('title'),
    slugField({
      useAsSlug: 'title',
    }),
  ],
}
