import React from "react"

import Banner from "../../components/banner"
import Layout from "../../components/layout"
import About from "../../components/about"
import Footer from "../../components/footer"

import Project from "./components/projects"
import Tools from "./components/tools"

const Home = () => {
  return (
    <Layout>
      <Banner />
      <About />

      <Tools />
      <Project />

      <br />
      <Footer />
    </Layout>
  )
}

export default Home
