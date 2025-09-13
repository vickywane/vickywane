import {defineArrayMember, defineField, defineType} from 'sanity'

// const projectData = [
//     {
//       name: "Email Application Extractor",
//       description:
//         " MyCurrency is a project for visualizing currency trends over a selected period. The Great British Pound (GBP), American Dollar (USD), Canadian Dollar (CAD), and Ghana Cedis (GHS) were the currencies selected to work within this project.",
//       tools: [
//         "AWS SageMake",
//         "AWS S3 Buckets",
//         "AWS APIGateway",
//         "AWS DynamoDB",
//         "AWS Lambda Functions",
//       ],
//       project_image:
//         "v1718966044/personal-portfolio-app/projects/hvemi0lu6nbkapskbs6m.png",
//     },
//   ]

export default defineType({
  name: 'projects',
  title: 'Engineering Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',
    }),
    defineField({
      name: 'github_url',
      title: 'GitHub URL',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'project_tools',
      type: 'array',
      title: 'Project Tools',
      description: 'List of tools or technologies used to develop project',
      of: [
        defineArrayMember({
          name: 'tools',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'cloudinary.asset',
      description: 'Project cover image on Cloudinary',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publish_date',
      title: 'Publish Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'cover',
    },
  },
})
