import React from "react"
import styled from "styled-components"
import { IoIosArrowRoundBack, IoMdCalendar, IoIosLink } from "react-icons/io"
import { FiExternalLink } from "react-icons/fi"

import { Text, Title, center, Button } from "../../styles/"
import { StyledHover, Header } from "./"
import { WorkPlaces, Programs } from "../../data"

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    height: 55px;
    padding: 0 1rem;
    border-radius: 5px;
    margin: 1rem 0.5rem;
    background: #141821;
    color: #fff;
    span {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
`

const Experiences = props => {
  const { setView } = props

  return (
    <div>
      <Header>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <StyledHover onClick={() => setView("home")}>
            <IoIosArrowRoundBack style={{ fontSize: "1.8rem" }} />
          </StyledHover>

          <div>.{/* <Button> View My Certifications </Button> */}</div>
        </div>
      </Header>
      <List>
        {WorkPlaces.map(({ id, name, link, role }) => {
          return (
            <li style={{ ...center }} key={id}>
              <span>
                <div style={{ ...center }}>
                  <div style={{ display: "flex" }}>
                    <a href={`#`} style={{ marginRight: ".5rem" }}>
                      <Text> {name} </Text>
                    </a>

                    <Text style={{ color: "#D3D3D3" }}>
                      <i> -- {role} </i>
                    </Text>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <StyledHover onClick={() => setView("home")}>
                    <a href={link} target="_blank" rel="noopener">
                      <FiExternalLink />
                    </a>
                  </StyledHover>
                </div>
              </span>
            </li>
          )
        })}
      </List>

      <br />
      <Title small> Professional Programs </Title>
      <hr style={{ background: "#fff" }} />
      <List>
        {Programs.map(({ id, name, link, role }) => {
          return (
            <li style={{ ...center }} key={id}>
              <span>
                <div style={{ ...center }}>
                  <div style={{ display: "flex" }}>
                    <a
                      href={`${link}`}
                      style={{ marginRight: ".5rem" }}
                      target="_blank"
                      rel="noopener"
                    >
                      <Text> {name} </Text>
                    </a>

                    <Text style={{ color: "#D3D3D3" }}>
                      <i> -- {role} </i>
                    </Text>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <StyledHover onClick={() => setView("home")}>
                    <a href={link} target="_blank" rel="noopener">
                      <FiExternalLink />
                    </a>
                  </StyledHover>
                </div>
              </span>
            </li>
          )
        })}
      </List>
    </div>
  )
}

export default Experiences
