import React from "react"
import { FiCode, FiBookOpen } from "react-icons/fi"
import styled from "styled-components"
import media from "styled-media-query"
import Emoji from "./components/emoji"

const Book = styled(FiBookOpen)`
  font-size: 2.2rem;
  ${media.lessThan("medium")`
font-size : 1.7rem;
`};
`
const Build = styled(FiCode)`
  font-size: 2.2rem;
  ${media.lessThan("medium")`
  font-size : 1.7rem;
  `};
`

export const CardData = [
  {
    id: 1,
    icon: <Emoji symbol="✍🏽" size="2.5rem" label="write" />,
    name: "Write Technical Articles",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Accusantium",
    link: "blog",
  },
  {
    id: 2,
    name: "Build Projects",
    icon:   <Emoji symbol="👩🏽‍💻" size="2.5rem" label="write" />,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Accusantium",
    link: "projects",
  },
  {
    id: 3,
    name: "Give Technical Talks",
    icon:   <Emoji symbol="🧑🏽‍🎤" size="2.5rem" label="write" />,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Accusantium",
    link: "talks",
  },
]

export const WorkPlaces = [
  {
    id: 1,
    name: "Liferithms",
    role: "Frontend Engineer",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "https://www.liferithms.inc",
  },
  {
    id: 2,
    name: "Hotels.ng",
    role: "Intern",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "https://www.liferithms.inc",
  },
  {
    id: 3,
    name: "Patfin High School",
    role: "I.T Personnel",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "https://www.liferithms.inc",
  },
]

export const Programs = [
  {
    id: 1,
    name: "Open Source Contributor",
    role: "Particpant",
  },

  {
    id: 2,
    name: "Google Code In",
    role: "Particpant",
  },
  {
    id: 3,
    name: "Google Africa Developer Scholarship",
    role: "Particpant",
  },
]
