import * as React from "react"

import IAuthor from "../interfaces/IAuthor"

import Container from "@material-ui/core/Container"
import Layout from "../components/layout"
import { Paper, Typography } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import PostList from "../components/postList"

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

interface ITagProps {
  pageContext: {
    author: IAuthor
  }
}

const TagPage = ({ pageContext }: ITagProps) => {
  const classes = useStyles()
  const author = pageContext.author

  return (
    <Layout>
      <Container maxWidth="md" className={classes.root}>
        <Paper elevation={1} className={classes.authorPaper}>
          <Typography variant="h4" component="h1" align="center">
            Posts by {author.name}
          </Typography>
        </Paper>
        <PostList posts={author.posts ? author.posts : []} />
      </Container>
    </Layout>
  )
}

export default TagPage
