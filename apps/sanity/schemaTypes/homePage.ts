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
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'hero_pitch',
      title: 'Hero Pitch',
      type: 'text',
      rows: 3,
      description:
        'Short pitch under your name in the home hero. Falls back to the first paragraph of Banner Description.',
      validation: Rule => Rule.max(160).warning('Keep the pitch under 160 characters'),
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
      name: 'banner_image_alt',
      title: 'Banner Image Alt Text',
      type: 'string',
      description:
        'Describes the portrait for screen readers. Also shown in the hero\'s "ALT" popover. The site uses a generic description until this is filled in.',
      // A warning, not an error: the frontend has a fallback, so a missing alt text
      // shouldn't block publishing other homepage edits.
      validation: Rule => Rule.required().warning('Add alt text for the portrait'),
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
