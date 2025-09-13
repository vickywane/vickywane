import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'companies_list',
  title: 'Companies List',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover',
    },
  },
})
