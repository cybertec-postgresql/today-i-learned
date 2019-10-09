import IAuthor from "./IAuthor"

export default interface IPost {
  title: string
  wordCount: number
  html: string
  excerpt: string
  author: IAuthor
  description?: string
  tags: string[]
  date: Date
  formattedDate: string
  slug: string
}
