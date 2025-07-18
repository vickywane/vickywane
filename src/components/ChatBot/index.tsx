"use client"
import React, { useState } from "react"
import { PiBugDroid } from "react-icons/pi"
import AssistantModal from "./AssistantModal"
import styled from "styled-components"

const TextContainer = styled.div`
  background: white;
  border: 1px solid grey;
  border-radius: 12px;
  padding: 16px;
  bottom: 140px;
  left: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`

const FAB = styled.div`
  height: 65px;
  width: 65px;
  border-radius: 100%;
  background: #115e65;
  bottom: 55px;
  left: 55px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;

  &:hover {
    cursor: pointer;
  }
`

export default function Index() {
  const [modalIsOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <AssistantModal handleClose={closeModal} isOpen={modalIsOpen} />

      {!modalIsOpen && (
        <TextContainer>
          <p>
            Hey, I&apos;m a tiny chat assistant. <br />
            <br /> I have alot of information about Victory and <br /> I can
            help you find them if you ask me!
          </p>
        </TextContainer>
      )}

      <FAB onClick={() => setIsOpen(true)}>
        <PiBugDroid style={{ fontSize: 36, color: "white" }} />
      </FAB>
    </div>
  )
}
