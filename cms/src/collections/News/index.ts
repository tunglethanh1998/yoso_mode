import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig, CollectionSlug, PayloadRequest } from 'payload'
import { hasText } from './functions/hasText'

const maxTitleLength = 60

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
      label: 'タイトル',
      type: 'text',
      required: true,
      maxLength: maxTitleLength,
    },
    {
      name: 'type',
      label: 'タイプ',
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
          label: '開始日時',
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
          label: '終了日時',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'yyyy/MM/dd hh:mm:ss a',
            },
          },
          validate: (value, { siblingData }) => {
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
      label: 'ハイライト',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (data) => {
          return data?.type === 'important'
        },
      },
    },
    {
      name: 'thumbnail',
      label: 'サムネイル',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => {
          return data?.type === 'column'
        },
      },
      hasMany: false,
      filterOptions: {
        mimeType: { contains: 'image' }, // only allow image files
      },
    },
    {
      name: 'content',
      label: 'コンテンツ',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => {
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
      label: 'リンク',
      type: 'text',
    },
    {
      name: 'onTeaser',
      label: 'ティーザー表示',
      type: 'checkbox',
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
          ({ value, siblingData }) => {
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
          ({ value, siblingData }) => {
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
