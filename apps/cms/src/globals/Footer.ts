import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    // Brand Section
    {
      name: 'brandDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description displayed below the logo',
      },
    },
    // Quick Links
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    // Contact Info
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
      ],
    },
    // Social Links
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'X', value: 'X' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    // Bottom Bar
    {
      name: 'copyrightText',
      type: 'text',
      admin: {
        description: 'Copyright holder name (year is auto-generated)',
      },
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'external',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Opens in new tab',
          },
        },
      ],
    },
  ],
}