import * as React from "react"
import {
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles"

import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Link, StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#38bde9",
    },
    secondary: {
      main: "#282f3a",
      dark: "#202630",
    },
    background: {
      default: "#282f3a",
    },
  },
  typography: {
    fontWeightRegular: 300,
    fontWeightLight: 300,
    fontWeightMedium: 300,
    fontWeightBold: 400,
  },
})

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
    },
    footerLink: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    header: {},
    headerTitle: {
      color: theme.palette.text.primary,
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },
    headerLogo: {
      height: theme.typography.h6.fontSize,
    },
    headerLeftSpace: {
      marginLeft: theme.spacing(1),
    },
  })
)

const Layout = ({ children }: { children: any }) => {
  const classes = useStyles()
  const footerLinks = [
    {
      text: "Imprint",
    },
    {
      text: "Contact",
    },
    {
      text: "Privacy",
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            <Link to="/" className={classes.headerTitle}>
              <span>Today I Learned</span>
              <span className={classes.headerLeftSpace}>@</span>
              <StaticQuery
                query={graphql`
                  query LayoutQuery {
                    file(relativePath: { eq: "Logo.svg" }) {
                      publicURL
                    }
                  }
                `}
                render={data => (
                  <img
                    src={data.file.publicURL}
                    className={classes.headerLogo}
                    placeholder="Cybertec"
                  />
                )}
              />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" component="p">
                &copy; 2019 Cybertec Schönig & Schönig GmbH
              </Typography>
            </Grid>
            <Grid item>
              <Grid container justify="space-evenly">
                {footerLinks.map(item => {
                  return (
                    <Grid item key={item.text}>
                      <Typography
                        className={classes.footerLink}
                        variant="h6"
                        component="p"
                      >
                        {item.text}
                      </Typography>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </ThemeProvider>
  )
}

export default Layout
