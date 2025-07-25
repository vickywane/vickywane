import {
  PortableText,
  PortableTextComponents,
  toPlainText,
} from "@portabletext/react"
import { Anchor, H2Heading, H3Heading, H4Heading, Text, ULList } from "@/styles"
import React from "react"
import Image from "next/image"
import { truncateText } from "./helpers"
import { ImageLoader } from "./Cloudinary"
import CloudinaryAssetRenderer from "@/components/Cloudinary/AssetRender"
import ReactPlayer from "react-player"
import CodeBlock from "@/components/CodeBlock"

interface RichTextComponentProps {
  richText: any
  isClamped?: boolean
  maxTextLength?: number
  overrideStyle?: any
}

interface RichTextOpts extends Omit<RichTextComponentProps, "richText"> {
  listLength?: number
}

const RichTextComponent = ({
  richText,
  isClamped,
  maxTextLength,
  overrideStyle,
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
    overrideStyle,
  }: RichTextOpts): PortableTextComponents => ({
    types: {
      codeField: ({ value }) => {
        return <CodeBlock value={value} />
      },
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
      youtube: ({ value }) => {
        return (
          <div style={{ margin: "20px 0" }}>
            <ReactPlayer width="100%" height="700px" url={value?.url} />
          </div>
        )
      },
    },
    marks: {
      link: ({ children, value }) => {
        return <Anchor href={value.href}> {children} </Anchor>
      },
    },
    block: {
      h2: ({ children }) => {
        return <H2Heading fontWeight={500}>{children}</H2Heading>
      },
      h3: ({ children }) => {
        return <H3Heading fontWeight={400}>{children}</H3Heading>
      },
      h4: ({ children }) => {
        return <H4Heading fontWeight={400}>{children}</H4Heading>
      },
      normal: ({ children, value, index }) => {
        if (maxTextLength && richTextParagraphs) {
          temp += toPlainText(value)

          if (index + 1 < richTextParagraphs) {
            return <p> </p>
          }

          return (
            <Text style={overrideStyle}>
              {truncateText(temp, maxTextLength)}
            </Text>
          )
        }

        return <Text style={overrideStyle}> {children} </Text>
      },
    },
    list: {
      bullet: ({ children }) => {
        return <ul>{children?.slice(0, isClamped ? listLength : 1000)}</ul>
      },
    },
    // hardBreak: false,
    listItem: ({ children }) => {
      return (
        <ULList>
          <Text> {children} </Text>
        </ULList>
      )
    },
  })

  return (
    <PortableText
      value={richText}
      components={RichTextConfiguration({
        listLength: 3,
        isClamped,
        maxTextLength,
        overrideStyle,
      })}
      onMissingComponent={type => {
        console.warn(`Component for type "${type}" not found`)
        return null
      }}
    />
  )
}

export default RichTextComponent
