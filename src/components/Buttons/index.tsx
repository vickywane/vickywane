import React from "react"
import { Button } from "@/styles"

interface CustomButton {
  text: string
  background?: string
  color?: string
  clickAction: () => void
}

const CustomButton = ({
  text,
  background,
  color,
  clickAction,
}: CustomButton) => (
  <Button {...{ background, color }} onClick={() => clickAction()}>
    {text}
  </Button>
)

export default CustomButton
