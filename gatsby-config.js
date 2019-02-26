module.exports = {
  siteMetadata: {
    title: "Out of Focus",
    siteUrl: "https://outoffocusshow.com",
    description: "A podcast about nothing and everything exploring clarity through obscurity",
    author: "Erick Diaz & Nick Farr",
    summary: "Out of Focus is a podcast about nothing and everything. Twice a week we'll explore whatever topic strikes our mood for the day. Join us as we futilely yell into the ether. Found wherever fine podcasts are sold"
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
                author
                summary
                siteUrl
                description
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
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { "itunes:title": edge.node.frontmatter.title },
                    { "itunes:episode": edge.node.frontmatter.episode },
                    { "itunes:episodeType": edge.node.frontmatter.episodeType },
                    { "itunes:duration": edge.node.frontmatter.duration }
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
                categories: ["Comedy", "Careers", "Hobbies"],
                custom_namespaces: { "itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd" },
                custom_elements: [
                  { "itunes:type": "episodic" },
                  { "itunes:subtitle": siteMetadata.description },
                  { "itunes:author": siteMetadata.author },
                  { "itunes:summary": siteMetadata.summary },
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
                  { "itunes:category": [
                    {_attr: {
                      text: "Comedy"
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
                  ]},
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
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        date
                        title
                        episode
                        episodeType
                        duration
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
