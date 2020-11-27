import React from "react"
import styled from "styled-components"
import { IoIosArrowRoundBack, IoMdCalendar } from "react-icons/io"
import { HiOutlineSparkles } from "react-icons/hi"

import { Text, Title, center } from "../../styles/"
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

const NoticeBox = styled.div`
  width: 90%;
  padding: 0.5rem 1rem;
  text-align: center;
  border: 1px dashed #fff;
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

          <p style={{ opacity: 0 }}>.</p>
        </div>
      </Header>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <NoticeBox>
          <HiOutlineSparkles style={{ color: "#fff" }} />{" "}
          <Text align="center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            cupiditate doloremque aliquid voluptas esse accusantium?
          </Text>
        </NoticeBox>
      </div> */}

      <List>
        {WorkPlaces.map(({ id, name, link, role }) => {
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
                  <IoMdCalendar style={{ fontSize: "1.4rem" }} />

                  <div style={{ display: "flex" }}>
                    <Text style={{ margin: "0 0.3rem" }}>2 years 2 months</Text>
                  </div>
                </div>
              </span>
            </li>
          )
        })}
      </List>

      <br />
      <Title> Professional Programs </Title>
      <hr  style={{background : "#fff"}} />
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
                  <IoMdCalendar style={{ fontSize: "1.4rem" }} />

                  <div style={{ display: "flex" }}>
                    <Text style={{ margin: "0 0.3rem" }}>2 years 2 months</Text>
                  </div>
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
