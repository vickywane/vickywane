
import React, { useState } from "react"
import media from "styled-media-query"

import { HomeBackground, Title, Text } from "../../styles/"
import Header from "../../components/header"
import { CSSTransition } from "react-transition-group"
import GalleryComponent from "./gallery"

const sample = [
  [
    {
      title: "GraphQL Upload Starter App",
      description: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
Voluptates beatae neque repudiandae quis dolores illo corrupti
quae, similique est optio!`,
      images: [
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
        ,
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1600414581/Screenshot_from_2020-09-18_08-33-49.png",
        ,
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1556654670/img.jpg",
      ],
    },
  ],
  [
    {
      title: "TryChameleon Interview",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Voluptates beatae neque repudiandae quis dolores illo corrupti
quae, similique est optio!`,
      images: [
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
        ,
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
        ,
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
      ],
    },
  ],
  [
    {
      title: "GitStart Interview",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Voluptates beatae neque repudiandae quis dolores illo corrupti
quae, similique est optio!`,
      images: [
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
        ,
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
        ,
        "https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bc8cdfe-1d23-49de-8ef3-a2b494f2eec2/react-app-application-default-state.png",
      ],
    },
  ],
]

const Projects = () => {
  const [Target, setTarget] = useState(0)

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Header />

      <HomeBackground
        style={{ height: "calc(100vh - 60px)", overflowY: "hidden" }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <br />
          <Title>A Gallery Of My Projects</Title>

          <Text>
            Here's a gallery of my projects. Use your keyboard or the icons to
            navigate around.
          </Text>
        </div>

        <div style={{
          display : 'flex', justifyContent: 'center', alignItems: 'center'
        }} >
          <h1> ABOUT TO GET BUILT </h1>
        </div>
      </HomeBackground>
    </div>
  )
}

export default Projects