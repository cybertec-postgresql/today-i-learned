import { graphql } from "gatsby"
import * as React from "react"

import IPost from "../interfaces/IPost"

import Layout from "../components/layout"
import Post from "../components/post"

interface IPostPageProps {
  data: {
    markdownRemark: {
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
}

export default class extends React.Component<IPostPageProps, {}> {
  constructor(props: IPostPageProps, context: any) {
    super(props, context)
  }
  public render() {
    const post: IPost = {
      excerpt: this.props.data.markdownRemark.excerpt,
      html: this.props.data.markdownRemark.html,
      title: this.props.data.markdownRemark.frontmatter.title,
      wordCount: this.props.data.markdownRemark.wordCount.words,
    }

    return (
      <Layout>
        <Post post={post} />
      </Layout>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
`
