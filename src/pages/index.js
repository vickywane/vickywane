import React from "react"

import { Router } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from "./home/"

const HomeComponent = () => (
  <Layout>
    <SEO title="Home" />

    <Home />
  </Layout>
)

const IndexPage = () => (
  <Router>
    <HomeComponent path="/" exact />
  </Router>
)

export default IndexPage
