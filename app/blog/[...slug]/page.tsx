import { ARTICLES_QUERY } from "@/data/gqols"
import { Article } from "@/data/schema"
import { SanityClient } from "@/utils/Sanity"
import { notFound } from "next/navigation"
import Header from "@/components/headers"
import BlogPageWrapper from "./BlogPageWrapper"

const getData = async ({ slug }: { slug: string }) => {
  const article = await SanityClient().fetch(ARTICLES_QUERY({ slug }))

  if (!article[0]?.slug) {
    return notFound()
  }

  return {
    article: article[0],
  }
}

const Page = async ({ params }) => {
  const article = await getData({ slug: params?.slug[0] })

  return (
    <div>
      <Header />

      <BlogPageWrapper article={article?.article} />
    </div>
  )
}

export const generateStaticParams = async () => {
  const allArticles: Article[] = await SanityClient().fetch(
    ARTICLES_QUERY({ type: "all" })
  )

  const filteredItems = allArticles.filter(
    item => !item.slug && !item.is_external
  )

  const paths = filteredItems.map(article => {
    return {
      slug: article?.slug?.current,
    }
  })

  return paths
}

export default Page
