import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import IPost from "../interfaces/IPost"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"
import { Grid, Divider } from "@material-ui/core"
import Chip from "@material-ui/core/Chip"

import Share from "./share"
import IShare from "../interfaces/IShare"

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
      fontWeight: theme.typography.fontWeightBold,
      cursor: "pointer",
      margin: theme.spacing(0.5),
      borderRadius: theme.spacing(0.5),
    },
    footerDivider: {
      margin: theme.spacing(3, 0),
    },
    footerLink: {
      color: theme.palette.secondary.dark,
      fontWeight: theme.typography.fontWeightBold,
    },
    footerAuthor: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0, 0, 0),
      },
    },
    footer: {
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
        flexDirection: "column",
      },
    },
    footerRight: {
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
    tagGrid: {
      display: "flex",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "center",
      },
    },
  })
)

const Post = ({
  post,
  share: { socialConfig, tags },
}: {
  post: IPost
  share: IShare
}) => {
  const classes = useStyles()

  const date = post.formattedDate

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
          {date}
        </Typography>
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="markdown-body"
      />
      <Divider variant="middle" className={classes.footerDivider} />
      <footer>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.footer}
        >
          <Grid item className={classes.tagGrid} md={4}>
            {post.tags.map(tag => {
              return (
                <Chip
                  component={React.forwardRef((props: any, ref: any) => (
                    <Link to={"/tag/" + tag} {...props} ref={ref} />
                  ))}
                  key={tag}
                  size="small"
                  label={tag}
                  color="secondary"
                  variant="outlined"
                  className={classes.postTag}
                />
              )
            })}
          </Grid>
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            className={classes.footerRight}
            md={8}
          >
            <Grid item md={6} xs={12}>
              <Share socialConfig={socialConfig} tags={tags} />
            </Grid>
            <Grid item className={classes.footerAuthor}>
              <Link
                to={`/author/${post.author.name}`}
                className={classes.footerLink}
              >
                {post.author.name}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </Paper>
  )
}

export default Post
