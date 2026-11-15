import type { Config } from "jest"
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./",
})

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // next/jest maps .svg to an image stub; the app imports them as components.
  moduleNameMapper: {
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svgComponent.tsx",
  },
}

// @ts-ignore
export default createJestConfig(config)
