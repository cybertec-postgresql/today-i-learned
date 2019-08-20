import * as React from "react"

import IPost from "../interfaces/IPost"

const Post = ({ post }: { post: IPost }) => (
  <article>
    <header>
      <h1>{post.title}</h1>
    </header>
  </article>
)

export default Post
