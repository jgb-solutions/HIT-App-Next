const Routes = {
	pages: {
		home: `/`,
		browse: `/browse`,
		search: `/search`,
		about: `/about`,
	},
	news: {
		show: `/news/:hash`,
		detailPage: (hash: string) => `/news/${hash}`,
	},
}

export default Routes
