import { Flex, Text } from "@/styles"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import styled from "styled-components"

interface SectionIndicatorProps {
  text: string
  id: string
}

export const SectionBoxIndicator = styled(Flex)`
  height: 50px;
  background: #131112;
  width: fit-content;
  padding: 0 45px;
  border-radius: 0 60px 0 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 40px;
    padding: 0 30px;
  }
`

const Anchor = styled.a`
  &:target {
    margin-top: 100px;
    background: red;
  }
`

const SectionIndicator = ({ text, id }: SectionIndicatorProps) => (
  <SectionBoxIndicator placeItems="center">
    <Text color="#fff">
      <Anchor id={id} href={`#${id}`}>
        {text}
      </Anchor>
    </Text>
  </SectionBoxIndicator>
)

export default SectionIndicator
