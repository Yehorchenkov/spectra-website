// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor, FixedToolbarFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, SharpDependency } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// import { generateExcerpt } from './utils/generateExcerpt'
import { buildTitle, generateExcerpt } from './utils/seo'

// Plugins
import { seoPlugin } from '@payloadcms/plugin-seo'
// import { addAuthorsFields } from '@shefing/authors-info'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { NewsTags } from './collections/NewsTags'
import { Programs } from './collections/Programs'
import { Projects } from './collections/Projects'
import { Pages } from './collections/Pages'
import { TeamMembers } from './collections/TeamMembers'
import { Events } from './collections/Events'
import { EventTags } from './collections/EventTags'

// Blocks
import { ContentWithMedia } from './blocks/ContentWithMedia'
import { InlineImage } from './blocks/InlineImage'
import { ImageGallery } from './blocks/ImageGallery'

// Globals
import { Hero } from './globals/Hero'
import coordinatorsEndpoint from './endpoints/coordinators'
import { Partners } from './collections/Partners'
import { SocialPlatforms } from './collections/SocialPlatforms'
import { ScientificPlatforms } from './collections/ScientificPlatforms'
import { ProjectRoles } from './collections/ProjectRoles'
import { UserMedia } from './collections/UserMedia'
import { Footer } from './globals/Footer'
import { PrivacyPolicy } from './globals/PrivacyPolicy'
import { SeoSettings } from './collections/SeoSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbClient =
  process.env.DB_CLIENT ?? (process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite')

const db =
  dbClient === 'postgres'
    ? postgresAdapter({
        pool: {
          // use the same DATABASE_URI env var for Postgres
          connectionString: process.env.DATABASE_URI,
        },
      })
    : sqliteAdapter({
        client: {
          // e.g. file:./payload.sqlite (set via env)
          url: process.env.DATABASE_URI || '',
        },
      })

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    UserMedia,
    Partners,
    News,
    NewsTags,
    SocialPlatforms,
    ScientificPlatforms,
    ProjectRoles,
    Programs,
    Projects,
    Pages,
    TeamMembers,
    Events,
    EventTags,
    SeoSettings,
  ],
  globals: [Hero, Footer, PrivacyPolicy],
  endpoints: [coordinatorsEndpoint],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      // Add features array
      ...defaultFeatures,
      FixedToolbarFeature(), // Add the FixedToolbarFeature
      BlocksFeature({
        blocks: [ContentWithMedia, InlineImage, ImageGallery],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: sqliteAdapter({
  //   client: {
  //     url: process.env.DATABASE_URI || '',
  //   },
  // }),
  db,
  sharp: sharp as unknown as SharpDependency,
  plugins: [
    seoPlugin({
      tabbedUI: true,
      collections: ['pages', 'news', 'projects', 'events', 'team-members', 'seo-settings'],
      uploadsCollection: 'media',

      generateTitle: ({ doc, collectionSlug }) => {
        let rawTitle = doc.title || doc.name || 'Page'

        if (collectionSlug === 'projects') {
          rawTitle =
            doc.acronym && doc.title
              ? `${doc.acronym}: ${doc.title}`
              : doc.acronym || doc.title || rawTitle
        }

        return buildTitle(rawTitle)
      },

      generateDescription: ({ doc, collectionSlug }) => {
        const content = collectionSlug === 'team-members' ? doc.profile : doc.content
        return generateExcerpt(content) // Uses DESCRIPTION_MAX
      },

      generateURL: ({ doc, collectionSlug }) => {
        // 1. Use a robust fallback for the base URL
        const baseUrl = (process.env.PUBLIC_SITE_URL || 'http://localhost:3000').replace(
          /\/$/,
          '',
        )

        // 2. Handle the Homepage special case
        if (collectionSlug === 'pages' && doc.slug === 'home') {
          return `${baseUrl}/`
        }

        // 3. Handle Top-Level Pages (remove the "pages" prefix)
        if (collectionSlug === 'pages') {
          return `${baseUrl}/${doc.slug}/`
        }

        // 4. Handle Nested Collections (news, projects, etc.)
        return `${baseUrl}/${collectionSlug}/${doc.slug}/`
      },
    }),
    payloadCloudPlugin(),
  ],
})
