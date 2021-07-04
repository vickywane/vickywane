/**
 * @jest-environment jsdom
 */
import React from "react"
import renderer from "react-test-renderer"
import { Router } from "@reach/router"

import "@testing-library/jest-dom/extend-expect"
import Header from "../../components/header"

describe("Header component test", () => {
  it("It displays headers", function () {
    const tree = renderer
      .create(
        <Router>
          <Header path="/" exact />
        </Router>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
