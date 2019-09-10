export default interface IShare {
  socialConfig: {
    twitter: string
    config: {
      url: string
      title: string
    }
  }
  tags: string[]
}
