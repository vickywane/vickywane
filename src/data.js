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
    text:
      "I create technical content which simplifies cloud engineering for Frontend Developers",
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
          🧑🏽‍💻
        </span>
      </ResponsiveEmoji>
    ),
    text: "I build fun projects out of my wild imaginations for people to use",
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
          🎤
        </span>
      </ResponsiveEmoji>
    ),
    text:
      "I enjoy speaking about various aspects engineering to people who care to listen",
    link: "talks",
  },
]

export const WorkPlaces = [
  {
    id: 1,
    name: "Liferithms.inc",
    role: "Frontend Engineer",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "https://liferithms.com/",
    duration: "2020 - Present",
  },
  {
    id: 4,
    name: "Smashing Magazine",
    role: "Technical Writer",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "https://www.smashingmagazine.com/author/nwani-victory/",
    duration: "2020 - Present",
  },
  {
    id: 2,
    name: "Hotels.ng",
    role: "Intern",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "https://hotels.ng/",
    duration: "6 Months",
  },
  {
    id: 3,
    name: "Patfin High School",
    role: "I.T Support Staff",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde similique ea, suscipit minima officiis perferendis tempora quas quo ut culpa!",
    link: "#",
    duration: "",
  },
]

export const Programs = [
  {
    id: 2,
    name: "Google Code In",
    role: "Particpant",
  },
  {
    id: 3,
    name: "Google Africa Developer Scholarship",
    role: "Particpant ( Cloud Track )",
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
