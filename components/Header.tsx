import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import Menu from './Menu'
import colors from '../utils/colors'
import { SMALL_SCREEN_SIZE, APP_NAME } from '../utils/constants'

const useStyles = makeStyles(theme => ({
  grow: {
    flex: 1,
    backgroundColor: colors.black,
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      position: 'relative',
    }
  },
  appBar: {
    width: '100%',
    backgroundColor: colors.black,
    position: "absolute",
  },
  toolbar: {
    flex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    backgroundColor: colors.black,
    height: '100vh',
    padding: 24,
    paddingTop: 10,
    width: 230
  },
  leftMenuIcon: {
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  accountButton: {
    padding: 0,
  },
  accountIcon: {
    fontSize: 35,
  },
  loginButton: {
    color: colors.white
  },
  avatarWrapper: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 5,
  }
}))

type Props = {
  title?: string
}

const Header = (props: Props) => {
  const styles = useStyles()
  const [drawerLeftOPen, setDrawerLeftOpen] = useState(false)

  return (
    <div className={styles.grow}>
      <AppBar className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            aria-label="Open left menu"
            onClick={() => setDrawerLeftOpen(true)}
            color="inherit"
            className={styles.leftMenuIcon}>
            <MenuIcon />
          </IconButton>
          {/* <SearchInput /> */}
          <Typography variant="h6" className={styles.title}>
            {props.title || APP_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Left Drawer */}
      <SwipeableDrawer
        onOpen={() => setDrawerLeftOpen(true)}
        open={drawerLeftOPen}
        onClose={() => setDrawerLeftOpen(false)}
      // disableBackdropTransition={!iOS}
      // disableDiscovery={iOS}
      >
        <div className={styles.drawer}>
          <Menu closeDrawerLeft={setDrawerLeftOpen} />
        </div>
      </SwipeableDrawer>
    </div>
  )
}

export default Header