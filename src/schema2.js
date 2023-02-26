// eslint-disable-next-line no-unused-vars
const dataStructure = {
	allTimeCounter: {
		newWindowOpened: number,
		newTabCreated: number,
		maxActiveTab: number,
		maxActiveWindow: number,
	},
	currentCounter: {
		activeWindow: number,
		activeTab: number,
		day: string,
	},
	dayState: {
		day: string,
		visitedDomains: [
			{
				favIcon: string,
				hostName: string,
				siteName: string,
				tabId: number,
				timeSignature: [["whenActivated", "timeSpent"]],
				url: string,
			},
		],
		newWindowOpened: number,
		newTabCreated: number,
	},
	options: { sortBy: string },
	blackList: [],
	categories: {
		"google.com": "fun",
		"gmail.com": "work",
	},
	daysArchive: ["dayState", "dayState"],
	tabState: [
		{
			tabId: number,
			url: string,
			whenCreated: [number],
			whenActivated: number,
			timeSpent: number,
			timeSignature: [["whenActivated", "timeSpent"]],
			whenDestroyed: [number],
			reopenedCount: number,
		},
	],
};
