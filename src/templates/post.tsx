import { graphql } from "gatsby"
import * as React from "react"
import { Helmet } from "react-helmet"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import IPost from "../interfaces/IPost"
import IAuthor from "../interfaces/IAuthor"
import IShare from "../interfaces/IShare"

import Container from "@material-ui/core/Container"
import Layout from "../components/layout"
import Post from "../components/post"
import Paper from "@material-ui/core/Paper"
import Utterances from "../components/utterances"

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
        siteUrl: string
      }
    }
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    utterances: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 3),
    },
  })
)

const PostPage = ({ data }: IPostPageProps) => {
  const post: IPost = {
    excerpt: data.markdownRemark.excerpt,
    html: data.markdownRemark.html,
    title: data.markdownRemark.frontmatter.title,
    wordCount: data.markdownRemark.wordCount.words,
    description: data.markdownRemark.frontmatter.description,
    tags: data.markdownRemark.frontmatter.tags,
    date: new Date(data.markdownRemark.frontmatter.date),
    author: data.markdownRemark.frontmatter.author,
    slug: data.markdownRemark.fields.slug,
  }

  const siteUrl = data.site.siteMetadata.siteUrl

  const share: IShare = {
    socialConfig: {
      relativePath: post.slug,
      title: post.title,
    },
    tags: post.tags,
  }

  const classes = useStyles()

  return (
    <Layout>
      <Helmet>
        <link rel="canonical" href={siteUrl + post.slug} />
        <meta name="description" content={post.description} />
        <title>{post.title}</title>

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

        {/* <!-- Schema.Org Article --> */}
        <script type="application/ld+json">
          {`{
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${siteUrl + post.slug}"
              },
              "headline": "${post.title}",
              "author": {
                "@type": "Person",
                "name": "${post.author.name}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Cybertec Schönig & Schönig GmbH",
                "logo": {
                  "@type": "ImageObject",
                  "url":
                    "http://til.cybertec-postgresql.com/icons/icon-512x512.png",
                  "width": 512,
                  "height": 512
                }
              },
              "datePublished": "${post.date.toISOString()}"
            }`}
        </script>

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
                "name": "Posts",
                "item": "https://til.cybertec-postgresql.com/"
               },
               {
                "@type": "ListItem",
                "position": 2,
                "name": "${post.title}",
                "item": "${siteUrl + post.slug}"
               }
              ]
            }`}
        </script>
      </Helmet>
      <Container maxWidth="md">
        <Post post={post} share={share} />
      </Container>
      <Container maxWidth="md">
        <Paper className={classes.utterances} component="article" elevation={1}>
          <style>
            {`
            .utterances {
              max-width: 100%;
              width: 100%;
            }
            `}
          </style>
          <Utterances
            repo="cybertec-postgresql/today-i-learned-content"
            issueTerm="og:title"
            label="Comments 💬"
            theme="github-light"
          />
        </Paper>
      </Container>
    </Layout>
  )
}

export default PostPage

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
        siteUrl
      }
    }
  }
`
