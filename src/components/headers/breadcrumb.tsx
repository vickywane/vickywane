import { useRouter } from "next/router"
import React from "react"
import { Flex, Text } from "@/styles"
import Link from "next/link"

const Breadcrumb = () => {
  const router = useRouter()

  return (
    <Flex direction="row" mb="26px">
      {router.asPath.split("/").map((item, idx) => {
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
                {idx + 1 < router.asPath.split("/").length && "/"}
              </Text>
            </Link>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Breadcrumb
