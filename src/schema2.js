// eslint-disable-next-line no-unused-vars
const dataStructure = {
	allTime: {
		windowOpened: number,
		tabCreated: number,
		maxActiveTab: number,
		maxActiveWindow: nubmer,
	},
	current: {
		activeWindow: number,
		activeTab: number,
		day: string,
	},
	daily: {
		day: string,
		visitedDomains: [],
		windowOpened: number,
		tabCreated: number,
	},
	options: { sortBy: string },
	activeTabState: {
		tabId: string,
		activationTime: number,
	},
	blackList: [],
};
