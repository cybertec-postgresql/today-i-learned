import IPost from "./IPost"

export default interface IAuthor {
  name: string
  email: string
  subtitle: string
  posts?: IPost[]
  twitter?: string
  github?: string
  web?: string
  linkedin?: string
}
