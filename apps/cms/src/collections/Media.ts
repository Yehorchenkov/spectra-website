import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isLoggedIn } from '@/access/isLoggedIn'
import AltTextInstructions from '@/components/AltTextInstructions'

const generateCustomName = ({ originalName, sizeName, extension }) => {
  
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, "");
  
  // Return format: img10-thumbnail.jpg
  return `${nameWithoutExtension}-${sizeName}.${extension}`;
};

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text (Alternative Text) for images or description for other files',
      type: 'text',
      required: false,
      admin: {
        // @ts-expect-error Custom admin property
        description: AltTextInstructions,
        placeholder: 'e.g., "Attendees networking at the Annual Conference" or "Speaker presenting on stage"',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
        generateImageName: generateCustomName,
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
        generateImageName: generateCustomName,
      },
      {
        name: 'large',
        width: 1920,
        height: undefined, // undefined = maintain original aspect ratio
        withoutEnlargement: true, // If image is smaller than 1920, don't stretch it
        generateImageName: generateCustomName,
      },
    ],
    adminThumbnail: 'thumbnail',
    // mimeTypes: ['image/*', 'application/pdf'],
  },
}
