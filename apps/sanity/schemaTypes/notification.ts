import {defineField, defineType} from 'sanity'

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
      description:
        'The announcement. Links you add here stay clickable in the banner.',
    }),
    defineField({
      name: 'tag_label',
      title: 'Tag label',
      type: 'string',
      description: 'Small label before the message. Leave empty for “New”.',
      validation: (rule) => rule.max(16),
    }),
    defineField({
      name: 'cta_label',
      title: 'Button label',
      type: 'string',
      description: 'Leave empty for “Read article →”.',
      validation: (rule) => rule.max(32),
    }),
    defineField({
      name: 'cta_url',
      title: 'Button link',
      type: 'url',
      description:
        'Where the button (and pulling the banner down) goes. Site paths like /blog/… are fine. Leave empty to use the first link in the text; with no link at all there is no button.',
      validation: (rule) =>
        rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
    defineField({
      name: 'starts_at',
      title: 'Show from',
      type: 'datetime',
      description: 'Optional. Hidden before this time.',
    }),
    defineField({
      name: 'ends_at',
      title: 'Hide after',
      type: 'datetime',
      description: 'Optional. Hidden from this time on.',
      validation: (rule) =>
        rule.custom((endsAt, context) => {
          const startsAt = (context.document as {starts_at?: string} | undefined)?.starts_at
          if (!endsAt || !startsAt) return true

          return new Date(endsAt) > new Date(startsAt) || 'Must be after “Show from”.'
        }),
    }),
  ],
  preview: {
    select: {
      title: 'notification_text',
      startsAt: 'starts_at',
      endsAt: 'ends_at',
    },
    prepare: ({title, startsAt, endsAt}) => {
      const text = Array.isArray(title)
        ? title
            .flatMap((block: {children?: {text?: string}[]}) => block.children ?? [])
            .map((span) => span.text ?? '')
            .join('')
        : ''
      const date = (value?: string) => (value ? new Date(value).toLocaleDateString() : '')
      const schedule =
        startsAt || endsAt ? `${date(startsAt) || '…'} → ${date(endsAt) || '…'}` : undefined

      return {title: text || 'Untitled notification', subtitle: schedule}
    },
  },
})
