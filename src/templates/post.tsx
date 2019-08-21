import { graphql } from "gatsby"
import * as React from "react"

import IPost from "../interfaces/IPost"
import IAuthor from "../interfaces/IAuthor"

import Container from "@material-ui/core/Container"
import Layout from "../components/layout"
import Post from "../components/post"

interface IPostPageProps {
  data: {
    markdownRemark: {
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
      tags: this.props.data.markdownRemark.frontmatter.tags,
      date: new Date(this.props.data.markdownRemark.frontmatter.date),
      author: this.props.data.markdownRemark.frontmatter.author,
      slug: this.props.data.markdownRemark.fields.slug,
    }

    return (
      <Layout>
        <Container maxWidth="md">
          <Post post={post} />
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
`
