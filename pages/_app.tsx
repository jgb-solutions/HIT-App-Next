import React from 'react'
import { AppProps } from 'next/app'
import PropTypes from 'prop-types'
import Head from 'next/head'
// import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
// import { Router } from 'next/router'

// import theme from '../src/theme'
import { APP_NAME } from '../utils/constants'
import '../public/assets/css/react-transitions.css'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    // Router.events.on('routeChangeComplete', () => {
    //   setTimeout(() => {
    //     window.scroll({
    //       top: 0,
    //       left: 0,
    //       behavior: 'smooth'
    //     })
    //     console.log('scrolling')
    //     document.body.focus()
    //   }, 2000)
    // })

    // window.history.scrollRestoration = 'auto'
  }, [])

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* <ThemeProvider> */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}