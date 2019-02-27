import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { css } from "@emotion/core"

export default ({ data }) => (
  <Layout>
    <Helmet>
      <title>About Us</title>
    </Helmet>
    <h1 css={css`color: rebeccapurple; display: inline-block;`}>About {data.site.siteMetadata.title}</h1>
    <h3>Hey!</h3>
    <p>
      We're Erick and Nick; a couple of guys who like conversation, jokes, and
      interesting topics.
    </p>
    <p>
      Out of Focus is a place for us to talk about nothing and everything (and
      maybe learn something in the process). Maybe we'll talk to a recurring cast of friends,
      family, and randoms. Maybe we won't.
    </p>
    <p>Come take a listen as we explore clarity through obscurity.</p>
    <p>Or don't. Fuck you.</p>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
