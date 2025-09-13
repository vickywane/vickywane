import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'engagement',
  title: 'Engagement',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: "Enagagement Name",
      type: 'string',
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'event_name',
      title: 'Event Name',
      description: "Event Name",
      type: 'string',
    }),
    defineField({
      name: 'event_link',
      title: 'Event Link',
      description: "Event Link",
      type: 'string',
    }),

    defineField({
      name: 'session_link',
      title: 'Session Link',
      description: "Link to your personal session",
      type: 'string',
    }),

    // @TODO: This should not be an array. Should be a single property.
    defineField({
      name: 'type',
      type: 'array',
      title: 'Type',
      description: "Engagement Type",
      of: [
        defineArrayMember({
          type: 'string',
          name: "type",
          options: {
            list: [
              { title: "Talk", value: "talk" },
              { title: "Podcast", value: "podcast" }
            ]
          }
        }),
      ],
    }),
     
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'cloudinary.asset',
      description: "Thumbnail",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'thumbnail',
    },
  },
})
