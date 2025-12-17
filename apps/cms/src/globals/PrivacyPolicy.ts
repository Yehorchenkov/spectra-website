import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Privacy Policy',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        description: 'When was this policy last updated?',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}