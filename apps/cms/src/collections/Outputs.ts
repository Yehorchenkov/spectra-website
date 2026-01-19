import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { isLoggedIn } from '@/access/isLoggedIn'
import { anyone } from '@/access/anyone'
import { link } from '@/fields/link'

type DeliverableSiblingData = {
  deliverableSource?: 'file' | 'link'
}

export const Outputs: CollectionConfig = {
  slug: 'outputs',
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Outputs from SPECTRA team',
    group: 'Content',
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
      name: 'type',
      type: 'select',
      options: ['report', 'dataset', 'presentation', 'paper', 'other'],
      defaultValue: 'report',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'publishDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
            },
          },
          defaultValue: () => new Date().toISOString(),
        },
        { name: 'version', type: 'text' },
      ],
    },

    { name: 'summary', type: 'textarea' },

    {
      name: 'deliverableSource',
      type: 'radio',
      options: [
        { label: 'Upload file (PDF)', value: 'file' },
        { label: 'Link / reference', value: 'link' },
      ],
      defaultValue: 'file',
      required: true,
    },

    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_: unknown, siblingData: DeliverableSiblingData) =>
          siblingData?.deliverableSource === 'file',
      },
    },

    link({
      name: 'link',
      overrides: {
        admin: {
          condition: (_: unknown, siblingData: DeliverableSiblingData) =>
            siblingData?.deliverableSource === 'link',
          description: 'Use Internal Page / System Route / External URL',
        },
      },
    }),

    // sidebar fields
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'doi',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      useAsSlug: 'title',
      position: 'sidebar',
    }),
  ],
}
