import React from "react"
import { IoLogoJavascript, IoLogoPython, IoMdCart } from "react-icons/io"
import {
  SiOpenapiinitiative,
  SiMongodb,
  SiKubernetes,
  SiProbot,
} from "react-icons/si"
import { FaReact, FaMobileAlt, FaDocker } from "react-icons/fa"

import { MdErrorOutline, MdOutlineVideogameAsset, MdRecordVoiceOver } from "react-icons/md"
import { GrGraphQl } from "react-icons/gr"

// console.log(IoGameControllerOutline, IoCartOutline);

const ProjectToolsIcon = ({ icon, size }) => {
  switch (icon) {
    case "graphql":
      return <GrGraphQl id={icon} size={size} />

    case "javascript":
      return <IoLogoJavascript id={icon} size={size} />

    case "openapi":
      return <SiOpenapiinitiative id={icon} size={size} />

    case "react":
      return <FaReact id={icon} size={size} />

    case "mongodb":
      return <SiMongodb id={icon} size={size} />

    case "mobile":
      return <FaMobileAlt id={icon} size={size} />

    case "docker":
      return <FaDocker id={icon} size={size} />

    case "python":
      return <IoLogoPython id={icon} size={size} />

    case "kubernetes":
      return <SiKubernetes id={icon} size={size} />

    case "chatbot":
      return <SiProbot id={icon} size={size} />

    case "game":
      return <MdOutlineVideogameAsset id={icon} size={size} />

    case "recorder":
      return <MdRecordVoiceOver id={icon} size={size} />
      
    case "ecommerce":
    case "cart":
      return <IoMdCart id={icon} size={size} />
    default:
      return <MdErrorOutline id={"fallback-icon"} size={size} />
  }
}

export default ProjectToolsIcon
