import React from "react"
import styled from "styled-components"
import { FiLinkedin, FiTwitter } from "react-icons/fi"
import { IoIosArrowRoundBack } from "react-icons/io"
import media from "styled-media-query"

import { HomeBackground, Text, Title, Button, center } from "../../styles/"
import { Header, StyledHover } from "./"
import Emoji from "../../components/emoji"

const InputBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
  label {
    font-size: 0.9rem;
    padding: 5px 0;
  }
  input {
    border: 1px solid #fff;
    border-radius: 3px;
    height: 45px;
    color: #000;
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  textarea {
    border-radius: 3px;
    height: 15vh;
    font-size: 0.9rem;
    padding: 1rem 1rem;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  place-items: center;
  ${media.lessThan("medium")`
      display : flex;
      flex-direction : column;
      align-items : center;
  `}
`

const Contact = props => {
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
          .
        </div>
      </Header>

      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Emoji size="3rem" symbol="🙌🏾" label="contact emoji" />{" "}
        </div>
        <Title align="center"> Let's Get In Touch </Title>
      </div>

      <Grid>
        <a style={{ textDecoration: "none" }}>
          <Button>
            <div style={{ margin: "0 .5rem" }}>
              <FiLinkedin style={{ fontSize: "1.4rem" }} />
            </div>
            Contact me on Linkdeln
          </Button>
        </a>

        <a style={{ textDecoration: "none" }}>
          <br />
          <Button>
            <div style={{ margin: "0 .5rem" }}>
              <FiTwitter style={{ fontSize: "1.4rem" }} />
            </div>
            Message me on Twitter
          </Button>
        </a>
      </Grid>

      <InputBody>
        <label> Your Name </label>
        <input placeholder="Your name or username" type="text" />
      </InputBody>

      <InputBody>
        <label> What do you wanna talk about ? </label>
        <textarea
          placeholder="Tip: I'll respond faster if it's work cum dollars 🤑"
          type="text"
        />
      </InputBody>
    </div>
  )
}

export default Contact
