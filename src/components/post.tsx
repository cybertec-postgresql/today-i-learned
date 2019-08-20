import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import IPost from "../interfaces/IPost"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(3, 2),
    },
  })
)

const Post = ({ post }: { post: IPost }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} component="article">
      <header>
        <Typography variant="h3" component="h3" align="center">
          {post.title}
        </Typography>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Paper>
  )
}

export default Post
