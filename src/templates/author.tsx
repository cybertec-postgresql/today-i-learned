import * as React from "react"
import { graphql } from "gatsby"

import IAuthor from "../interfaces/IAuthor"

import { Helmet } from "react-helmet"
import Container from "@material-ui/core/Container"
import Layout from "../components/layout"
import {
  Paper,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  SvgIcon,
} from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import PostList from "../components/postList"
import Pagination from "../components/pagination"
import LanguageIcon from "@material-ui/icons/Language"
import EmailIcon from "@material-ui/icons/Email"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
    },
    authorPaper: {
      padding: theme.spacing(2),
    },
    authorIcons: {
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
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
    subtitle: string
    twitter?: string
    github?: string
    web?: string
    linkedin?: string
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
    subtitle: data.authorsYaml.subtitle,
    twitter: data.authorsYaml.twitter,
    github: data.authorsYaml.github,
    web: data.authorsYaml.web,
    linkedin: data.authorsYaml.linkedin,
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
        <title>Posts by {author.name}</title>

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
            {author.name}
          </Typography>
          <Typography variant="h6" component="p" align="center">
            {author.subtitle}
          </Typography>
          <Grid container className={classes.authorIcons}>
            {author.github && (
              <Tooltip title="GitHub" aria-label="GitHub">
                <a
                  href={`https://github.com/${author.github}`}
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton aria-label="GitHub" size="small">
                    <SvgIcon>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                        transform="translate(2 2) scale(1.25)"
                        fill="#1B1F23"
                      />
                    </SvgIcon>
                  </IconButton>
                </a>
              </Tooltip>
            )}
            {author.twitter && (
              <Tooltip title="Twitter" aria-label="Twitter">
                <a
                  href={`https://twitter.com/${author.twitter}`}
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton aria-label="Twitter" size="small">
                    <SvgIcon>
                      <path
                        transform="translate(-4 -4.133) scale(0.08)"
                        fill="#1da1f2"
                        d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
                      />
                    </SvgIcon>
                  </IconButton>
                </a>
              </Tooltip>
            )}
            {author.web && (
              <Tooltip title="Web" aria-label="Web">
                <a href={author.web} target="_blank" rel="noopener">
                  <IconButton aria-label="Cybertec" size="small">
                    <LanguageIcon />
                  </IconButton>
                </a>
              </Tooltip>
            )}
            {author.linkedin && (
              <Tooltip title="LinkedIn" aria-label="LinkedIn">
                <a
                  href={`https://linkedin.com/in/${author.linkedin}`}
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton aria-label="LinkedIn" size="small">
                    <SvgIcon>
                      <path
                        d="m340.864 340.559h-59.223v-92.744c0-22.116-.394-50.585-30.8-50.585-30.845 0-35.564 24.096-35.564 48.975v94.348h-59.222v-190.719h56.852v26.064h.796c11.594-19.821 33.148-31.66 56.095-30.808 60.023 0 71.09 39.481 71.09 90.844zm-251.631-216.795c-18.981.003-34.37-15.38-34.374-34.361-.003-18.98 15.381-34.37 34.362-34.373 18.98-.004 34.369 15.381 34.372 34.361 0 9.121-3.62 17.862-10.066 24.307-6.444 6.445-15.185 10.066-24.3 10.066m29.617 216.795h-59.284v-190.725h59.284zm251.545-340.526h-340.588c-16.096-.181-29.296 12.713-29.493 28.809v342c.19 16.105 13.388 29.011 29.493 28.84h340.588c16.136.203 29.387-12.704 29.61-28.84l.001-342.024c-.231-16.128-13.483-29.021-29.611-28.808"
                        fill="#0a66c2"
                        transform="translate(2 2) scale(0.05)"
                      />
                    </SvgIcon>
                  </IconButton>
                </a>
              </Tooltip>
            )}
            {author.email && (
              <Tooltip title="E-Mail" aria-label="E-Mail">
                <a
                  href={`mailto:${author.email}`}
                  target="_blank"
                  rel="noopener"
                >
                  <IconButton aria-label="E-Mail" size="small">
                    <EmailIcon />
                  </IconButton>
                </a>
              </Tooltip>
            )}
          </Grid>
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
              subtitle
              twitter
              github
              web
              linkedin
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
      subtitle
      twitter
      github
      web
      linkedin
    }
  }
`
