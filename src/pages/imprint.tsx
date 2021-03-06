import * as React from "react"

import Layout from "../components/layout"
import { StaticQuery, graphql } from "gatsby"
import { Paper, Container } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      padding: theme.spacing(3),
    },
  })
)

const ImprintPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Helmet>
        <title>Imprint - Today I learned @Cybertec</title>
      </Helmet>
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <StaticQuery
            query={graphql`
              query ImprintQuery {
                markdownRemark(fileAbsolutePath: { regex: "/imprint/" }) {
                  html
                }
              }
            `}
            render={data => (
              <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
                className="markdown-body"
              />
            )}
          />
        </Paper>
      </Container>
    </Layout>
  )
}
export default ImprintPage
