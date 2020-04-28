import React, { ReactNode, useEffect, useRef } from 'react'
import { Router } from 'next/router'

const Content = (props: { style?: Object, children: ReactNode, className?: string }) => {
  const mainRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      if (!mainRef.current) return

      mainRef.current.scroll({
        top: 0,
        // left: 0,
        behavior: 'smooth'
      })
    })
  }, [])

  return (
    <main
      ref={mainRef}
      className={props.className}
      style={{
        paddingTop: 70,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 50,
        ...props.style
      }}
    >
      {props.children}
    </main>
  )
}

export default Content
