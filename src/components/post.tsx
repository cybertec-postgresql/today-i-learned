import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import IPost from "../interfaces/IPost"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { Link } from "gatsby"
import { Grid } from "@material-ui/core"
import Chip from "@material-ui/core/Chip"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(3),
    },
    post: {
      fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
    },
    postTitle: {
      color: theme.palette.primary.dark,
      textDecoration: "none",
      fontWeight: theme.typography.fontWeightBold,
    },
    postDate: {
      margin: theme.spacing(1, 0, 3),
    },
  })
)

const Post = ({ post }: { post: IPost }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} component="article" elevation={1}>
      <header>
        <Typography variant="h4" component="h1" align="center">
          <Link to={post.slug} className={classes.postTitle}>
            {post.title}
          </Link>
        </Typography>
        <Typography
          variant="body1"
          component="p"
          align="center"
          className={classes.postDate}
        >
          {post.date.toDateString()}
        </Typography>
        {/* <Divider variant="middle" /> */}
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="markdown-body"
      />
      <footer>
        <Grid>
          <Grid item>Written by {post.author.name}</Grid>
        </Grid>
      </footer>
    </Paper>
  )
}

export default Post
