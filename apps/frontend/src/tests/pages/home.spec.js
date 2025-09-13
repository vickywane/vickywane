import React from "react"
import { render } from "@testing-library/react"
import Home from '../../pages/home/index'

test("Displays the Home Card", () => {
    const { getByTestId } = render(<Home />)
    const homeCard = getByTestId("home-card")

    expect(homeCard).not.toBeDisabled()
})