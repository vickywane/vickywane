import "@testing-library/jest-dom"
import { resetBrowserMocks } from "./test-utils/browserMocks"

// Browser APIs jsdom lacks are stubbed in test-utils/browserMocks.ts.
afterEach(() => {
  resetBrowserMocks()
})
