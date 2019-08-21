const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: "/posts" + slug,
    })
  }
}

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      allAuthorsYaml {
        nodes {
          name
          email
          posts {
            frontmatter {
              title
              date
              author {
                name
                email
              }
              tags
              description
            }
            wordCount {
              words
            }
            html
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/post.tsx`),
      context: { slug: slug },
    })
  })

  data.allAuthorsYaml.nodes.forEach(node => {
    const author = {
      name: node.name,
      email: node.email,
      posts: node.posts.map(post => {
        return {
          title: post.frontmatter.title,
          wordCount: post.wordCount.words,
          html: post.html,
          excerpt: post.excerpt,
          author: {
            name: node.name,
            email: node.email,
          },
          description: post.frontmatter.description,
          tags: post.frontmatter.tags,
          date: new Date(post.frontmatter.date),
          slug: post.fields.slug,
        }
      }),
    }

    actions.createPage({
      path: `/authors/${node.name}`,
      component: require.resolve(`./src/templates/tag.tsx`),
      context: { author: author },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      author: AuthorsYaml @link(by: "email")
    }
    type AuthorsYaml implements Node {
      posts: [MarkdownRemark] @link(by: "frontmatter.author.email", from: "email")
    }
  `
  createTypes(typeDefs)
}
