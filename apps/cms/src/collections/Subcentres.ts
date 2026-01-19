import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { anyone } from '@/access/anyone'

export const Subcentres: CollectionConfig = {
  slug: 'subcentres',
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'title',
    description: 'SPECTRA CE EU Subcentres',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  defaultSort: ['title'],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
        name: 'head',
        label: 'Head of Subcentre',
        type: 'relationship',
        relationTo: 'team-members',
        required: true,
        admin: {
          description: 'Select the team member who is the head of this subcentre.',
        },
    },
    {
      name: 'content',
      type: 'richText',
    },
    slugField({
      useAsSlug: 'title',
    }),
  ],
}
