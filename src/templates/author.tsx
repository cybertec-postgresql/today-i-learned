import * as React from "react"
import { graphql } from "gatsby"

import IAuthor from "../interfaces/IAuthor"

import { Helmet } from "react-helmet"
import Container from "@material-ui/core/Container"
import Layout from "../components/layout"
import { Paper, Typography } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import PostList from "../components/postList"
import Pagination from "../components/pagination"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
    authorPaper: {
      padding: theme.spacing(2),
    },
  })
)

interface IAuthorPageProps {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          frontmatter: {
            title: string
            date: string
            tags: string[]
            description: string | undefined
            author: IAuthor
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
  authorsYaml: {
    name: string
    email: string
  }
}

interface IAuthorPageContext {
  limit: number
  skip: number
  numPages: number
  currentPage: number
  email: number
}

const AuthorPage = ({
  data,
  pageContext,
}: {
  data: IAuthorPageProps
  pageContext: IAuthorPageContext
}) => {
  const classes = useStyles()
  const author: IAuthor = {
    name: data.authorsYaml.name,
    email: data.authorsYaml.email,
  }
  const posts = data.allMarkdownRemark.edges.map(post => {
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

  const { currentPage, numPages } = pageContext

  return (
    <Layout>
      <Helmet>
        <meta property="og:type" content="profile" />
        <meta
          property="profile:first_name"
          content={author.name.split(" ")[0]}
        />
        <meta
          property="profile:last_name"
          content={author.name.split(" ")[1]}
        />
        <meta property="profile:username" content={author.email} />
        <meta property="og:type" content="profile" />
        <meta property="og:type" content="profile" />
      </Helmet>

      <Container maxWidth="md" className={classes.root}>
        <Paper elevation={1} className={classes.authorPaper}>
          <Typography variant="h4" component="h1" align="center">
            Posts by {author.name}
          </Typography>
        </Paper>
      </Container>
      <PostList posts={posts ? posts : []} />
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        indexPath={"/author/" + author.name}
        basePath={"/author/" + author.name + "/"}
      />
    </Layout>
  )
}

export default AuthorPage

export const AuthorPageQuery = graphql`
  query AuthorPageQuery($skip: Int!, $limit: Int!, $email: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        frontmatter: { author: { email: { eq: $email } } }
        fileAbsolutePath: { regex: "/posts/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            description
            author {
              name
              email
            }
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
    authorsYaml(email: { eq: $email }) {
      name
      email
    }
  }
`
