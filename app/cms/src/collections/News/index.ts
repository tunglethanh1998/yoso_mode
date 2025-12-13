import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { PayloadRequest } from 'node_modules/payload/dist/types'
import { CollectionConfig, CollectionSlug } from 'payload'
import { hasText } from './functions/hasText'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'startDateTime', 'endDateTime', 'publishing_status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'important',
      options: [
        { label: '重要なお知らせ', value: 'important' },
        { label: 'コラム', value: 'column' },
        { label: 'キャンペーン情報', value: 'campaign' },
        { label: 'その他の新着情報', value: 'announcement' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDateTime',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'yyyy/MM/dd hh:mm:ss a',
            },
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'endDateTime',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'yyyy/MM/dd hh:mm:ss a',
            },
          },
          validate: (value: any, { siblingData }: { siblingData: any }) => {
            const start = (siblingData as any)?.startDateTime
            if (!value) return true
            if (start && new Date(value) < new Date(start)) {
              return '終了日時は開始日時より後である必要があります。'
            }
            return true
          },
        },
      ],
    },
    {
      name: 'isHighlighted',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (data: { type: string }) => {
          return data?.type === 'important'
        },
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data: any) => {
          return data.type === 'column'
        },
      },
      hasMany: false,
      filterOptions: {
        mimeType: { contains: 'image' }, // only allow image files
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }: { defaultFeatures: any }) => [
          ...defaultFeatures.filter((feature: any) => {
            return [
              'bold',
              'heading',
              'paragraph',
              'upload',
              'link',
              'unorderedList',
              'toolbarInline',
            ].includes(feature.key)
          }),
          HeadingFeature({ enabledHeadingSizes: ['h1'] }),
        ],
      }),
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'isNew',
      type: 'checkbox',
      admin: {
        hidden: true,
      },
      hooks: {
        // News Tag will be display 7 day from publish day
        afterRead: [
          ({ siblingData }: { siblingData: any }) => {
            const start = new Date(siblingData.startDateTime)
            const now = new Date()
            const diffDays = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
            return diffDays <= 7
          },
        ],
      },
    },
    {
      name: 'hasContent',
      type: 'checkbox',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }: { siblingData: any }) => {
            return hasText(siblingData.content)
          },
        ],
      },
    },
  ],
  timestamps: true,
  endpoints: [
    {
      path: '/detail/:id',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        const id = req.routeParams?.id

        const doc = await req.payload.findByID({
          collection: News.slug as CollectionSlug,
          id: id as CollectionSlug,
          depth: 2,
        })

        return Response.json(doc, { status: 200 })
      },
    },
  ],
}
