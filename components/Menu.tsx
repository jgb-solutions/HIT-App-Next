import React from "react"
import Link from "next/link"
import HomeIcon from "@material-ui/icons/Home"
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AlbumIcon from '@material-ui/icons/Album'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import InfoIcon from '@material-ui/icons/Info'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'

import Routes from "../routes"
import Logo from "./Logo"
import { menuStyles } from "../styles/menuStyles"

const mainMenu = [
	{ name: "Home", to: Routes.pages.home, icon: <HomeIcon /> },
	{ name: "About", to: Routes.pages.about, icon: <InfoIcon />, }
]

const browsingMenu = [
	{ name: "Tracks", to: Routes.browse.tracks, icon: <MusicNoteIcon /> },
	{ name: "PlayLists", to: Routes.browse.playlists, icon: <PlaylistAddIcon /> },
	{ name: "Artists", to: Routes.browse.artists, icon: <PersonPinCircleIcon /> },
	{ name: "Albums", to: Routes.browse.albums, icon: <AlbumIcon /> },
	// { name: "Podcasts", to: Routes.browse.podcasts, icon: <MicIcon /> },
]

const favoriteMenu = [
	// { name: "Tracks", to: Routes.user.library.tracks, icon: <MusicNoteIcon /> },
	// { name: "Artists", to: Routes.user.library.artists, icon: <PersonPinCircleIcon /> },
	// { name: "Albums", to: Routes.user.library.albums, icon: <AlbumIcon /> },
	// { name: "PlayLists", to: Routes.user.library.playlists, icon: <PlaylistAddIcon /> },
	// { name: "Podcasts", to: Routes.user.library.podcasts, icon: <MicIcon /> },
	{ name: "Queue", to: Routes.user.library.queue, icon: <QueueMusicIcon /> },
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