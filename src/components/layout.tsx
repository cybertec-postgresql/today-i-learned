import * as React from "react"

import {
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles"

import CssBaseline from "@material-ui/core/CssBaseline"
import { Helmet } from "react-helmet"
import AppBar from "@material-ui/core/AppBar"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Link, useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "@material-ui/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Box from "@material-ui/core/Box"
import CookieBanner from "../components/cookiebanner"
import SvgIcon from "@material-ui/core/SvgIcon"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import LanguageIcon from "@material-ui/icons/Language"
import { NoSsr } from "@material-ui/core"

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontWeight: 500,
        // fontSize: "1em",
        // letterSpacing: "6",
      },
    },
  },
  palette: {
    type: "light",
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
      minHeight: "calc(100vh - 64px)",
      position: "relative",
      [theme.breakpoints.down("sm")]: {
        minHeight: "calc(100vh - 96px)",
      },
    },
    footer: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
      position: "absolute",
      bottom: "-64px",
      width: "100%",
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
        bottom: "-96px",
      },
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
    headerIconGrid: {
      // display: "inline-flex",
      // alignItems: "center",
      fontWeight: theme.typography.fontWeightBold,
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
      text: "About",
      to: "/about",
    },
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
    {
      text: "RSS Feed",
      to: "/rss.xml",
      extern: true,
    },
    {
      text: "Sitemap",
      to: "/sitemap.xml",
      extern: true,
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

  const titleTooSmall = useMediaQuery("(max-width:500px)")

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{siteMetadata.title}</title>
        {/* <meta name="description" content={siteMetadata.description} /> */}
        <html lang="en" />

        {/* <!-- Twitter Card data --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={siteMetadata.twitter} />
        <meta name="twitter:title" content={siteMetadata.title} />
        {/* <meta name="twitter:description" content={siteMetadata.description} /> */}

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
      <NoSsr>
        <CookieBanner />
      </NoSsr>
      <Box className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <Grid container justify="space-between" alignItems="center">
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
              <Grid className={classes.headerIconGrid}>
                <Tooltip title="Twitter" aria-label="Twitter">
                  <a
                    href="https://twitter.com/PostgresSupport"
                    target="_blank"
                    rel="noopener"
                  >
                    <IconButton
                      aria-label="Twitter"
                      size={titleTooSmall ? "small" : "medium"}
                    >
                      <SvgIcon>
                        <path
                          // transform="translate(-7.5 -6.1) scale(0.096)"
                          transform="translate(-4 -4.133) scale(0.08)"
                          fill="#1da1f2"
                          d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
                        />
                      </SvgIcon>
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title="Cybertec" aria-label="Cybertec">
                  <a
                    href="https://www.cybertec-postgresql.com/"
                    target="_blank"
                    rel="noopener"
                  >
                    <IconButton
                      aria-label="Cybertec"
                      size={titleTooSmall ? "small" : "medium"}
                    >
                      <LanguageIcon />
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title="GitHub" aria-label="GitHub">
                  <a
                    href="https://github.com/cybertec-postgresql/today-i-learned"
                    target="_blank"
                    rel="noopener"
                  >
                    <IconButton
                      aria-label="GitHub"
                      size={titleTooSmall ? "small" : "medium"}
                    >
                      <SvgIcon>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                          transform="translate(2 2) scale(1.25)"
                          fill="#1B1F23"
                        />
                      </SvgIcon>
                    </IconButton>
                  </a>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box>{children}</Box>
        <Grid container className={classes.footer} component="footer">
          {footerLinks.map(item => {
            const L = (props: any) =>
              item.extern ? (
                <a href={item.to} {...props} target="_blank" rel="noopener" />
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
      </Box>
    </ThemeProvider>
  )
}

export default Layout
