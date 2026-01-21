import { CollectionConfig, Validate } from 'payload'
import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'
import { validateUrl } from '@/utils/validateUrl'

import countriesData from '@/data/countries.json'
const countryOptions = countriesData
  .filter((country) => country.country) // Ensure country.country is defined
  .map((country) => ({
    label: country.country as string,
    value: country.abbreviation as string,
  }))

// Custom validation function for Lat/Lon
const validateLocation: Validate = (value, { siblingData }) => {
  // If showOnMap is checked (true)
  if (siblingData?.showOnMap) {
    // Check if value is not a number (checks for null, undefined, or empty string)
    // We strictly check typeof because 0 is a valid coordinate but falsy in JS
    if (typeof value !== 'number') {
      return 'This field is required when "Show on Map" is active.'
    }
  }
  return true
}

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      validate: validateUrl,
      admin: {
        description: 'Website URL of the partner organization.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'showOnMap',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'country',
      type: 'select',
      options: countryOptions,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'city',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lat',
      label: 'Latitude',
      type: 'number',
      validate: validateLocation,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lon',
      label: 'Longitude',
      type: 'number',
      validate: validateLocation,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
