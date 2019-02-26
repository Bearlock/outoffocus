import React from "react"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import logo from "../images/logo.jpg"

export default ({ data }) => {
  console.log(data)
  const latest = data.allMarkdownRemark.edges[0].node;
  return (
    <Layout>
      <div>
        <img src={ logo } alt="Logo" />
        <h3
          css={css`
            text-align: center;
            color: rebeccapurple;
          `}
        >
        Hey again.
        </h3>
        <h4 css={css`text-align: center;`}>
          Check out out the latest
          <Link to={latest.fields.slug}>
            : {latest.frontmatter.episodeString}{latest.frontmatter.title}
          </Link>
        </h4>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            episodeString
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
