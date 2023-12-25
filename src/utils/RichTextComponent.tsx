import {
  PortableText,
  PortableTextComponents,
  toPlainText,
} from "@portabletext/react"
import { Anchor, H2Heading, H3Heading, Text } from "@/styles"
import React from "react"
import Image from "next/image"
import { truncateText } from "./helpers"
import { ImageLoader } from "./Cloudinary"
import CloudinaryAssetRenderer from "@/components/Cloudinary/AssetRender"

interface RichTextComponentProps {
  richText: any
  isClamped?: boolean
  maxTextLength?: number
}

interface RichTextOpts extends Omit<RichTextComponentProps, "richText"> {
  listLength?: number
}

const RichTextComponent = ({
  richText,
  isClamped,
  maxTextLength,
}: RichTextComponentProps) => {
  let temp = ""

  const richTextParagraphs = React.useMemo(() => {
    if (Array.isArray(richText)) {
      const blocks = richText!.filter(
        // @ts-ignore
        item => item.style === "normal"
      )

      return blocks.length
    }
  }, [richText])

  const RichTextConfiguration = ({
    listLength,
    isClamped,
    maxTextLength,
  }: RichTextOpts): PortableTextComponents => ({
    types: {
      "cloudinary.asset": ({ value }) => (
        <CloudinaryAssetRenderer value={value} />
      ),
      image: ({ value }) => {
        return (
          <div>
            <Image loader={ImageLoader} alt="" src={value} />
          </div>
        )
      },
    },
    marks: {
      link: ({ children, value }) => {
        return <Anchor href={value.href} > {children} </Anchor>
      },
    },
    block: {
      h2: ({ children }) => {
        return <H2Heading fontWeight={500}>{children}</H2Heading>
      },
      h3: ({ children }) => {
        return <H3Heading fontWeight={400}>{children}</H3Heading>
      },
      normal: ({ children, value, index }) => {
        if (maxTextLength && richTextParagraphs) {
          temp += toPlainText(value)

          if (index + 1 < richTextParagraphs) {
            return <> </>
          }

          return <Text> {truncateText(temp, maxTextLength)} </Text>
        }

        return <Text> {children} </Text>
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul style={{ listStyle: "square", marginLeft: "16px" }}>
          {/* @ts-ignore */}
          <Text>{children.slice(0, isClamped ? listLength : 1000)}</Text>
        </ul>
      ),
    },
  })

  return (
    <PortableText
      value={richText}
      components={RichTextConfiguration({
        listLength: 2,
        isClamped,
        maxTextLength,
      })}
    />
  )
}

export default RichTextComponent
