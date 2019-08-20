import * as React from "react"

import "normalize.css"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Today I Learned
          </Typography>
          <Typography variant="h6" color="inherit">
            @Cybertec
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}

export default Layout
