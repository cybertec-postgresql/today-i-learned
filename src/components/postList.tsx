import * as React from "react"

import Container from "@material-ui/core/Container"
import IPost from "../interfaces/IPost"
import Post from "./post"
import IShare from "../interfaces/IShare"

const PostList = ({ posts }: { posts: IPost[] }) => (
  <Container maxWidth="md">
    {posts.map(post => {
      const share: IShare = {
        socialConfig: {
          relativePath: post.slug,
          title: post.title,
        },
        tags: post.tags,
      }

      return <Post key={post.title} post={post} share={share} />
    })}
  </Container>
)

export default PostList
