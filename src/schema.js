const dataStructure = {
	totalTabCount: Number,
	activeTabCount: Number,
	tabCount: Number,
	maxActiveTabCount : Number,
	totalWindowCount: Number,
	activeWindowCount: Number,
	sessionCount: Number, // Window Count
	blacklist: Array,
	hostList: [
		{
			favIcon: String,
			hostName: String,
			siteName: String,
			tabId: Number,
			timeStamp: Number,
			url: String,
		},
	],
	storedDays: [
		{
			hostList: [
				{
					favIcon: String,
					hostName: String,
					siteName: String,
					tabId: Number,
					timeStamp: Number,
					url: String,
				},
			],
			sessionCount: Number,
			tabCount: Number,
		},
	],
	storedTabStateList: [
		{
			favIcon: String,
			hostName: String,
			siteName: String,
			tabId: Number,
			timeStamp: Number,
			url: String,
		},
	],
};

export { dataStructure };
