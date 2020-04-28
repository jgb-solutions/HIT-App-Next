import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import colors from '../utils/colors'

export default ({ href, as, children }: { href: string, as?: string, children: any }) => {
  const router = useRouter()

  let style = children.props.style || {}

  if (router.pathname === href) {
    style = { color: colors.twitter }
  }

  return <Link href={href} as={as}>{React.cloneElement(children, { style })}</Link>
}