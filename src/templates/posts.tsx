import { graphql } from "gatsby"
import * as React from "react"
import IAuthor from "../interfaces/IAuthor"
import IPost from "../interfaces/IPost"
import Layout from "../components/layout"
import PostList from "../components/postList"
import Pagination from "../components/pagination"

interface IPostsPageProps {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          frontmatter: {
            title: string
            date: string
            formattedDate: string
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

interface IPostsPageContext {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

const PostsPage = ({
  data,
  pageContext,
}: {
  data: IPostsPageProps
  pageContext: IPostsPageContext
}) => {
  const posts: IPost[] = data.allMarkdownRemark.edges.map(post => {
    return {
      excerpt: post.node.excerpt,
      html: post.node.html,
      title: post.node.frontmatter.title,
      wordCount: post.node.wordCount.words,
      date: new Date(post.node.frontmatter.date),
      formattedDate: post.node.frontmatter.formattedDate,
      description: post.node.frontmatter.description,
      tags: post.node.frontmatter.tags,
      author: post.node.frontmatter.author,
      slug: post.node.fields.slug,
    }
  })

  const { currentPage, numPages } = pageContext

  return (
    <Layout>
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        indexPath="/"
        basePath="/posts/"
      />
    </Layout>
  )
}

export default PostsPage

export const postPageQuery = graphql`
  query postPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: "/posts/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            formattedDate: date(formatString: "YYYY-MM-DD")
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
`
