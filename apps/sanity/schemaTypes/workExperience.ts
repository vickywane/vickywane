import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work_experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      title: 'Url',
      name: 'url',
      type: 'string',
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'cloudinary.asset',
      description: 'Company Thumbnail',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'role',
    },
  },
})
