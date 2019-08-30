import * as React from "react"

import Layout from "../components/layout"
import { StaticQuery, graphql, Link } from "gatsby"
import { Paper, Container, Typography } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(3),
    },
    errorText: {
      marginTop: theme.spacing(4),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  })
)

const NotFoundPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Helmet>
        <title>404 Not Found - Today I learned @Cybertec</title>
      </Helmet>
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Typography variant="h1" component="h1" align="center">
            ¯\_(ツ)_/¯
          </Typography>
          <Typography
            variant="h6"
            component="p"
            align="center"
            className={classes.errorText}
          >
            404 Not Found
          </Typography>
          <Typography
            variant="h6"
            component="p"
            align="center"
            className={classes.errorText}
          >
            <Link to="/" className={classes.link}>
              Please take me back!!
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
