import React, { useState } from "react"
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
    &: focus {
      box-shadow: 0 2px 3px #6c15b1;
    }
  }
  textarea {
    border-radius: 3px;
    height: 15vh;
    font-size: 0.9rem;
    padding: 1rem 1rem;
    &: focus {
      box-shadow: 0 2px 3px #6c15b1;
    }
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
  const [isSendingMessage, sendMessage] = useState(false)
  const { setView } = props

  const handleMessage = () => {
    sendMessage(true)
  }

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

          <p style={{ opacity: 0 }}> .</p>
        </div>
      </Header>

      {!isSendingMessage ? (
        <div>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Emoji size="3rem" symbol="🙌🏾" label="contact emoji" />{" "}
            </div>
            <br />
            <Title align="center">
              Want to reach out to me for something? Let's Get In Touch!{" "}
            </Title>
          </div>

          <Grid>
            <a
              href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
              target="_blank"
              rel="norefferrer"
              style={{ textDecoration: "none" }}
            >
              <Button>
                <div style={{ margin: "0 .5rem" }}>
                  <FiLinkedin style={{ fontSize: "1.4rem" }} />
                </div>
                Contact me on Linkedin
              </Button>
            </a>

            <a
              target="_blank"
              rel="norefferrer"
              href="https://twitter.com/iamnwani01"
              style={{ textDecoration: "none" }}
            >
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
            <input placeholder="Your name or just a nick name" type="text" />
          </InputBody>

          <InputBody>
            <label> What do you wanna talk about ? </label>
            <textarea
              placeholder="A brief summary of what you want to reach out to me for."
              type="text"
            />
          </InputBody>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ opacity: 0 }}> . </p>
            <Button
              onClick={_ => handleMessage()}
              style={{ textAlign: "right" }}
            >
              Send the message my way
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Emoji size="4rem" symbol="🙌🏾" label="contact emoji" />{" "}
            </div>
            <br />
            <br />
            <Title small align="center">
              Your message has been sent! <br /> My response would be coming
              your way soon!{" "}
            </Title>
            <br />

            <div style={{ ...center }}>
              <Button onClick={() => setView("home")}>Move Back Home</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
