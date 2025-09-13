import { SITEMAP_QUERY } from "@/data/gqols"
import { SanityClient } from "@/utils/Sanity"
import { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_DOMAIN

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_URL) {
    throw new Error("SITE_URL is not defined in environment variables")
  }

  const articles = await SanityClient().fetch(SITEMAP_QUERY)

  const articleUrls = articles.map((item: any) => {
    if (item?.articles) {
      return {
        url: `${SITE_URL}/blog/category/${item.slug.current}`,
        lastModified: new Date(item.publish_date),
        priority: 1,
      }
    }

    return {
      url: `${SITE_URL}/blog/${item.slug.current}`,
      lastModified: new Date(item.publish_date),
      priority: 1,
    }
  })

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    ...articleUrls,
  ]
}
