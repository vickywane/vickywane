import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FiSearch } from "react-icons/fi"
import media from "styled-media-query"
import Flex from "styled-flex-component"

import Header from "../../components/header"
import Layout from "../../components/layout"
import { Body, ProjectGrid, Bounce, Text } from "../../styles/styles"
import { ProjectData } from "./data"
import ProjectCard from "./projectCard"

const SearchBody = styled.div`
  padding: 0.5rem 1rem;
  border: 5px solid #7c3ae9;
  width: 55rem;
  transition: all 450ms;
  height: auto;
  border-radius: 5px;
  color: #fff;
  background: #8861c8;
  ${media.lessThan("huge")`
  width: 50rem;
  border: 5px solid #7c3ae9;
  `};
  ${media.lessThan("large")`
  width: 40rem;
  border: 4px solid #7c3ae9;
  `};
  ${media.lessThan("medium")`
  width: 29rem;
  border: 3px solid #7c3ae9;
  `};
  ${media.lessThan("small")`
  width: 24rem;
  border: 2px solid #7c3ae9;
  `};
`

const Input = styled.input`
  padding: 0.3rem 0.5rem;
  border: 0px;
  width: auto;
  flex: 1;
  margin: 0rem 0.7rem;
  outline: 0px
  background: transparent;
  color: #fff;
  font-size : 1.1rem;
  height: auto;
`

// TODO: Read on the usage of Arr.Find(() => {})

const Projects = () => {
  const [Search, setSearch] = useState(false)
  const [SearchResults, setSearchResults] = useState("")
  const [number, setNumber] = useState(0)

  // for (let No = 0; No < ProjectData.length; No++) {
  //   setNumber(No);
  // }

  useEffect(() => {
    ProjectData.forEach(() => {
      setNumber(number + 1)
    })
  }, [])

  return (
    <Layout>
      <Header />
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
          {ProjectData.map(({ id, name, gitlink, imgUrl, link, tools }) => {
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
