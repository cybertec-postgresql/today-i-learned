import React from "react"

import Box from "@material-ui/core/Box"

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
    },
    socialButtonWrapper: {
      verticalAlign: "top",
      display: "inline-block",
      marginRight: "15px",
      textAlign: "center",
      "&:last-child": {
        marginRight: 0,
      }
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
  return (
    <Box className={classes.root}>
      <Box className={classes.shareText}>Share:</Box>
      <Box className={classes.socialButtonWrapper}>
        <FacebookShareButton
          url={socialConfig.config.url}
          quote={socialConfig.config.title}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </Box>
      <Box className={classes.socialButtonWrapper}>
        <TwitterShareButton
          url={socialConfig.config.url}
          title={socialConfig.config.title}
          via={socialConfig.twitter.split("@").join("")}
          hashtags={tags}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </Box>
      <Box className={classes.socialButtonWrapper}>
        <LinkedinShareButton
          url={socialConfig.config.url}
          title={socialConfig.config.title}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </Box>
      <Box className={classes.socialButtonWrapper}>
        <RedditShareButton
          url={socialConfig.config.url}
          title={socialConfig.config.title}
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
