import * as React from "react"
import Helmet from "react-helmet"

interface IUtterancesProps {
  repo: string
  issueTerm:
    | "pathname"
    | "url"
    | "title"
    | "og:title"
    | "issue-number"
    | "issue-term"
  label: string
  theme: string
}

class Utterances extends React.Component<IUtterancesProps, {}> {
  public state = { pending: true }
  private myRef = React.createRef<HTMLDivElement>()

  constructor(props: IUtterancesProps) {
    super(props)
  }

  public componentDidMount() {
    const { repo, issueTerm, label, theme } = this.props

    const scriptEl = document.createElement("script")
    scriptEl.src = "https://utteranc.es/client.js"
    scriptEl.setAttribute("repo", repo)
    scriptEl.setAttribute("issue-term", issueTerm)
    scriptEl.setAttribute("label", label)
    scriptEl.setAttribute("theme", theme)
    scriptEl.setAttribute("crossorigin", "anonymous")
    scriptEl.async = true
    scriptEl.onload = () => this.setState({ pending: false })
    if (this.myRef.current) {
      this.myRef.current.appendChild(scriptEl)
    }
  }

  public render() {
    return (
      <div>
        <Helmet>
          <link rel="preconnect" href="https://api.github.com" />
          <link rel="preconnect" href="https://utteranc.es" />
        </Helmet>
        <div ref={this.myRef}>
          {this.state.pending && <div>Loading comments...</div>}
        </div>
      </div>
    )
  }
}

export default Utterances
