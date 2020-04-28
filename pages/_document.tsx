import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

import colors from '../utils/colors'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta name="theme-color" content={colors.twitter} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="manifest" href="/manifest.json" />

          <link
            rel="shortcut icon"
            type="image/png"
            href="/assets/icon/favicon.png"
          />

          {/* add to homescreen for ios  */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Haiti Info Toutan" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              var OneSignal = window.OneSignal || []
              OneSignal.push(function() {
                OneSignal.init({ appId: "05936fea-4aec-417a-84d5-f5cb6a7b89a1" })
              })
            `
          }} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          {/* Adsense */}
          <script data-ad-client="ca-pub-3793163111580068" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />

          <script dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", function () {
                  navigator.serviceWorker
                    .register("/worker.js")
                    .then(
                      function (registration) {
                        console.log(
                          "Worker registration successful",
                          registration.scope
                        )
                      },
                      function (err) {
                        console.log("Worker registration failed", err)
                      }
                    )
                    .catch(function (err) {
                      console.log(err)
                    })
                })
              } else {
                console.log("Service Worker is not supported by browser.")
              }
            `
          }} />

          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-161910284-1"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-161910284-1');
            `
          }} />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}