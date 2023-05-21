export const HOME_QUERY = `
    *[_type == 'homepage'][0]{ 
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
    engagements[] -> {
        _createdAt,
        _id,
        thumbnail,
        summary, 
        type,
        name,
        event_name,
        event_link
     }, 
     notifications[] -> {
        _createdAt,
        _id,
        used_by, 
        notification_text
     }, 
    }
`;

export const REVIEWS_QUERY = (type: string) => `
  *[_type == 'review' && review_type[0] == "${type}"]{ 
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
`;
