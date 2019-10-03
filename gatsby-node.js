const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: "/post" + slug,
    })
  }
}

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
        group(field: frontmatter___tags) {
          fieldValue
          edges {
            node {
              fields {
                slug
              }
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
                subtitle
                twitter
                github
                web
                linkedin
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

  const posts = data.allMarkdownRemark.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? "/" : `/posts/${i + 1}`,
      component: require.resolve(`./src/templates/posts.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/post.tsx`),
      context: { slug: slug },
    })
  })

  data.allMarkdownRemark.group.forEach(tag => {
    const posts = tag.edges
    const numPages = Math.ceil(posts.length / postsPerPage)
    const tagname = tag.fieldValue

    Array.from({ length: numPages }).forEach((_, i) => {
      actions.createPage({
        path: `/tag/${tagname}` + (i === 0 ? `` : `/${i + 1}`),
        component: require.resolve(`./src/templates/tag.tsx`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          tag: tagname,
        },
      })
    })
  })

  data.allAuthorsYaml.nodes.forEach(node => {
    const posts = (node.posts = node.posts ? node.posts : [])
    const numPages = Math.ceil(posts.length / postsPerPage)

    const author = {
      email: node.email,
      name: node.name,
      subtitle: node.subtitle,
      twitter: node.twitter,
      github: node.github,
      web: node.web,
      linkedin: node.linkedin,
    }

    Array.from({ length: numPages }).forEach((_, i) => {
      actions.createPage({
        path: `/author/${author.name}` + (i === 0 ? `` : `/${i + 1}`),
        component: require.resolve(`./src/templates/author.tsx`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          email: author.email,
        },
      })
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
