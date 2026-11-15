import React from "react"

// .svg files are imported as React components via @svgr/webpack at build time.
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="svg-icon" {...props} />
)

export default SvgComponent
