"use client"
import React, { useState } from "react"
import { FiX } from "react-icons/fi"
import Modal, { Styles } from "react-modal"
import styled from "styled-components"
import { Flex, Text } from "@/styles"
import { MdRestartAlt } from "react-icons/md"
import { VscSend } from "react-icons/vsc"
import { ImMagicWand } from "react-icons/im"

const customStyles: Styles = {
  overlay: {
    zIndex: 99,
  },
}

type AssistantModal = {
  handleClose: () => void
  isOpen: boolean
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55px;
  padding: 0 24px;
  position: sticky;
  place-items: center;
`

type Role = "assistant" | "user"

const Card = styled.div<{ role: Role }>`
  border-radius: ${props =>
    props.role === "assistant" ? "0 36px 36px 0" : "36px 0 0 36px"};
  padding: 8px 16px;
  width: fit-content;

  background: #f9f9fa;
`

const Container = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: calc(100% - 68px);
`

const InputContainer = styled(Flex)`
  border: 1px solid #f9f9fa;
  background: #f9f9fa;
  place-items: center;
  padding: 0 16px;
  height: 50px;

  input {
    font-size: 14px;
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }

  button {
    border: 0;
    background: transparent;
    color: #115e65;
  }
`

const ULContainer = styled.ul`
  list-style: none;
  gap: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;

  overflow: auto;
`

const LiContainer = styled.li<{ role: Role }>`
  display: flex;
  width: 100%;

  justify-content: ${props =>
    props.role === "assistant" ? "flex-start" : "flex-end"};
`

export default function AssistantModal({
  handleClose,
  isOpen,
}: AssistantModal) {
  const [message, setMessage] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<
    { role: string; content: string }[]
  >([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (message.length >= 1) {
      const conversation = [
        ...conversationHistory,
        {
          role: "user",
          content: message,
        },
      ]

      setConversationHistory(conversation)
      setMessage("")
      setLoading(true)

      try {
        const request = await fetch(`/api/assistant`, {
          method: "POST",
          body: JSON.stringify({
            conversation: conversation,
          }),
        })

        const response = await request.json()

        if (response.data) {
          setConversationHistory(history => [...history, response.data])
        }
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }
  }

  const resetConversation = () => {
    setConversationHistory([])
    setMessage("")
  }

  const closeAction = () => {
    resetConversation()
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeAction}
      style={customStyles}
      contentLabel="Chat Assistant"
      className={"react__modal_content"}
    >
      <div style={{ height: "100%" }}>
        <Header>
          <div className="flex gap-2 items-center">
            <ImMagicWand className="text-base" />

            <p className="text-base"> Assistant </p>
          </div>

          <div className="flex gap-3">
            <div
              onClick={resetConversation}
              className="flex items-center gap-1 hover:cursor-pointer "
            >
              <p className="text-sm"> Restart </p>
              <MdRestartAlt className="text-base" />
            </div>

            <div className="hover:cursor-pointer" onClick={handleClose}>
              <FiX fontSize="18px" />
            </div>
          </div>
        </Header>

        <div className="border-b" />

        <Container>
          <ULContainer>
            {conversationHistory.map((conversation, idx) => (
              <LiContainer role={conversation.role as Role} key={idx}>
                <Card role={conversation.role as Role}>
                  <Text fontSize="14px">{conversation.content}</Text>
                </Card>
              </LiContainer>
            ))}
          </ULContainer>

          <form onSubmit={handleSubmit}>
            <InputContainer>
              <input
                disabled={isLoading}
                type="text"
                placeholder="Ask a question"
                value={message}
                onChange={event => setMessage(event.target.value)}
              />

              <span>
                <button disabled={isLoading} type="submit">
                  <VscSend fontSize={"24px"} />
                </button>
              </span>
            </InputContainer>
          </form>
        </Container>
      </div>
    </Modal>
  )
}
