import React from "react"

import Banner from "../components/banner"
import Layout from "../components/layout"
import About from "../components/about"

const Home = () => {
  return (
    <Layout>
      <Banner />
      <About />
    </Layout>
  )
}

export default Home
