import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

import "normalize.css"

import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },
  })
)

const Layout = ({ children }: { children: any }) => {
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Today I Learned
          </Typography>
          <Typography variant="h6" color="inherit">
            @Cybertec
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container justify="space-between">
            <Grid item={true}>
              <Typography variant="h6" component="p">
                &copy; 2019 Cybertec Schönig & Schönig GmbH
              </Typography>
            </Grid>
            <Grid item={true}>
              <Typography variant="h6" component="p">
                Stuff later
              </Typography>{" "}
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
