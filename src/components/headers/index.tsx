"use client"
import React, { useRef } from "react"
import Image from "next/image"
import CustomButton from "@/components/Buttons"
import styled from "styled-components"
import { ImageLoader } from "@/utils/Cloudinary"
import { Flex, Text } from "@/styles"
import { FiMenu, FiX } from "react-icons/fi"
import { navigation_links } from "@/data/static"
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "@/styles/useStyleWidthQuery"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"

import { RootState } from "@/state"
import { handleBreadcrumbVisibility } from "@/state/slices/app.slice"
import { AiOutlineFilePdf } from "react-icons/ai"
import BreadcrumbMenu from "./BreadcrumbMenu"

const Head = styled.header<{ isBreadcrumbOpen: boolean }>`
  height: 90px;
  width: 100%;
  background: #fff;
  color: #115e65;
  z-index: 99999;
  display: flex;
  place-items: center;
  border-bottom: 2px solid #000;
  position: sticky;
  top: 0;

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1224px;
    margin: 0 auto;

    .container {
      display: flex;
      width: 100%;
      justify-content: space-between;
      place-items: center;
    }
  }

  .header-small-items {
    display: none;
  }

  .icon {
    font-size: 26px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    border-bottom: 2px solid #000;
    height: 85px;

    .header-small-items {
      display: flex;

      &:hover {
        cursor: pointer;
      }
    }

    .header-lg-items {
      display: none;
    }

    nav {
      padding: 0 40px;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    border-bottom: 1px solid #000;
    height: auto;
    padding: 15px 0;

    nav {
      padding: 0 20px;
    }
  }
`

const HeaderTitle = styled(Text)`
  font-weight: 700;
  font-size: 22.8131px;
  margin-left: 10px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    font-weight: 600;
    font-size: 18px;
  }

  :hover {
    color: #333333;
  }
`

const HeaderList = styled.ul`
  list-style: square;
  display: flex;
  place-items: center;

  li {
    margin: 0 25px;
  }
`

const Anchor = styled.div`
  color: #333333;
  font-family: "Space Grotesk", sans-serif;

  :hover {
    color: #115e65;

    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
`

const ImageContainer = styled.div`
  height: 51px;
  width: 53px;
  position: relative;
  border: 2px solid #333333;
  border-radius: 50%;

  img {
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 45px;
    width: 45px;
  }
`

const Index = () => {
  const dispatch = useDispatch()
  const { breadcrumb_visibility } = useSelector((state: RootState) => state.app)
  const headerRef = useRef<HTMLUListElement>(null)

  //TODO: FIGURE OUT EVENT LISTENER BUG
  // const closeEventListener = (event: MouseEvent) => {
  //   // @ts-ignore
  //   if (!headerRef.current?.contains(event.target)) {
  //     dispatch(handleBreadcrumbVisibility("CLOSE"))
  //   }
  // }

  // useLayoutEffect(() => {
  //   document.addEventListener("click", closeEventListener)

  //   return () => document.removeEventListener("click", closeEventListener)
  // })

  return (
    <Head ref={headerRef} isBreadcrumbOpen={breadcrumb_visibility === "OPEN"}>
      <nav>
        <div className="container">
          <a href={"/"}>
            <Flex placeItems={"center"}>
              <ImageContainer>
                <Image
                  loader={ImageLoader}
                  fill
                  alt={"Victory Nwani"}
                  src={"/personal-portfolio-app/icons/victory-picture.jpg"}
                />
              </ImageContainer>

              <Flex placeItems={"center"}>
                <HeaderTitle> Victory Nwani </HeaderTitle>
              </Flex>
            </Flex>
          </a>

          <div className={"header-lg-items"}>
            <HeaderList>
              {navigation_links.map(({ name, to }, idx) => (
                <li key={idx}>
                  <Anchor href={"#"}>
                    <Link href={to}>{name}</Link>
                  </Anchor>
                </li>
              ))}

              <li style={{ listStyle: "none" }}>
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
            </HeaderList>
          </div>

          {breadcrumb_visibility === "CLOSE" ? (
            <div
              onClick={() => dispatch(handleBreadcrumbVisibility("OPEN"))}
              className={"header-small-items"}
            >
              <FiMenu className={"icon"} />
            </div>
          ) : (
            <div
              onClick={() => dispatch(handleBreadcrumbVisibility("CLOSE"))}
              className={"header-small-items"}
            >
              <FiX className={"icon"} />
            </div>
          )}
        </div>

        <BreadcrumbMenu />
      </nav>
    </Head>
  )
}

export default Index
