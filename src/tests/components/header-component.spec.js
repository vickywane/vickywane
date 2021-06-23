import React from "react"
import { render } from "@testing-library/react"
import Header from '../../components/header'


test("Displays the correct title", () => {
    const { getByTestId } = render(<Header />)
    const avatarIcon = getByTestId("header-component")

    expect(avatarIcon).not.toBeDisabled()
    // console.log(avatarIcon)
    // expect().toBe(true)
})