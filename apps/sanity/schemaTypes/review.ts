import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: "Reviewer Name",
      type: 'string',
    }),
    defineField({
      name: 'reviewer_link',
      title: 'Reviewer Link',
      description: "Reviewer Profile Link",
      type: 'string',
    }),
    defineField({
      name: 'reviewer_role',
      title: 'Reviewer Role',
      description: "Reviewer Role",
      type: 'string',
    }),
    defineField({
      name: 'company_link',
      title: 'Company Link',
      description: "Company Link",
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'work_duration',
      description: "Period Worked Together",
      title: 'Work Duration',
      type: 'string',
    }),

    defineField({
      title: 'Review Text',
      name: 'review_text',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // @TODO: This should not be an array. Should be a single property.
    defineField({
      name: 'review_type',
      type: 'array',
      title: 'Review Type',
      description: "Review Type",
      of: [
        defineArrayMember({
          type: 'string',
          name: "review_type",
          options: {
            list: [
              { title: "Technical Writing", value: "technical_writing_review" },
              { title: "Work Review", value: "work_review" }
            ]
          }
        }),
      ],
    }),
     
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'cloudinary.asset',
      description: "Reviewer Thumbnail",
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
