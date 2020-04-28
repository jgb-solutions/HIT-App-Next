import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from '@material-ui/icons/Info'

import Logo from "./Logo"
import Routes from "../../routes"
import Link from "./Link"
import { menuStyles } from "../styles/menuStyles"

const mainMenu = [
	{ name: "HIT", to: Routes.pages.home, icon: <HomeIcon /> },
	{ name: "À Propos", to: Routes.pages.about, icon: <InfoIcon />, }
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