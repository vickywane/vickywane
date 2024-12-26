export const HOME_QUERY = `
    *[_type == 'homepage'][0]{ 
      _id,
       _createdAt,
       banner_text,
       banner_description,
       human_description,
       experiences[] -> {
         name,
         role,
         summary,
         description,
         start_date,
         end_date,
         thumbnail,
         url
       },
       gallery[0] -> {
         all_alt_texts,
         images 
       },
      "articles": articles[] -> {
        _createdAt,
        cover,
        is_external,
        is_travel_featured,
        publish_date,
        summary,
        tags,
        url,
        title
      },
      projects[] -> {
        publish_date,
        _id,
        name,
        description,
        github_url, 
        url,
        project_tools,
        cover
      },
    engagements[] -> {
        _createdAt,
        _id,
        thumbnail,
        summary, 
        type,
        name,
        event_name,
        event_link,
        session_link
     }, 
     notifications[] -> {
        _createdAt,
        _id,
        used_by, 
        notification_text
     }, 
    }
`

export const VACATION_PREVIEW_QUERY = `
*[_type == 'vacation_preview']{ 
    _id,
    vacation_name, 
    images, 
    article -> {
      summary,
      title,
      slug
    }
  }
`

export const COMPANIES_QUERY = `
  *[_type == 'company']{ 
    _id,
    _createdAt,
    name, 
    thumbnail,
    company_link
  }
`

export const REVIEWS_QUERY = (type: string) => `
  *[_type == 'review' && review_type[0] == "${type}"]{ 
    _id,
       _createdAt,
       name,
       review_type, 
       review_text,
       reviewer_role,
       company_link,
       thumbnail, 
       reviewer_link,
       company,
       work_duration
  }
`

interface QueryTypeProps {
  type?: string
  slug?: string
}

export const ARTICLES_QUERY = ({ type, slug }: QueryTypeProps) => {
  if (slug) {
    return `*[_type == 'article' && slug.current == "${slug}"] { 
      _id,
      _createdAt,
      cover, 
      body,
      is_external,
      is_travel_featured,
      slug, 
      summary, 
      gallery,
      tags,
      title, 
      recommended[] -> {
        _createdAt,
        _id,
        title, 
        summary,
        cover,
        slug
      },
      url,
      publish_date
    }`
  }

  return `
    *[_type == 'article']{
      _id, 
      _createdAt,
      cover, 
      is_external,
      is_travel_featured,
      slug, 
      summary, 
      tags,
      title, 
      url,
      publish_date
    }
`
}

export const GET_CATEGORY_QUERY = ({ slug }: QueryTypeProps) => {
  if (slug) {
    return `
    *[_type == 'blogCategory' && slug.current == "${slug}"] { 
        name, 
        slug,
        articles[] -> {
          _createdAt,
          _id,
          title, 
          summary,
          cover,
          slug
        },
        _createdAt
    }
  `
  }

  return `
  *[_type == 'blogCategory'] { 
      slug,
       name, 
      _createdAt,
      articles[] -> {
        _createdAt,
        _id,
        title, 
        summary,
        cover,
        slug
      }
  }
`
}
