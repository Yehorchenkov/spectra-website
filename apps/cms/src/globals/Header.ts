import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'
import { link } from '@/fields/link'

type NavItemType = 'link' | 'subData'
type NavItemSiblingData = { type?: NavItemType }

const whenNavType =
  (t: NavItemType) =>
  (_: unknown, siblingData?: NavItemSiblingData) =>
    siblingData?.type === t

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      labels: {
        singular: 'Navigation Item',
        plural: 'Navigation Items',
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'link',
          options: [
            { label: 'Single Link', value: 'link' },
            { label: 'Dropdown Menu', value: 'subData' },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        // 1. Case: Single Link (e.g., "Contact")
        link({
          overrides: {
            admin: {
              condition: whenNavType('link'),
            },
          },
        }),
        // 2. Case: Dropdown / Submenu (e.g., "Services" group)
        {
          name: 'groupLabel',
          label: 'Menu Label',
          type: 'text',
          required: true,
          admin: {
            condition: whenNavType('subData'),
            description: 'The clickable label for the dropdown',
          },
        },
        {
          name: 'subItems',
          type: 'array',
          labels: {
            singular: 'Sub Item',
            plural: 'Sub Items',
          },
          admin: {
            condition: whenNavType('subData'),
          },
          fields: [
            // This allows sub-items to link to Pages, External URLs, or System Routes (Collections)
            link(), 
          ],
        },
      ],
    },
  ],
}