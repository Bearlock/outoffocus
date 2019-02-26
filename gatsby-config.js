module.exports = {
  siteMetadata: {
    title: "Out of Focus",
    subtitle: "Clarity through obscurity",
    description: "Out of Focus is a podcast about nothing and everything. Twice a week we'll explore whatever topic strikes our mood for the day. We aim for humor, honesty and genuine conversation. Join us as we futilely yell into the ether. Found wherever fine podcasts are sold.",
    author: "Out of Focus",
    siteUrl: "https://outoffocusshow.com",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-typography",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                subtitle
                description
                author
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: site.siteMetadata.title,
                },
                {
                  title: edge.node.frontmatter.title,
                  description: edge.node.long,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  enclosure: {
                    url: edge.node.frontmatter.audio,
                    size: edge.node.frontmatter.bytes,
                    type: edge.node.frontmatter.mime
                  },
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { "itunes:title": edge.node.frontmatter.title },
                    { "itunes:subtitle": edge.node.frontmatter.subtitle },
                    { "itunes:summary": edge.node.short },
                    { "itunes:episode": edge.node.frontmatter.episode },
                    { "itunes:episodeType": edge.node.frontmatter.episodeType },
                    { "itunes:duration": edge.node.frontmatter.duration },
                    { "itunes:image": {
                      _attr: {
                        href: "https://outoffocusshow.com/podcast_art.jpg"
                      },
                    }},
                    { "itunes:author": site.siteMetadata.author },
                  ],
                })
              })
            },
            setup: ({ query: { site: { siteMetadata }, ...rest }, }) => {
              return {
                ...siteMetadata,
                ...rest,
                copyright: "2019 Out of Focus",
                language: "en-us",
                description: siteMetadata.description,
                categories: ["Comedy", "Careers", "Hobbies"],
                custom_namespaces: { "itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd" },
                custom_elements: [
                  { "itunes:type": "episodic" },
                  { "itunes:subtitle": siteMetadata.subtitle },
                  { "itunes:author": siteMetadata.author },
                  { "itunes:summary": siteMetadata.description },
                  { "itunes:owner": [
                    { "itunes:name": "Erick Diaz & Nick Farr" },
                    { "itunes:email": "outoffocusshow@gmail.com" }
                  ]},
                  { "itunes:explicit": "yes" },
                  { "itunes:image": {
                    _attr: {
                      href: "https://outoffocusshow.com/podcast_art.jpeg"
                    }
                  }},
                  { "itunes:category": {
                    _attr: {
                      text: "Comedy"
                    }
                  }},
                  { "itunes:category": {
                    _attr: {
                      text: "Careers"
                    }
                  }},
                  { "itunes:category": {
                    _attr: {
                      text: "Hobbies"
                    }
                  }}
                ],
              }
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { draft: { ne: true } audio: { ne: null } }}
                ) {
                  edges {
                    node {
                      long: excerpt(pruneLength: 1000)
                      short: excerpt
                      html
                      fields { slug }
                      frontmatter {
                        date
                        title
                        subtitle
                        episode
                        episodeType
                        duration
                        bytes
                        mime
                        audio
                      }
                    }
                  }
                }
              }
            `,
            output: "/podcast-feed.xml",
            title: "Gatsby RSS Feed",
          },
        ],
      },
    }
  ],
}
