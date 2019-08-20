import * as React from "react"

import IPost from "../interfaces/IPost"

const Post = ({ post }: { post: IPost }) => (
  <div>
    <h1>Hi, this is a post.</h1>
    <h2>{post.title}</h2>
  </div>
)

export default Post
