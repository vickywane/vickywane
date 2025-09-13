import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'vacation_preview',
  title: 'Vacation Preview',
  type: 'document',
  fields: [
    defineField({
      name: 'vacation_name',
      title: 'Vacation Name',
      description: 'Name of the vacation trip',
      type: 'string',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description: 'List of images to show in carousel',
      of: [
        defineArrayMember({
          title: "Cloudinary Asset",
          type: 'cloudinary.asset',
          description: "Image stored on Cloudinary",
        }),
      ],
    }),
    defineField({
      title: 'Vacation Article',
      description: 'Article written for this vacation',
      name: 'article',
      type: 'reference',
      to: [{type: 'article'}],
    }),
  ],
  preview: {
    select: {
      title: 'vacation_name',
    },
  },
})
