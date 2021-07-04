import React, { useState } from "react"
import styled from "styled-components"
import { FiLinkedin, FiTwitter, FiMail, FiSend } from "react-icons/fi"
import { IoIosArrowRoundBack } from "react-icons/io"
import media from "styled-media-query"

import {
  Text,
  Title,
  Button,
  center,
  Flex,
  StyledIconHover,
} from "../../styles/"
import { Header } from "./"
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
    background: #141821;
    border: 1px solid #141821;
    border-radius: 3px;
    height: 45px;
    color: #fff;
    font-size: 0.9rem;
    padding: 0 1rem;
    &: focus {
      box-shadow: 0 2px 3px #6c15b1;
    }
  }
  textarea {
    color: #fff;
    background: #141821;
    border: 1px solid #141821;
    border-radius: 3px;
    height: 12vh;
    font-size: 0.9rem;
    padding: 1rem 1rem;
    &: focus {
      box-shadow: 0 2px 3px #6c15b1;
    }
  }
`

const Contact = props => {
  const [isSendingMessage, sendMessage] = useState(false)
  const { setView } = props

  const handleMessage = () => {
    sendMessage(true)
  }

  return (
    <div data-testid="contact-page">
      <Header data-testid="header">
        <Flex
          data-testid="header-items"
          direction="row"
          justify="space-between"
          style={{
            width: "100%",
          }}
        >
          <StyledIconHover onClick={() => setView("home")}>
            <IoIosArrowRoundBack style={{ fontSize: "1.8rem" }} />
          </StyledIconHover>

          <div style={{ ...center }}>
            <Title small> Contact Me</Title>
          </div>
        </Flex>
      </Header>

      {!isSendingMessage ? (
        <div>
          <div>
            <Flex>
              <div style={{ ...center, marginRight: "10px" }}>
                <Title> Hi There, </Title>
              </div>

              <div style={{ ...center }}>
                <Emoji size="1.5rem" symbol="✌🏽" label="contact emoji" />{" "}
              </div>
            </Flex>
            <Text>
              I am always open to engaging in discussions around software
              engineering, and technical authorship. <br /> Want to reach out to
              me for something? - Let's Get In Touch!{" "}
            </Text>
          </div>

          <Text>
            Alternatively, you can also reach to me through the following
            mediums;
          </Text>
          <Flex data-testid="contact-icons" direction="row">
            <StyledIconHover style={{ margin: "0 .5rem" }}>
              <a
                href="https://www.linkedin.com/in/victory-nwani-b820b2157/"
                target="_blank"
                rel="norefferrer"
                style={{ textDecoration: "none" }}
              >
                <FiLinkedin style={{ fontSize: "1.4rem" }} />
              </a>
            </StyledIconHover>

            <StyledIconHover style={{ margin: "0 .5rem" }}>
              <a
                target="_blank"
                rel="norefferrer"
                href="https://twitter.com/iamnwani01"
                style={{ textDecoration: "none" }}
              >
                <FiTwitter style={{ fontSize: "1.4rem" }} />
              </a>
            </StyledIconHover>

            <StyledIconHover style={{ margin: "0 .5rem" }}>
              <a
                target="_blank"
                rel="norefferrer"
                href="mailto:vickywane@gmail.com?subject=Friendly%discussion%with%Victory&body=Description%of%our%conversation"
                style={{ textDecoration: "none" }}
              >
                <FiMail style={{ fontSize: "1.4rem" }} />
              </a>
            </StyledIconHover>
          </Flex>
          <hr />

          <form
            data-testid="form-fields"
            onSubmit={e => {
              e.preventDefault()

              handleMessage()
            }}
          >
            <InputBody>
              <label for="name"> Your Name </label>
              <input
                id="name"
                data-testid="name-field"
                placeholder="Your name or just a nick name"
                type="text"
              />
            </InputBody>

            <InputBody>
              <label> What do you want to talk about ? </label>
              <textarea
                data-testid="description-field"
                placeholder="A clear description of your message."
                type="text"
              />
            </InputBody>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ opacity: 0 }}> . </p>
              <Button
                data-testid="send-message"
                onClick={_ => handleMessage()}
                style={{ textAlign: "right" }}
              >
                Deliver Message
                <div style={{ margin: "0 .4rem" }}>
                  <FiSend
                    style={{ fontSize: "1.4rem", transform: "rotate(45deg)" }}
                  />
                </div>
              </Button>
            </div>
          </form>
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
