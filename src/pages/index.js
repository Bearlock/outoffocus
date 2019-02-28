import React from "react"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import logo from "../images/logo.jpg"
import apple from "../images/apple-podcasts-badge.png"

export default ({ data }) => {
  const latest = data.allMarkdownRemark.edges[0].node;
  return (
    <Layout>
      <Helmet>
        <title>Out of Focus</title>
      </Helmet>
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
          Check out the latest
          <Link to={latest.fields.slug}>
            : {latest.frontmatter.episodeString}{latest.frontmatter.title}
          </Link>
        </h4>
        <div css={css`text-align: center`}>
          <div css={css`display: inline-block`}>
            <a href='https://playmusic.app.goo.gl/?ibi=com.google.PlayMusic&amp;isi=691797987&amp;ius=googleplaymusic&amp;apn=com.google.android.music&amp;link=https://play.google.com/music/m/Ipxkorsy5uzsfjd2ylcjcosxlxu?t%3DOut_of_Focus%26pcampaignid%3DMKT-na-all-co-pr-mu-pod-16' rel='nofollow'><img width='125px' alt='Listen on Google Play Music' src='https://play.google.com/intl/en_us/badges-music/images/badges/en_badge_web_music.png'/></a>
            <a href='https://itunes.apple.com/us/podcast/out-of-focus/id1454423231?mt=2&ls=1'><img css={ css`width: 125px; height: 45.875px; margin-left: 20px;` } alt="Listen on Apple iTunes" src={ apple } /></a>
          </div>
        </div>
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
