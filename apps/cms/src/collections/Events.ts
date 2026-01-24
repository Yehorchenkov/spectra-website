import type { CollectionConfig, CollectionAfterReadHook } from 'payload'
import { slugField } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isLoggedInOrPublished } from '@/access/isLoggedInOrPublished'
import { requireMetaOnPublish, validateDateRange } from '@/utils/utils'
import type { CollectionBeforeChangeHook, CollectionBeforeOperationHook } from 'payload'

// Hook to automatically calculate event state based on dates
const calculateEventStateHook: CollectionAfterReadHook = ({ doc }) => {
  if (!doc.startDate) return doc

  const now = new Date().getTime()
  const start = new Date(doc.startDate).getTime()
  // Use finishDate, fallback to startDate
  const finish = new Date(doc.finishDate || doc.startDate).getTime()

  if (now < start) {
    doc.eventState = 'upcoming'
  } else if (now > finish) {
    doc.eventState = 'past'
  } else {
    doc.eventState = 'ongoing'
  }

  return doc
}

const setFinishDateHook: CollectionBeforeChangeHook = ({ data, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.startDate && !data.finishDate) {
    data.finishDate = data.startDate
  }
  return data
}

const transformStateFilterHook: CollectionBeforeOperationHook = ({ args, operation }) => {
  // We only care about 'read' operations where a 'where' query is present
  if (operation === 'read' && 'where' in args && args.where) {
    const queryArgs = args as { where: Record<string, unknown> }
    const where = queryArgs.where
    
    // Check if the query contains eventState
    // Payload query objects can be nested, but for simple equals it looks like this:
    if (where.eventState && typeof where.eventState === 'object' && 'equals' in where.eventState) {
      const state = where.eventState.equals
      const now = new Date().toISOString()

      // 1. Remove the virtual field from the query so Payload doesn't 
      // try to find a column that doesn't exist or is stale
      delete where.eventState

      // 2. Translate the state into date logic
      if (state === 'upcoming') {
        where.startDate = { greater_than: now }
      } 
      else if (state === 'past') {
        // Since your setFinishDateHook ensures finishDate exists:
        where.finishDate = { less_than: now }
      } 
      else if (state === 'ongoing') {
        // Ongoing means: started in the past AND finishes in the future
        const existingAnd = Array.isArray(where.and) ? where.and : []

        where.and = [
          ...existingAnd,
          { startDate: { less_than_equal: now } },
          { finishDate: { greater_than_equal: now } }
        ]
      }
    }
  }
  return args
}

export const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    beforeOperation: [transformStateFilterHook],
    afterRead: [calculateEventStateHook],
    beforeValidate: [requireMetaOnPublish],
    beforeChange: [setFinishDateHook],
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
    subtitle: true,
    slug: true,
    projects: true,
    startDate: true,
    finishDate: true,
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
              name: 'subtitle',
              type: 'text',
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
                  'A short summary of the event article. Automatically generated from content.',
                components: {
                  Field: '/components/ExcerptComponent#ExcerptComponent'
                },
              },
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
            slugField({
              useAsSlug: 'title',
            }),
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
      validate: validateDateRange,
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
