import * as React from "react"

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import IPost from "../interfaces/IPost"

const Post = ({ post }: { post: IPost }) => (
  <Card>
    <CardHeader title={post.title} subheader="August, 2019" />
    <CardContent dangerouslySetInnerHTML={{ __html: post.html }} />
  </Card>
)

export default Post
