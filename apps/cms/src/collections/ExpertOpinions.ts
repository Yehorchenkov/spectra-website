import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isLoggedInOrPublished } from '@/access/isLoggedInOrPublished'
import { requireMetaOnPublish } from '@/utils/utils'

export const ExpertOpinions: CollectionConfig = {
  slug: 'expert-opinions',
  hooks: {
    beforeValidate: [requireMetaOnPublish],
  },
  access: {
    read: isLoggedInOrPublished,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Expert opinions and insights.',
    group: 'Content',
    defaultColumns: ['title', 'image', 'tags', 'publishDate'],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    image: true,
    excerpt: true,
    publishDate: true,
  },
  defaultSort: ['-publishDate', 'title'],
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          description: 'Main content',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Details',
          description: 'Additional details',
          fields: [
            {
              // Add the excerpt field
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description:
                  'A short summary of the article. Automatically generated from content.',
                components: {
                  Field: '/components/ExcerptComponent#ExcerptComponent'
                },
              },
            },
            slugField({
              useAsSlug: 'title',
            }),
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'expertOpinionsTags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
        description: 'The date this article was/will be published.',
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
