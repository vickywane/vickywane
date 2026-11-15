import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // eslint-plugin-react-hooks 7 ships the React Compiler rules as errors.
    // The existing components predate them, so report them as warnings
    // (as the previous lint setup did) until the components are refactored.
    rules: {
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/use-memo": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    ".netlify/**",
    ".swc/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
