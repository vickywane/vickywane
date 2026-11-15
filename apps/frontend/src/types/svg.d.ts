// SVGs are imported as React components through @svgr/webpack (see next.config.js)
declare module "*.svg" {
  import type { FC, SVGProps } from "react"

  const SvgComponent: FC<SVGProps<SVGSVGElement>>
  export default SvgComponent
}
