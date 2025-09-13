import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'used_by',
      title: 'Used By',
      type: 'string',
    }),
    defineField({
      title: 'Notification Text',
      name: 'notification_text',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'notification_text',
      media: 'image',
    },
  },
})
