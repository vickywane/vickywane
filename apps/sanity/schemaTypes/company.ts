import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: "Company Name",
      type: 'string',
    }),
    defineField({
      name: 'company_link',
      title: 'Company Link',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'cloudinary.asset',
      description: 'Article cover image stored on Cloudinary',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'review_type',
      type: 'array',
      title: 'Review Type',
      description: 'Review Type',
      of: [
        defineArrayMember({
          type: 'string',
          name: 'review_type',
          options: {
            list: [
              {title: 'Technical Writing', value: 'technical_writing_review'},
              {title: 'Work Review', value: 'work_review'},
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
