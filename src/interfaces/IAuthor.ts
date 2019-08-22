import IPost from "./IPost"

export default interface IAuthor {
  name: string
  email: string
  posts?: IPost[]
  twitter?: string
}
