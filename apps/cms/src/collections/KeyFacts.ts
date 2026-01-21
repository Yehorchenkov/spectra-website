import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { anyone } from '@/access/anyone'

export const KeyFacts: CollectionConfig = {
  slug: 'keyFacts',
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Key fact about SPECTRA for main page',
  },
  defaultSort: ['name'],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
