import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from '@material-ui/icons/Info'

import Routes from "../routes"
import Logo from "./Logo"
import { menuStyles } from "../styles/menuStyles"
import Link from "../src/Link"

const mainMenu = [
	{ name: "Home", to: Routes.pages.home, icon: <HomeIcon /> },
	{ name: "About", to: Routes.pages.about, icon: <InfoIcon />, }
]

type Props = {
	closeDrawerLeft?: (bool: boolean) => void,
}

export default function Menu(props: Props) {
	const styles = menuStyles()
	const closeDrawer = () => {
		if (props.closeDrawerLeft) {
			props.closeDrawerLeft(false)
		}
	}

	return (
		<>
			<Logo />
			<div className={styles.mainMenu}>
				{mainMenu.map((menuItem, index) => (
					<Link
						// activeClassName={styles.activeClassName}
						// exact
						key={index}
						href={menuItem.to}>
						<a className={`${styles.link} ${styles.mainMenuLink}`} onClick={closeDrawer}>
							<span className={styles.linkIcon}>{menuItem.icon}</span>
							<span className={styles.linkText}>{menuItem.name}</span>
						</a>
					</Link>
				))}
			</div>
		</>
	)
}