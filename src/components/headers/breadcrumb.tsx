import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"
import { Flex, Text } from "@/styles"

const Breadcrumb = () => {
  const pathname = usePathname()

  return (
    <Flex direction="row" mb="26px">
      {pathname?.split("/").map((item, idx) => {
        if (item === "") {
          return (
            <Flex key={idx} mr="10px">
              <Link href={"/"}>
                <Text> Home /</Text>
              </Link>
            </Flex>
          )
        }

        return (
          <Flex key={idx} mr="10px">
            <Link href={`/${item}`}>
              <Text style={{ textTransform: "capitalize" }}>
                {item.split("-").join(" ")}{" "}
                {idx + 1 < pathname?.split("/").length && "/"}
              </Text>
            </Link>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Breadcrumb
