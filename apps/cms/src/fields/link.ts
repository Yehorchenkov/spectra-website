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
            required: true,
            maxDepth: 1,
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'reference',
            },
            hooks: {
              afterRead: [
                ({ value }) => {
                  // Check if this is a polymorphic object (has relationTo + value)
                  if (value && typeof value === 'object' && 'relationTo' in value) {
                    const selectedDoc = value.value

                    // Only modify if the inner 'value' is actually populated (an object)
                    // If it's just an ID string, leave it alone so Admin can fetch it
                    if (selectedDoc && typeof selectedDoc === 'object') {
                      return {
                        relationTo: value.relationTo, // 👈 CRITICAL: Keep this for Admin UI
                        value: {
                          id: selectedDoc.id,
                          title: selectedDoc.title,
                          slug: selectedDoc.slug,
                          _status: selectedDoc._status,
                          // Add breadcrumbs if you use them
                          breadcrumbs: selectedDoc.breadcrumbs || undefined,
                        },
                      }
                    }
                  }
                  return value
                },
              ],
            },
          },
          // 2. System Routes
          {
            name: 'route',
            label: 'Choose an internal route',
            type: 'text',
            required: true,
            admin: {
              condition: (_, siblingData) => siblingData?.type === 'route',
              description: 'Internal route like /projects, /news, etc',
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
              description: 'Full reference to external source',
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
