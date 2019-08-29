module.exports = {
  siteMetadata: {
    title: `Today I learned @Cybertec`,
    siteUrl: `https://til.cybertec-postgresql.com`,
    description:
      "Today I learned is a collection of short posts, mostly about weird stuff we found while working.",
    twitter: "@PostgresSupport",
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-transformer-yaml`,
    `gatsby-remark-copy-linked-files`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `authors`,
        path: `${__dirname}/content/authors/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `imprint`,
        path: `${__dirname}/content/imprint/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `privacy`,
        path: `${__dirname}/content/privacy/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/content/about/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: { sh: "bash" },
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [],
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Today I learned @Cybertec`,
        short_name: `TIL@Cybertec`,
        start_url: `/`,
        background_color: `#282f3a`,
        theme_color: `#3cbde9`,
        display: `standalone`,
        icon: "content/assets/Favicon.png",
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
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
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}}, sort: {order: DESC, fields: [frontmatter___date]}) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
            
            `,
            output: "/rss.xml",
            title: "Today I learned @Cybertec - RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/post/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-2908677-12",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: [],
        pageTransitionDelay: 0,
        // Any additional optional fields
        sampleRate: 100,
        siteSpeedSampleRate: 50,
        cookieDomain: "til.cybertec-postgresql.com",
      },
    },
  ],
}
