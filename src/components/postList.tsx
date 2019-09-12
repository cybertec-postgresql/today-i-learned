import * as React from "react"

import Container from "@material-ui/core/Container"
import IPost from "../interfaces/IPost"
import Post from "./post"
import IShare from "../interfaces/IShare"

interface ISiteMetadata {
  title: string
  siteUrl: string
  twitter: string
}

const PostList = ({
  posts,
  siteMetadata,
}: {
  posts: IPost[]
  siteMetadata: ISiteMetadata
}) => (
  <Container maxWidth="md">
    {posts.map(post => {
      const siteUrl = siteMetadata.siteUrl

      const share: IShare = {
        socialConfig: {
          twitter: siteMetadata.twitter,
          config: {
            url: `${siteUrl}${post.slug}`,
            title: post.title,
          },
        },
        tags: post.tags,
      }

      return <Post key={post.title} post={post} share={share} />
    })}
  </Container>
)

export default PostList
