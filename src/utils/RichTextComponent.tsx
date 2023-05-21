import {
  PortableText,
  PortableTextComponents,
  toPlainText,
} from "@portabletext/react"
import { Text } from "@/styles"
import { TypedObject } from "@portabletext/types"
import React from "react"
import { truncateText } from "./helpers"

interface RichTextComponentProps {
  richText: TypedObject | TypedObject[]
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
}: 
RichTextComponentProps) => {
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
    block: {
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
        <ul style={{ listStyle: "square" }}>
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
