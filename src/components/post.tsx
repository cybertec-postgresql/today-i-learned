import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import IPost from "../interfaces/IPost"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(3, 2),
    },
    post: {
      fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
    },
  })
)

const Post = ({ post }: { post: IPost }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} component="article" elevation={1}>
      <header>
        <Typography variant="h4" component="h1" align="center">
          {post.title}
        </Typography>
        <Divider variant="middle" />
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="markdown-body"
      />
    </Paper>
  )
}

export default Post
