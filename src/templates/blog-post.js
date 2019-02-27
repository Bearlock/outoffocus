import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import ReactAudioPlayer from 'react-audio-player';

export default ({ data }) => {
  const post = data.markdownRemark
  let audio;
  if (post.frontmatter.audio) {
    audio = <ReactAudioPlayer css={css`width: 100%; margin-bottom: 2rem;`} src={post.frontmatter.audio} controls />
  }
  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <div>
        <h1 css={css`color: rebeccapurple; display: inline-block`}>{post.frontmatter.episodeString}{" "}{post.frontmatter.title}</h1>
        { audio }
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        episodeString
        audio
      }
    }
  }
`
