import React from "react"
import { Button } from "@/styles"

interface CustomButton {
  text: string
  background?: string
  color?: string
  clickAction: () => void
  icon?: any
}

const CustomButton = ({
  text,
  background,
  color,
  clickAction,
  icon,
}: CustomButton) => (
  <Button
    display="flex"
    items="center"
    {...{ background, color }}
    onClick={() => clickAction()}
  >
    <p> {text} </p>

    {icon}
  </Button>
)

export default CustomButton
