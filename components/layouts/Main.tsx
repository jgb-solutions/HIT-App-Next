import React, { ReactNode } from 'react'
import { Grid } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'

import Menu from '../Menu'
import Content from '../Content'
import Header from '../Header'

import { mainLayoutStyles } from '../../styles/mainLayoutStyles'
import RootLayout from './Root'


export default function MainLayout({ children }: { children: ReactNode }) {
  const styles = mainLayoutStyles()

  return (
    <RootLayout>
      <Hidden xsDown>
        <Grid item md={2} sm={3} xs={12} className={`${styles.col} ${styles.leftGrid}`}>
          <Menu />
        </Grid>
      </Hidden>

      <Grid item md={10} sm={9} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
        <Header />
        <Content className={styles.col}>{children}</Content>
      </Grid>

      {/* <Hidden smDown>
        <Grid item md={2} sm={2} xs={12} className={`${styles.col} ${styles.rightGrid}`}>
          <Sidebar />
        </Grid>
      </Hidden> */}
    </RootLayout>
  )
}
