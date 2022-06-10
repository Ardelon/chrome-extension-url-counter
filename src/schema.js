const dataStructure = {
	activeTabCount : Number,
	activeWindowCount : Number,
	blacklist : Array,
	hostList : [
		{
			favIcon : String,
			hostName : String,
			siteName : String,
			tabId : Number,
			timeStamp : Number,
			url : String
		}
	],
	sessionCount : 6,
	storedDays : [
		{
			hostList : [
				{
					favIcon : String,
					hostName : String,
					siteName : String,
					tabId : Number,
					timeStamp : Number,
					url : String
				}
			],
			sessionCount : Number,
			tabCount : Number
		}
	],
	storedTabStateList : [
		{
			favIcon : String,
			hostName : String,
			siteName : String,
			tabId : Number,
			timeStamp : Number,
			url : String
		}
	],
	tabCount : Number
};


export {dataStructure};