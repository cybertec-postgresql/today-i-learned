import * as React from "react"

import {
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles"

import CssBaseline from "@material-ui/core/CssBaseline"
import { Helmet } from "react-helmet"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Link, useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "@material-ui/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Box from "@material-ui/core/Box"
import CookieBanner from "../components/cookiebanner"
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
    root: {
      minHeight: "100vh",
      position: "relative",
    },
    footer: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
    footerLink: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      color: theme.palette.secondary.contrastText,
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
    footerAuthor: {
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: theme.palette.error.main,
        margin: theme.spacing(0, 1),
        fontSize: theme.typography.h6.fontSize,
      },
    },
  })
)

interface ILayoutPageQuery {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
      twitter: string
    }
  }
  file: {
    publicURL: string
  }
}

const Layout = ({ children }: { children: any }) => {
  const classes = useStyles()
  const footerLinks = [
    {
      text: "Imprint",
      to: "/imprint",
    },
    {
      text: "Contact",
      to: "https://www.cybertec-postgresql.com/en/contact/",
      extern: true,
    },
    {
      text: "Privacy",
      to: "/privacy",
    },
  ]

  const data: ILayoutPageQuery = useStaticQuery(graphql`
    query LayoutPageQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitter
        }
      }
      file(relativePath: { eq: "Logo.svg" }) {
        publicURL
      }
    }
  `)
  const siteMetadata = data.site.siteMetadata

  const titleTooSmall = useMediaQuery("(max-width:360px)")

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <html lang="en" />

        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={siteMetadata.twitter} />
        <meta name="twitter:title" content={siteMetadata.title} />
        <meta name="twitter:description" content={siteMetadata.description} />

        {/* <!-- Open Graph data --> */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={siteMetadata.title} />

        {/* <!-- Scheme.org Corporation --> */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "Cybertec Schönig & Schönig GmbH",
            "alternateName": "Cybertec",
            "url": "https://www.cybertec-postgresql.com/",
            "logo": "http://til.cybertec-postgresql.com/icons/icon-512x512.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+43 2622 93022-0",
              "contactType": "sales",
              "availableLanguage": ["en", "German"]
            },
            "sameAs": [
              "https://www.facebook.com/cybertec.postgresql/",
              "https://twitter.com/postgressupport",
              "https://github.com/cybertec-postgresql",
              "https://www.cybertec-postgresql.com/"
            ]
          }`}
        </script>
      </Helmet>

      <CssBaseline />
      <CookieBanner />
      <Box className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              <Link to="/" className={classes.headerTitle}>
                <span>{titleTooSmall ? "TIL" : "Today I learned"}</span>
                <span className={classes.headerLeftSpace}>@</span>
                <img
                  src={data.file.publicURL}
                  className={classes.headerLogo}
                  placeholder="Cybertec"
                  alt="Cybertec"
                />
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box paddingBottom="32px">{children}</Box>
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Grid container>
              {footerLinks.map(item => {
                const L = (props: any) =>
                  item.extern ? (
                    <a
                      href={item.to}
                      {...props}
                      target="_blank"
                      rel="noopener"
                    />
                  ) : (
                    <Link to={item.to} {...props} />
                  )

                return (
                  <Grid item key={item.text}>
                    <Typography
                      className={classes.footerLink}
                      variant="h6"
                      component={L}
                    >
                      {item.text}
                    </Typography>
                  </Grid>
                )
              })}
            </Grid>
          </Container>
        </footer>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
