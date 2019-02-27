import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import { css } from "@emotion/core"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Episodes</title>
      </Helmet>
      <div>
        <h1 css={css` display: inline-block; color: rebeccapurple;`}>
          Episodes
        </h1>
        <hr />
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3 css={css`margin-bottom: 1/4rem;`}>
                {node.frontmatter.episodeString}{" "}{node.frontmatter.title}{" "}
                <span css={css`color: #bbb;`}> — {node.frontmatter.date}</span>
              </h3>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))}
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
            episodeString
            date(formatString: "DD MMMM, YYYY")
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
