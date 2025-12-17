import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'
import { SlugField } from '@nouance/payload-better-fields-plugin/Slug'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'name',
    description: 'SPECTRA team members.',
    defaultColumns: ['name', 'title', 'photo', 'profile', 'order'],
  },
  defaultPopulate: {
    name: true,
    slug: true,
    photo: true,
    order: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Job title or position, e.g., Project Manager, etc.',
              },
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'user-media',
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              admin: {
                description: 'Email address of the team member.',
              },
            },
            {
              name: 'address',
              type: 'text',
              admin: {
                placeholder: 'Odbojárov 10, P.O.Box 95, 820 18 Bratislava, Slovakia',
                description: 'Physical address of the team member.',
              },
            },
          ],
        },
        {
          label: 'Profile',
          fields: [
            {
              name: 'profile',
              type: 'richText',
              required: false,
              admin: {
                description:
                  "A brief summary of the team member's scientific profile and research interests.",
              },
            },
            {
              name: 'additionalInfo',
              type: 'richText',
              admin: {
                description: 'Any other relevant information about the team member.',
              },
            },
          ],
        },
        {
          label: 'Links',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              admin: {
                description: "Links to the team member's social profiles or personal website.",
              },
              fields: [
                {
                  name: 'platform',
                  type: 'relationship',
                  relationTo: 'socialPlatforms',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'The full URL to the profile.',
                  },
                },
              ],
            },
            {
              name: 'scientificLinks',
              type: 'array',
              admin: {
                description:
                  "Links to the team member's scientific profiles like ORCID, Google Scholar, etc.",
              },
              fields: [
                {
                  name: 'platform',
                  type: 'relationship',
                  relationTo: 'scientificPlatforms',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'The full URL to the profile or identifier.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'join',
      collection: 'projects',
      on: 'projectParticipants.participantName',
      admin: {
        hidden: true,
      },
    },
    // Sidebar fields
    {
      name: 'showOnLandingPage',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description:
          'Order in which team member appears on landing page (lower numbers appear first)',
      },
    },
    ...SlugField('name'),
  ],
}
