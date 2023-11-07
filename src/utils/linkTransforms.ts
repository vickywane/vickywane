import { Article } from "@/data/schema"

export const getBlogUrl = (slug : Article['slug']) => {
    return `/blog/${slug?.current}`
  }