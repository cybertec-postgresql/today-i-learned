import * as React from "react"

import Container from "@material-ui/core/Container"
import IPost from "../interfaces/IPost"
import Post from "./post"

const PostList = ({ posts }: { posts: IPost[] }) => (
  <Container maxWidth="md">
    {posts.map(post => {
      return <Post key={post.title} post={post} />
    })}
  </Container>
)

export default PostList
