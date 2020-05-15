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
      <Banner />
      <About />

      <Tools />
      <Project />

      <br />
    </Layout>
  )
}

export default Home
