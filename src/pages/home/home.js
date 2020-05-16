import React from "react"

import Banner from "../../components/banner"
import Layout from "../../components/layout"
import About from "../../components/about"

import Project from "../projects/projects"
import Tools from "./components/tools"
import ComingUp from "./components/comingUp"

const Home = () => {
  return (
    <Layout>
      <div
        style={{ overflow: "hidden", overflowX: "hidden", overflowY: "hidden" }}
      >
        <Banner />
        <About />
        <Tools />
        <Project />
        <br />{" "}
      </div>
    </Layout>
  )
}

export default Home
