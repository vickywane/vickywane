import React from "react"
import { render } from "@testing-library/react"
import Header from '../../components/header'


test("Displays the correct title", () => {
    const { getByTestId } = render(<Header />)

    expect(getByTestId("header-component"))
})