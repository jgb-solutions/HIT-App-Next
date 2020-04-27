import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import colors from '../utils/colors'

export default ({ href, children }: { href: string, children: any }) => {
  const router = useRouter()

  let style = children.props.style || {}

  if (router.pathname === href) {
    style = { color: colors.twitter }
  }

  return <Link href={href}>{React.cloneElement(children, { style })}</Link>
}