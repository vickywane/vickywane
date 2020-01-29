import React from "react"

import Banner from "../components/banner"
import Layout from "../components/layout"
import About from "../components/about"
import Footer from "../components/footer"

const Home = () => {
  return (
    <Layout>
      <Banner />
      <About />

      <Footer />
    </Layout>
  )
}

export default Home
