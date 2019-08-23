import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import IPost from "../interfaces/IPost"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"
import { Grid, Divider } from "@material-ui/core"
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
    postTag: {
      marginRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold,
      cursor: "pointer",
    },
    footerDivider: {
      margin: theme.spacing(3, 0),
    },
    footerLink: {
      color: theme.palette.secondary.dark,
      fontWeight: theme.typography.fontWeightBold,
    },
  })
)

const Post = ({ post }: { post: IPost }) => {
  const classes = useStyles()

  if (typeof post.date === "string") {
    post.date = new Date(post.date)
  }

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
          {post.date.toLocaleDateString()}
        </Typography>
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="markdown-body"
      />
      <Divider variant="middle" className={classes.footerDivider} />
      <footer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {post.tags.map(tag => {
              return (
                <Chip
                  component={React.forwardRef((props: any, ref: any) => (
                    <Link to={"/tag/" + tag} {...props} ref={ref} />
                  ))}
                  key={tag}
                  size="small"
                  label={tag}
                  color="primary"
                  className={classes.postTag}
                />
              )
            })}
          </Grid>
          <Grid item>
            Written by{" "}
            <Link
              to={`/author/${post.author.name}`}
              className={classes.footerLink}
            >
              {post.author.name}
            </Link>
          </Grid>
        </Grid>
      </footer>
    </Paper>
  )
}

export default Post
