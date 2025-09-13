import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'upload_batch_name',
      title: 'Upload Batch Name',
      type: 'string',
    }),

    defineField({
      name: 'all_alt_texts',
      type: 'array',
      title: 'All Paired Image Alt texts (for hover)',
      of: [
        defineArrayMember({
          type: 'string',
          name: 'tag',
        }),
      ],
    }),

    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        defineArrayMember({
          name: 'cover',
          title: 'Cover',
          type: 'cloudinary.asset',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'upload_batch_name',
    },
  },
})
