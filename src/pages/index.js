import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Profile from "./profile"
import Update from "./updates/update"
import Footer from "../components/footer"
import About from "../components/about"

import Header from "../components/header"

const IndexPage = () => (
  <div>
    <Header />
    <Profile />
    <Layout>
      <SEO title="Home" />
      <>
        <About />
        <Update />
      </>
    </Layout>
    <Footer />
  </div>
)

export default IndexPage
