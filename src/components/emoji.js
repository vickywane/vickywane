import React from "react"

const Emoji = props => {
  const { symbol, label , size } = props

  return (
    <span
      className="emoji"
      role="img"
      style={{height : "50px", fontSize : size}}
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
  )
}

export default Emoji
