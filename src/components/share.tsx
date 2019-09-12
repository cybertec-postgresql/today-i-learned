import React from "react"

import Box from "@material-ui/core/Box"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import { useStaticQuery, graphql } from "gatsby"

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from "react-share"

import IShare from "../interfaces/IShare"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(1, 0, 0, 0),
      },
      textAlign: "center",
    },
    socialButtonWrapper: {
      verticalAlign: "top",
      display: "inline-block",
      marginRight: "15px",
      textAlign: "center",
      "&:last-child": {
        marginRight: 0,
      },
    },
    shareText: {
      marginRight: "15px",
      display: "inline-block",
      marginTop: "5px",
      [theme.breakpoints.down("xs")]: {
        marginRight: theme.spacing(1),
      },
    },
  })
)

const Share = ({ socialConfig, tags }: IShare) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query ShareQuery {
      site {
        siteMetadata {
          title
          siteUrl
          twitter
        }
      }
    }
  `)

  const url = `${data.site.siteMetadata.siteUrl}${socialConfig.relativePath}`
  const twitter = data.site.siteMetadata.twitter.split("@").join("")

  return (
    <Box className={classes.root}>
      <Box className={classes.socialButtonWrapper}>
        <FacebookShareButton url={url} quote={socialConfig.title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </Box>
      <Box className={classes.socialButtonWrapper}>
        <TwitterShareButton
          url={url}
          title={socialConfig.title}
          via={twitter}
          hashtags={tags}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </Box>
      <Box className={classes.socialButtonWrapper}>
        <LinkedinShareButton url={url} title={socialConfig.title}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </Box>
      <Box className={classes.socialButtonWrapper}>
        <RedditShareButton
          url={url}
          title={socialConfig.title}
          windowWidth={660}
          windowHeight={460}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </Box>
    </Box>
  )
}

Share.defaultProps = {
  tags: [],
}

export default Share
