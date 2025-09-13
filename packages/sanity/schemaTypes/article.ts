import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Seo Summary',
      name: 'seo_summary',
      type: 'string',
      description: "Shortened Summary for SEO purposes",
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'cloudinary.asset'},
        defineArrayMember({
          type: 'youtube',
        }),
        defineArrayMember({
          type: 'code',
          name: 'codeField',
          title: 'Code field',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery',
      description: 'List of images to show',
      of: [
        defineArrayMember({
          title: 'Cloudinary Asset',
          type: 'cloudinary.asset',
          description: 'Images stored on Cloudinary',
        }),
      ],
    }),
    defineField({
      title: 'Recommended',
      name: 'recommended',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
        },
      ],
    }),

    defineField({
      name: 'is_travel_featured',
      title: 'Is Travel Featured?',
      type: 'boolean',
    }),
    defineField({
      name: 'is_external',
      title: 'Is External?',
      type: 'boolean',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags for item',
      of: [
        defineArrayMember({
          type: 'string',
          name: 'tag',
        }),
      ],
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'cloudinary.asset',
      description: 'Article cover image stored on Cloudinary',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publish_date',
      title: 'Publish Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover',
    },
  },
})
