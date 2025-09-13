/**
 * @jest-environment jsdom
 */
import React from "react"
import renderer from "react-test-renderer"
import { Router } from "@reach/router"

import "@testing-library/jest-dom/extend-expect"
import Index from "../../components/headers"

describe("Index component test", () => {
  it("It displays headers", function () {
    const tree = renderer
      .create(
        <Router>
          <Index path="/" exact />
        </Router>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
