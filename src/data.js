import React from "react"
import styled from "styled-components"
import media from "styled-media-query"
import Emoji from "./components/emoji"

const ResponsiveEmoji = styled.div`
  span {
    font-size: 2rem;
    ${media.lessThan("large")`
    font-size: 1.8rem;
    `};
    ${media.lessThan("medium")`
    font-size: 1.6rem;
    `};
    ${media.lessThan("small")`
    margin-top : 10px;
    font-size: 1.3rem;
    `};
  }
`

export const CardData = [
  {
    id: 1,
    icon: (
      <ResponsiveEmoji>
        <span
          className="emoji"
          role="img"
          aria-label={"write"}
          aria-hidden={true}
        >
          ✍🏽
        </span>
      </ResponsiveEmoji>
    ),
    name: "Write Technical Articles",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Accusantium",
    link: "blog",
  },
  {
    id: 2,
    name: "Build Projects",
    icon: (
      <ResponsiveEmoji>
        <span
          className="emoji"
          role="img"
          aria-label={"write"}
          aria-hidden={true}
        >
          👩🏽‍💻
        </span>
      </ResponsiveEmoji>
    ),
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Accusantium",
    link: "projects",
  },
  {
    id: 3,
    name: "Give Technical Talks",
    icon: (
      <ResponsiveEmoji>
        <span
          className="emoji"
          role="img"
          aria-label={"write"}
          aria-hidden={true}
        >
          🧑🏽‍🎤
        </span>
      </ResponsiveEmoji>
    ),
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

export const Projects = [
  {
    id: 1,
    name: "Travoi",
    description: "Lorem random text text text",
  },
  {
    id: 2,
    name: "Remotify",
    description: "Lorem random test :w",
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
]
