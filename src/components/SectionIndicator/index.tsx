import { SectionBoxIndicator, Text } from "@/styles"

interface SectionIndicatorProps {
  text: string
  id: string
}

const SectionIndicator = ({ text, id }: SectionIndicatorProps) => (
  <SectionBoxIndicator placeItems="center">
    <Text color="#fff">
      <a id={id} href={`#${id}`}>
        {text}
      </a>
    </Text>
  </SectionBoxIndicator>
)

export default SectionIndicator
