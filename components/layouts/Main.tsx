import React, { ReactNode } from 'react'
import { Grid } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'

import SEO from '../SEO'
import Menu from '../Menu'
import Header from '../Header'
import RootLayout from './Root'
import Content from '../Content'
import { mainLayoutStyles } from '../../styles/mainLayoutStyles'



export default function MainLayout({ children, title }: { children: ReactNode, title?: string }) {
  const styles = mainLayoutStyles()

  return (
    <>
      <SEO />
      <RootLayout>
        <Hidden xsDown>
          <Grid item md={2} sm={3} xs={12} className={`${styles.col} ${styles.leftGrid}`}>
            <Menu />
          </Grid>
        </Hidden>

        <Grid item md={10} sm={9} xs={12} className={`${styles.col} ${styles.mainGrid}`}>
          <Header title={title} />
          <Content className={styles.col}>{children}</Content>
        </Grid>

        {/* <Hidden smDown>
        <Grid item md={2} sm={2} xs={12} className={`${styles.col} ${styles.rightGrid}`}>
          <Sidebar />
        </Grid>
      </Hidden> */}
      </RootLayout>
    </>
  )
}
