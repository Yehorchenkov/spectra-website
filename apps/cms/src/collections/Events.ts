import type { CollectionConfig, CollectionAfterReadHook } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isLoggedInOrPublished } from '@/access/isLoggedInOrPublished'
import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'
import { requireMetaOnPublish } from '@/utils/utils'
import type { CollectionBeforeChangeHook } from 'payload'
import { generateExcerpt } from '@/utils/seo'

// Hook to automatically calculate event state based on dates
const calculateEventStateHook: CollectionAfterReadHook = ({ doc }) => {
  if (!doc.startDate) return doc

  const now = new Date()
  const startDate = new Date(doc.startDate)
  const finishDate = doc.finishDate ? new Date(doc.finishDate) : startDate

  if (now < startDate) {
    doc.eventState = 'upcoming'
  } else if (now > finishDate) {
    doc.eventState = 'past'
  } else {
    doc.eventState = 'ongoing'
  }

  return doc
}

const generateEventsExcerptHook: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (data.content && (operation === 'create' || operation === 'update')) {
    data.excerpt = generateExcerpt(data.content, 500)
  }
  return data
}

const setFinishDateHook: CollectionBeforeChangeHook = ({ data, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.startDate && !data.finishDate) {
    data.finishDate = data.startDate
  }
  return data
}

export const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    afterRead: [calculateEventStateHook],
    beforeValidate: [requireMetaOnPublish],
    beforeChange: [setFinishDateHook, generateEventsExcerptHook],
  },
  access: {
    read: isLoggedInOrPublished,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Events.',
    group: 'Content',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    image: true,
    projects: true,
    startDate: true,
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
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
            {
              name: 'eventState',
              label: 'Event state',
              type: 'select',
              options: [
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Past', value: 'past' },
              ],
              defaultValue: 'upcoming',
              admin: {
                readOnly: true,
                description: 'Automatically calculated from dates',
              },
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
              admin: {
                description:
                  'A short summary of the event article. Automatically generated from content.',
                readOnly: true,
              },
            },
            ...SlugField('title'),
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'startDate',
      label: 'Start date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'finishDate',
      label: 'Finish date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'eventTags',
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
