import * as React from "react"

import IPost from "../interfaces/IPost"
import Post from "./post"

const PostList = ({ posts }: { posts: IPost[] }) => (
  <div>
    <h1>Hi, this is a postList.</h1>
    {posts.map(post => {
      return <Post key={post.title} post={post} />
    })}
  </div>
)

export default PostList
