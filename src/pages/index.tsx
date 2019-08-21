import { graphql } from "gatsby"
import * as React from "react"

import IPost from "../interfaces/IPost"
import IAuthor from "../interfaces/IAuthor"

import Layout from "../components/layout"
import PostList from "../components/postList"

interface IIndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              title: string
              date: string
              author: IAuthor
              tags: string[]
              description: string | undefined
            }
            wordCount: {
              words: number
            }
            html: string
            excerpt: string
            fields: {
              slug: string
            }
          }
        }
      ]
    }
  }
}

export default class extends React.Component<IIndexPageProps, {}> {
  constructor(props: IIndexPageProps, context: any) {
    super(props, context)
  }
  public render() {
    const posts: IPost[] = this.props.data.allMarkdownRemark.edges.map(post => {
      return {
        excerpt: post.node.excerpt,
        html: post.node.html,
        title: post.node.frontmatter.title,
        wordCount: post.node.wordCount.words,
        date: new Date(post.node.frontmatter.date),
        description: post.node.frontmatter.description,
        tags: post.node.frontmatter.tags,
        author: post.node.frontmatter.author,
        slug: post.node.fields.slug,
      }
    })

    return (
      <Layout>
        <PostList posts={posts} />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
