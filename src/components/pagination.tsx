import { Link } from "gatsby"
import * as React from "react"

import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import { Paper, Container } from "@material-ui/core"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
)

interface IPaginationProps {
  currentPage: number
  numPages: number
  basePath: string
  indexPath: string
}

const Pagination = (paginationProps: IPaginationProps) => {
  const classes = useStyles()
  const { currentPage, numPages, indexPath, basePath } = paginationProps

  const FirstPageLink = (props: any) => <Link to={indexPath} {...props} />
  const PreviousPageLink = (props: any) => (
    <Link
      to={currentPage > 2 ? basePath + (currentPage - 1) : indexPath}
      {...props}
    />
  )
  const NextPageLink = (props: any) => (
    <Link to={basePath + (currentPage + 1)} {...props} />
  )
  const LastPageLink = (props: any) => (
    <Link to={basePath + numPages} {...props} />
  )

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Paper>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="First"
            disabled={currentPage === 1}
            component={FirstPageLink}
            icon={<FirstPage />}
          />
          <BottomNavigationAction
            label="Previous"
            disabled={currentPage === 1}
            component={PreviousPageLink}
            icon={<ChevronLeft />}
          />
          <BottomNavigationAction
            label=""
            disabled
            icon={
              <span>
                {currentPage} / {numPages}
              </span>
            }
          />
          <BottomNavigationAction
            label="Next"
            disabled={currentPage === numPages}
            component={NextPageLink}
            icon={<ChevronRight />}
          />
          <BottomNavigationAction
            label="Last"
            disabled={currentPage === numPages}
            icon={<LastPage />}
            component={LastPageLink}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  )
}

export default Pagination
