import React from "react"

import Box from "@material-ui/core/Box"

import { makeStyles, createStyles } from "@material-ui/core/styles"

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

const useStyles = makeStyles(() =>
  createStyles({
    socialWrapper: {
      verticalAlign: "top",
      display: "inline-block",
      marginRight: "15px",
      textAlign: "center",
    },
  })
)

const Share = ({ socialConfig, tags }: IShare) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Box className={classes.socialWrapper}>
        <FacebookShareButton
          url={socialConfig.config.url}
          quote={socialConfig.config.title}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </Box>
      <Box className={classes.socialWrapper}>
        <TwitterShareButton
          url={socialConfig.config.url}
          title={socialConfig.config.title}
          via={socialConfig.twitter.split("@").join("")}
          hashtags={tags}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </Box>
      <Box className={classes.socialWrapper}>
        <LinkedinShareButton
          url={socialConfig.config.url}
          title={socialConfig.config.title}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </Box>
      <Box className={classes.socialWrapper}>
        <RedditShareButton
          url={socialConfig.config.url}
          title={socialConfig.config.title}
          windowWidth={660}
            windowHeight={460}
        >
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </Box>
    </React.Fragment>
  )
}

Share.defaultProps = {
  tags: [],
}

export default Share
