import styled from "styled-components"
import { Text } from "@/styles/"
import { navigation_links } from "@/data/static"
import { useSelector } from "react-redux"
import { RootState } from "@/state"
import { MOBILE_BREAKPOINT } from "@/styles/useStyleWidthQuery"
import CustomButton from "@/components/Buttons"
import { AiOutlineFilePdf } from "react-icons/ai"
import Link from "next/link"

const BreadcrumbContainer = styled.ul<{ isBreadcrumbOpen: boolean }>`
  list-style: square;
  height: ${props => (props.isBreadcrumbOpen ? "320px" : 0)};
  transition: 0.6s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  li {
    margin: 15px 60px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: ${props => (props.isBreadcrumbOpen ? "310px" : 0)};

    li {
      margin: 20px 20px;

      &:last-child {
        list-style: none;
        margin: 15px 5px;
      }
    }
  }
`

const BreadcrumbMenu = () => {
  const { breadcrumb_visibility } = useSelector((state: RootState) => state.app)

  return (
    <BreadcrumbContainer isBreadcrumbOpen={breadcrumb_visibility === "OPEN"}>
      {navigation_links.map(({ name, to }, idx) => (
        <li key={idx}>
          <Link href={to}>
            <Text> {name} </Text>
          </Link>
        </li>
      ))}

      <li>
        <a
          target="_blank"
          href="https://docs.google.com/document/d/1s_53gBc110F5yLT4yoQkBWtXgNdC6qnCz5rVBL589fc/edit?usp=sharing"
        >
          <CustomButton
            icon={<AiOutlineFilePdf size={24} />}
            text={"View Resume"}
            clickAction={() => {}}
          />
        </a>
      </li>
    </BreadcrumbContainer>
  )
}

export default BreadcrumbMenu
