import * as React from "react"
import Layout from "../components/layout"
import IAuthor from "../interfaces/IAuthor"
import IPost from "../interfaces/IPost"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
    tagPaper: {
      padding: theme.spacing(2),
    },
  })
)

interface ITagPageProps {
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
}

interface ITagPageContext {
  limit: number
  skip: number
  numPages: number
  currentPage: number
  tag: string
}

const TagPage = ({
  data,
  pageContext,
}: {
  data: ITagPageProps
  pageContext: ITagPageContext
}) => {
  const classes = useStyles()
  const posts: IPost[] = data.allMarkdownRemark.edges.map(post => {
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

  const { currentPage, numPages, tag } = pageContext

  return (
    <Layout>
      <Helmet>
        <title>Posts tagged "{pageContext.tag}"</title>
        <meta
          name="description"
          content={`A list of all posts tagged with ${pageContext.tag}`}
        />
        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`Posts tagged "${pageContext.tag}"`}
        />
        <meta
          name="twitter:description"
          content={`À list of all posts tagged with "${pageContext.tag}".`}
        />
        {/* <!-- Schema.Org BreadcrumbList --> */}
        <script type="application/ld+json">
          {`{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement":
              [
               {
                "@type": "ListItem",
                "position": 1,
                "name": "Tags",
                "item": "https://til.cybertec-postgresql.com/"
               },
               {
                "@type": "ListItem",
                "position": 2,
                "name": "${pageContext.tag}",
                "item": "https://til.cybertec-postgresql.com/tag/${pageContext.tag}"
               }
              ]
            }`}
        </script>
      </Helmet>
      <Container maxWidth="md" className={classes.root}>
        <Paper elevation={1} className={classes.tagPaper}>
          <Typography variant="h4" component="h1" align="center">
            Posts tagged "{pageContext.tag}"
          </Typography>
        </Paper>
      </Container>
      <PostList posts={posts ? posts : []} />
      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        indexPath={"/tag/" + tag}
        basePath={"/tag/" + tag + "/"}
      />
    </Layout>
  )
}

export default TagPage

export const TagPageQuery = graphql`
  query TagPageQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        frontmatter: { tags: { in: [$tag] } }
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
  }
`
