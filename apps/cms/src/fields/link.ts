import { Field } from 'payload'
import { validateUrl } from '@/utils/utils'

export const link = ({ name = 'link', overrides = {} } = {}): Field => {
  const linkResult: Field = {
    name,
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            options: [
              {
                label: 'Internal Page',
                value: 'reference',
              },
              {
                label: 'System Route', // NEW: For Collections/Globals lists
                value: 'route',
              },
              {
                label: 'External URL',
                value: 'custom',
              },
            ],
            defaultValue: 'reference',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
          },
          {
            name: 'newTab',
            label: 'Open in new tab',
            type: 'checkbox',
            admin: {
              width: '50%',
              style: {
                alignSelf: 'flex-end',
              },
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          // 1. Internal Page (Specific Docs)
          {
            name: 'reference',
            label: 'Document to link to',
            type: 'relationship',
            relationTo: ['pages'], // Only keep 'pages' here usually
            required: true,
            maxDepth: 1,
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'reference',
            },
          },
          // 2. System Routes (Collections/Globals) - NEW SECTION
          {
            name: 'route',
            label: 'Choose an internal route',
            type: 'text',
            required: true,
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'route',
              description: "Internal route like /projects, /news, etc",
            },
          },
          // 3. External URL
          {
            name: 'url',
            label: 'Custom URL',
            type: 'text',
            required: true,
            validate: validateUrl,
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'custom',
              description: "Full reference to external source",
            },
          },
        ],
      },
      {
        name: 'label',
        label: 'Label',
        type: 'text',
        required: true,
      },
    ],
  }

  return {
    ...linkResult,
    ...overrides,
  }
}