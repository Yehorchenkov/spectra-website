import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { isLoggedInOrPublished } from '@/access/isLoggedInOrPublished'
import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'
import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload'
import { generateExcerpt } from '@/utils/seo'
import { validateUrl, validateDateRange } from '@/utils/utils';
import { requireMetaOnPublish } from '@/utils/utils'
import { ValidationError } from 'payload'

// Hook to generate excerpt before saving
const generateProjectExcerptHook: CollectionBeforeChangeHook = ({ data, /* req, */ operation }) => {
  if (data.content && (operation === 'create' || operation === 'update')) {
    data.excerpt = generateExcerpt(data.content, 500)
  }
  return data
}

const enforceResponsible: CollectionBeforeValidateHook = ({ data }) => {
  const participants = Array.isArray(data?.projectParticipants) ? data.projectParticipants : []

  // At least one participant required
  if (participants.length === 0) {
    throw new ValidationError({
      errors: [
        {
          path: 'projectParticipants',
          message: 'Please add at least one participant to the project.',
        },
      ],
    })
  }

  // Find responsible participants
  const responsibleIndices: number[] = []
  participants.forEach((p, index) => {
    if (p?.isResponsible) {
      responsibleIndices.push(index)
    }
  })

  if (responsibleIndices.length === 0) {
    throw new ValidationError({
      errors: [
        {
          path: 'projectParticipants',
          message: 'Please mark exactly one participant as the responsible person.',
        },
      ],
    })
  }

  if (responsibleIndices.length > 1) {
    // Show error on each responsible checkbox that's checked
    const errors = responsibleIndices.map((index) => ({
      path: `projectParticipants.${index}.isResponsible`,
      message: 'Only one participant can be marked as responsible.',
    }))

    throw new ValidationError({ errors })
  }

  return data
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  hooks: {
    // Add hooks configuration
    beforeChange: [generateProjectExcerptHook],
    beforeValidate: [enforceResponsible, requireMetaOnPublish],
  },
  access: {
    read: isLoggedInOrPublished,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'acronym',
    description: 'Active and completed projects.',
    group: 'Content',
  },
  defaultPopulate: {
    title: true,
    acronym: true,
    program: true,
    slug: true,
    excerpt: true,
    projectParticipants: true,
    projectLogo: true,
    projectState: true,
    startDate: true,
  },
  defaultSort: ['-startDate', 'title'],
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
              name: 'projectLogo',
              label: 'Project logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'acronym',
              type: 'text',
              required: true,
            },
            {
              name: 'projectWebsite',
              label: 'Project Website',
              type: 'text',
              admin: {
                description: 'URL of the project website.',
              },
              validate: validateUrl,
            },
            {
              name: 'projectAcknowledgement',
              label: 'Project Acknowledgement',
              type: 'array',
              admin: {
                description: 'List of funding bodies or acknowledgements for the project.',
              },
              fields: [
                {
                  name: 'acknowledgementLogo',
                  label: 'Acknowledgement Logo',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'acknowledgementFormula',
                  label: 'Acknowledgement Formula',
                  type: 'text',
                  admin: {
                    description: 'Formula or text for the acknowledgement.',
                  },
                },
              ],
            },
            {
              name: 'projectParticipants',
              label: 'Project Participants',
              type: 'array',
              admin: {
                description: 'List of team members roles',
              },
              fields: [
                {
                  name: 'participantName',
                  type: 'relationship',
                  relationTo: 'team-members',
                  hasMany: false,
                },
                {
                  name: 'participantRole',
                  type: 'relationship',
                  relationTo: 'projectRoles',
                  hasMany: false,
                  admin: {
                    description:
                      'Role of the participant in the project including the responsible person.',
                  },
                },
                {
                  name: 'isResponsible',
                  label: 'Responsible for this project',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
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
              admin: {
                description:
                  'A short summary of the project article. Automatically generated from content.',
                readOnly: true, // Or true if you ONLY want it auto-generated
              },
            },
            {
              name: 'news',
              type: 'join',
              collection: 'news',
              on: 'projects',
              admin: {
                hidden: true,
              },
            },
            ...SlugField('title'),
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'startDate',
      label: 'Start date',
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
      name: 'finishDate',
      label: 'Planned or Actual Finish date',
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
    {
      name: 'projectState',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'active',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Current state of the project.',
      },
    },
  ],
}
