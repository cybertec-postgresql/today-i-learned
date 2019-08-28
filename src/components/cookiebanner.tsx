import * as React from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      padding: theme.spacing(1, 1.5),
      background: theme.palette.primary.main,
      zIndex: 1,
    },
    button: {
      margin: theme.spacing(0),
    },
    link: {
      textDecoration: "none",
      fontWeight: theme.typography.fontWeightBold,
    },
    hidden: {
      display: "none",
    },
  })
)

const useStateWithLocalStorage = (
  localStorageKey: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  )
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [value])
  return [value, setValue]
}

const CookieBanner = () => {
  const classes = useStyles()
  const [value, setValue] = useStateWithLocalStorage("removeCookieBanner")

  const onClicked = (_: any) => setValue(String(true))

  return (
    <div className={value ? classes.hidden : classes.banner}>
      <span>
        By using this website you agree to the use of cookies. Find out more in
        our{" "}
        <Link className={classes.link} to="/privacy">
          privacy policy
        </Link>
        .
      </span>
      <IconButton
        size="small"
        className={classes.button}
        aria-label="close"
        onClick={onClicked}
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default CookieBanner
