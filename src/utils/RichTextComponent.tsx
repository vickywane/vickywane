import {
  PortableText,
  PortableTextComponents,
  toPlainText,
} from "@portabletext/react"
import { H2Heading, H3Heading, Text } from "@/styles"
import { TypedObject } from "@portabletext/types"
import React from "react"
import Image from "next/image"
import { truncateText } from "./helpers"
import { ImageLoader } from "./Cloudinary"

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
      "cloudinary.asset": ({ value }) => {
        return (
          <div style={{ height: `550px`, margin: "26px 0",  width: "100%", position: "relative" }}>
            <Image
              fill
              style={{ position: "absolute", objectFit: "contain" }}
              loader={ImageLoader}
              alt={value?.title}
              src={value?.public_id}
            />
          </div>
        )
      },
      image: ({ value }) => {
        return (
          <div>
            <Image loader={ImageLoader} alt="" src={value} />
          </div>
        )
      },
    },
    block: {
      h1: ({}) => {
        return (
          <p> HEY H1 </p>
        )
      },
      h2: ({children}) => {
        return (
          <H2Heading fontWeight={500} >
            {children}
          </H2Heading>
        )
      },
      h3: ({children}) => {
        return (
          <H3Heading fontWeight={400}>
            {children}
          </H3Heading>
        )
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
        <ul style={{ listStyle: "square", marginLeft: "36px" }}>
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
