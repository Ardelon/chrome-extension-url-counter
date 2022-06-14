const dataStructure = {
	totalTabCount: Number,
	activeTabCount: Number,
	tabCount: Number,
	maxActiveTabCount : Number,
	totalWindowCount: Number,
	activeWindowCount: Number,
	day:String,
	activeTabState : {
		tabId : Number,
		activationTime : Date,
	},
	sessionCount: Number, // Window Count
	blacklist: Array,
	hostList: [
		{
			favIcon: String,
			hostName: String,
			siteName: String,
			tabId: Number,
			timeStamp: Number,
			timeSpent:Number,
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
			timeSpent:Number,
			url: String,
		},
	],
};

export { dataStructure };
