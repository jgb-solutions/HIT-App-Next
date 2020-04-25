import React from "react"
import Link from "next/link"
import { makeStyles } from "@material-ui/styles"

import Routes from "../routes"

const useStyles = makeStyles({
  logo: {
    maxWidth: "100%",
    width: "200px",
  },
  logoLink: {
    marginBottom: 20,
    display: 'inline-block',
  },
})


export default function Logo({ style, size }: { style?: string, size?: number }) {
  const styles = useStyles()

  let sizes = undefined

  if (size) {
    sizes = {
      width: size,
      height: 'auto'
    }
  }

  return (
    <>
      <Link href={Routes.pages.home}>
        <a className={styles.logoLink}>
          <img
            style={sizes}
            className={`${styles.logo} ${style}`}
            src="/assets/images/haiti-Info-Toutan-transparent.png"
            alt="MP3 Pam logo"
          />
        </a>
      </Link>
    </>
  )
}