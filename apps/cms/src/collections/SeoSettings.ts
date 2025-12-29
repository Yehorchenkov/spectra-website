// collections/SeoSettings.ts
import { CollectionConfig } from 'payload/types'

export const SeoSettings: CollectionConfig = {
  slug: 'seo-settings',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label', // Just for the Admin UI (e.g., "News Archive View")
      type: 'text',
      required: true,
    },
    {
      name: 'key', // The unique ID we use to fetch it (e.g., "news-archive")
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Unique key used by the code (e.g., "news-archive"). DO NOT CHANGE AFTER CREATION.' },
    },
    {
      name: 'filteredTemplates',
      type: 'group',
      fields: [
        {
          name: 'titleTemplate',
          type: 'text',
          label: 'Dynamic Title Template',
          admin: {
            description: 'Use {{filters}} and {{page}}',
          },
        },
        {
          name: 'descriptionTemplate',
          type: 'textarea',
          label: 'Dynamic Description Template',
          admin: {
            description: 'Use {{filter}}',
          },
        },
      ],
    },
  ],
}
