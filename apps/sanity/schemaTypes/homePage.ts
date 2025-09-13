import { defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'banner_text',
      title: 'Banner Text',
      type: 'string',
    }), 
    defineField({
      name: 'banner_description',
      title: 'Banner Description',
      type: 'string',
    }),
    defineField({
      name: 'banner_image',
      title: 'Banner Image',
      type: 'cloudinary.asset',
      description: "Banner Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Human Description',
      name: 'human_description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'gallery'},
          ]
        }
      ]
    }),
    defineField({
      title: 'Articles',
      name: 'articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'article'},
          ]
        }
      ]
    }),
    defineField({
      title: 'Experiences',
      name: 'experiences',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'work_experience'},
          ]
        }
      ]
    }),
    defineField({
      title: 'Projects',
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'projects'},
          ]
        }
      ]
    }),
    defineField({
      title: 'Engagements',
      name: 'engagements',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'engagement'},
          ]
        }
      ]
    }),
    defineField({
      title: 'Notifications',
      name: 'notifications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'notification'},
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'banner_text',
    },
  },
})
