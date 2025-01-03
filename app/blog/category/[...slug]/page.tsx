import Header from "@/components/headers"
import { GET_CATEGORY_QUERY } from "@/data/gqols"
import { BlogCategory } from "@/data/schema"
import { SanityClient } from "@/utils/Sanity"
import BlogPageWrapper from "./BlogPageWrapper"
import { ResolvingMetadata, Metadata } from "next"

const getData = async (slug: string) => {
  const category: BlogCategory[] = await SanityClient().fetch(
    GET_CATEGORY_QUERY({ slug })
  )

  return {
    category: category[0],
  }
}

interface Props {
  params: {
    slug: string[]
  }
}

function capitalizeFirstLetter(value: string) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1)
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log("params", params)
  const categoryName = capitalizeFirstLetter(
    params?.slug[0].split("-").join(" ")
  )

  return {
    title: `${categoryName} | Victory Nwani`,
  }
}

const Page = async ({ params }) => {
  const { category } = await getData(params?.slug[0])

  return (
    <div>
      <Header />

      <BlogPageWrapper category={category} />
    </div>
  )
}

export const generateStaticParams = async () => {
  const categoryArticles: BlogCategory[] = await SanityClient().fetch(
    GET_CATEGORY_QUERY({})
  )

  const paths = categoryArticles.map(category => {
    return {
      slug: [category?.slug?.current],
    }
  })

  return paths
}

export default Page
