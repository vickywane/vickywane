import React from "react"
import { IoLogoJavascript, IoLogoPython } from "react-icons/io"
import {
  SiOpenapiinitiative,
  SiMongodb,
  SiKubernetes,
  SiProbot,
} from "react-icons/si"
import { FaReact, FaMobileAlt, FaDocker } from "react-icons/fa"

import { GrGraphQl } from "react-icons/gr"

const ProjectToolsIcon = ({ icon, size }) => {
  switch (icon) {
    case "graphql":
      return <GrGraphQl size={size} />

    case "javascript":
      return <IoLogoJavascript size={size} />

    case "openapi":
      return <SiOpenapiinitiative size={size} />

    case "react":
      return <FaReact size={size} />

    case "mongodb":
      return <SiMongodb size={size} />

    case "mobile":
      return <FaMobileAlt size={size} />

    case "docker":
      return <FaDocker size={size} />

    case "python":
      return <IoLogoPython size={size} />

    case "kubernetes":
      return <SiKubernetes size={size} />

    case "chatbot":
      return <SiProbot size={size} />

    default:
      return <p> ?</p>
  }
}


export default ProjectToolsIcon
