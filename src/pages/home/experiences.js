import React from "react"
import { IoIosArrowRoundBack } from "react-icons/io"

import { StyledHover, Header, Grid } from "./"

const Experiences = props => {
  const { setView } = props

  return (
    <div>
      <Header>
        <div style={{ display: "flex", width: "100%" , justifyContent :"space-between" }}>
          <StyledHover onClick={() => setView("home")}>
            <IoIosArrowRoundBack style={{ fontSize: "1.8rem" }} />
          </StyledHover>
          .
        </div>
      </Header>
      <p> A list of my work Experiences </p>
    </div>
  )
}

export default Experiences
