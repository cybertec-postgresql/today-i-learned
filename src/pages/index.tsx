import * as React from "react"

import IPost from "../interfaces/IPost"

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
            }
            wordCount: {
              words: number
            }
            html: string
            excerpt: string
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
          }
          wordCount {
            words
          }
          html
          excerpt
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
