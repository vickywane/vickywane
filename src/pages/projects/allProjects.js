import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FiSearch } from "react-icons/fi"
import media from "styled-media-query"
import Flex from "styled-flex-component"

import Header from "../../components/header"
import Layout from "../../components/layout"
import {
  Body,
  ProjectGrid,
  Bounce,
  Text,
  Input,
  SearchBody,
} from "../../styles/styles"
import ProjectCard from "./projectCard"

// TODO: Read on the usage of Arr.Find(() => {})

const data = [
  {
    id: 1,
    name: "Unispoon",
    link: "",
    tools: "",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
    gitlink: "https://github.com/vickywane/unispoon",
  },
  {
    id: 3,
    name: "Travoi",
    link: "",
    tools: "",
    gitlink: "https://github.com/vickywane/travoi",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1582424123/portfolio/travoy.png",
  },
  {
    id: 4,
    name: "Patfin School",
    link: "",
    tools: "",
    gitlink: "https://github.com/patfin-school/website",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1582423440/portfolio/Screenshot_304.png",
  },
  {
    id: 5,
    name: "UseCases",
    link: "",
    tools: "",
    gitlink: "https://github.com/vickywane/usecases",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
  {
    id: 6,
    name: "EventFul",
    link: "",
    tools: "",
    gitlink: "https://github.com/fundry/event",
    imgUrl:
      "https://res.cloudinary.com/dkfptto8m/image/upload/v1559073852/portfolio/unis-2.png",
  },
]

const Projects = () => {
  const [Search, setSearch] = useState(false)
  const [SearchResults, setSearchResults] = useState("")
  const [number, setNumber] = useState(0)

  // for (let No = 0; No < ProjectData.length; No++) {
  //   setNumber(No);
  // }

  useEffect(() => {
    data.forEach(() => {
      setNumber(number + 1)
    })
  }, [])

  return (
    <Layout>
      <Header title="Projects" link="/projects/allprojects" />
      <Body>
        <Flex justifyCenter>
          <Body>
            <SearchBody
              onClick={() => {
                setSearch(true)
              }}
            >
              <Flex justifyBetween>
                <FiSearch style={{ fontSize: "1.7rem" }} />

                <Input
                  placeholder="Project keyword"
                  value={SearchResults}
                  onChange={e => {
                    setSearchResults(e.target.value)
                  }}
                />
              </Flex>
            </SearchBody>
          </Body>
        </Flex>

        <br />

        {!Search ? (
          <Text> Showing {number} projects </Text>
        ) : (
          <Text>
            {" "}
            Searching for :{" "}
            <b style={{ fontWeight: "570" }}> {SearchResults}</b>
          </Text>
        )}

        <hr />
        <ProjectGrid>
          {data.map(({ id, name, gitlink, imgUrl, link, tools }) => {
            return (
              <Bounce>
                <ProjectCard
                  name={name}
                  id={id}
                  imgUrl={imgUrl}
                  tools={tools}
                  link={link}
                  gitlink={gitlink}
                />
              </Bounce>
            )
          })}{" "}
        </ProjectGrid>
      </Body>
    </Layout>
  )
}

export default Projects
