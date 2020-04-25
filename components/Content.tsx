import React, { ReactNode, useEffect } from 'react'
// import { useLocation } from 'gatsby'


const Content = (props: { style?: Object, children: ReactNode, className?: string }) => {
  // const { pathname } = useLocation()
  let mainRef: HTMLElement | null

  // useEffect(() => {
  //   if (mainRef) {
  //     mainRef.scrollTo(0, 0)
  //   }
  //   // eslint-disable-next-line
  // }, [pathname])

  return (
    <main
      ref={ref => { mainRef = ref }}
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
