import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Users } from './collections/Users'
import { S3_PREFIX } from './libs/enums'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const parseEnvList = (envValue?: string): string[] => {
  if (!envValue?.trim()) {
    return []
  }
  return envValue
    ? envValue
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    : []
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, News],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  cors: parseEnvList(process.env.CORS_ORIGINS),
  csrf: parseEnvList(process.env.CSRF_ORIGINS),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      bucket: process.env.AWS_S3_BUCKET_NAME || '',
      config: {
        region: process.env.AWS_S3_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
        },
      },
      collections: {
        media: {
          prefix: S3_PREFIX.PUBLIC_ASSETS,
          generateFileURL: async ({ filename }) => {
            return `${process.env.AWS_CLOUDFRONT_PREFIX}/${S3_PREFIX.PUBLIC_ASSETS}/${encodeURIComponent(filename)}`
          },
        },
      },
    }),
  ],
})
