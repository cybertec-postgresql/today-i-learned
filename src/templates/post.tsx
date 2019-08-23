import { graphql } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"

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
    site: {
      siteMetadata: {
        title: string
        siteUrl: string
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
      description: this.props.data.markdownRemark.frontmatter.description,
      tags: this.props.data.markdownRemark.frontmatter.tags,
      date: new Date(this.props.data.markdownRemark.frontmatter.date),
      author: this.props.data.markdownRemark.frontmatter.author,
      slug: this.props.data.markdownRemark.fields.slug,
    }

    const siteUrl = this.props.data.site.siteMetadata.siteUrl

    return (
      <Layout>
        <Helmet>
          <link rel="canonical" href={siteUrl + post.slug} />

          {/* <!-- Twitter Card data --> */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={post.title} />
          <meta
            name="twitter:description"
            content={post.description ? post.description : post.excerpt}
          />
          <meta name="twitter:creator" content={post.author.twitter} />

          {/* <!-- Open Graph data --> */}
          <meta property="og:title" content={post.title} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={siteUrl + post.slug} />
          <meta
            property="og:description"
            content={post.description ? post.description : post.excerpt}
          />
          <meta
            property="article:published_time"
            content={post.date.toISOString()}
          />
          <meta
            property="article:author"
            content={siteUrl + "/author/" + post.author.name}
          />
          {post.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </Helmet>
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
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
