import { Field } from 'payload'
import { validateUrl } from '@/utils/utils'

type LinkType = 'reference' | 'route' | 'custom'
type LinkSiblingData = { type?: LinkType }

const isType =
  (t: LinkType) =>
  (_: unknown, siblingData?: LinkSiblingData) =>
    siblingData?.type === t

type ValidateArgs = { siblingData?: LinkSiblingData }

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
              { label: 'Internal Page', value: 'reference' },
              { label: 'System Route', value: 'route' },
              { label: 'External URL', value: 'custom' },
            ],
            defaultValue: 'reference',
            admin: { layout: 'horizontal', width: '50%' },
          },
          {
            name: 'newTab',
            label: 'Open in new tab',
            type: 'checkbox',
            admin: { width: '50%', style: { alignSelf: 'flex-end' } },
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
            relationTo: ['pages', 'news', 'projects', 'events', 'team-members'],
            maxDepth: 1,
            admin: {
              condition: isType('reference'),
              description: 'Reference to the existing document'
            },
            validate: (value: unknown, args: ValidateArgs) => {
              if (args.siblingData?.type !== 'reference') return true
              return value ? true : 'Please select a document'
            },
          },
          // 2. System Routes
          {
            name: 'route',
            label: 'Choose an internal route',
            type: 'text',
            admin: {
              condition: isType('route'),
              description: 'Internal route like /projects, /news, etc',
            },
            validate: (value: unknown, args: ValidateArgs) => {
              if (args.siblingData?.type !== 'route') return true
              return typeof value === 'string' && value.trim() ? true : 'Please enter a route'
            },
          },
          // 3. External URL
          {
            name: 'url',
            label: 'Custom URL',
            type: 'text',
            admin: {
              condition: isType('custom'),
              description: 'Full reference to external source',
            },
            validate: (value: unknown, args: ValidateArgs) => {
              if (args.siblingData?.type !== 'custom') return true
              if (typeof value !== 'string' || !value.trim()) return 'Please enter a URL'
              return validateUrl(value)
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
