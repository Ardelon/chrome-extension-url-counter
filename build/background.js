//#region Chrome Event Listeners

chrome.windows.onCreated.addListener((window) => {
	// console.log('Browser Created');

	sessionCount(window);
	let timeoutCycle;
	updateDateCounters(timeoutCycle);
	updateActiveWindowCount();
});

chrome.windows.onRemoved.addListener(() => {
	updateActiveWindowCount();
});

// New Tab is Created
chrome.tabs.onCreated.addListener(() => {
	// console.log('New Tab Created');
	addOneToTabCount();
});

// Tab is Updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// console.log('Tab is Updated');
	if (tab.status === "complete") {
		storeTabState(tabId, tab);
	}
	updateTabCount();
});

chrome.tabs.onRemoved.addListener(() => {
	updateTabCount();
});

chrome.tabs.onActivated.addListener(async (data) => {
	const { tabId } = data;
	const oldTabState = await getActiveTabState();
	const storedTabStateList = await getStoredTabStateList();
	storedTabStateList.storedTabStateList.forEach((item, index) => {
		if (item.tabId === oldTabState.tabId) {
			item.timeSpent += Date.now() - oldTabState.activationTime;
		}
	});
	chrome.storage.local.set({
		storedTabStateList: storedTabStateList.storedTabStateList,
	});
	setActiveTabState(tabId);
});

//#endregion

//#region Storage Methods

const getHostList = async () => {
	return await chrome.storage.local.get("hostList");
};

const addToHostList = async (model) => {
	const hostList = await getHostList();
	if (!hostList.hostList) {
		hostList["hostList"] = [];
	}
	hostList.hostList.push(model);
	chrome.storage.local.set({ hostList: hostList.hostList });
	const details = {
		text: hostList.hostList.length.toString(),
	};
	chrome.action.setBadgeText(details);
};

const clearStorage = () => {
	chrome.storage.local.set({ hostList: null });
	chrome.storage.local.set({ day: null });
	chrome.storage.local.set({ sessionCount: null });
	chrome.storage.local.set({ tabCount: null });
	chrome.storage.local.set({ storedTabStateList: null });
};

const storeStorage = async () => {
	const hostList = await chrome.storage.local.get("hostList");
	const day = await chrome.storage.local.get("day");
	const sessionCount = (await chrome.storage.local.get("sessionCount")) || 0;
	const tabCount = await chrome.storage.local.get("tabCount");

	// const storedTabStateList = await chrome.storage.local.get("storedTabStateList")

	const model = {
		day: day.day,
		sessionCount: sessionCount.sessionCount,
		tabCount: tabCount.tabCount,
		hostList: hostList.hostList,
	};

	setTotalWindowCount(sessionCount.sessionCount);
	setTotalTabCount(tabCount.tabCount);
	addStoredDays(model);
};

const setDay = async (generatedDay) => {
	// console.log('Set Day');
	await storeStorage();
	await clearStorage();
	chrome.storage.local.set({ day: generatedDay });
};

const getDay = async () => {
	// console.log('Get Day');
	return await chrome.storage.local.get("day");
};

const updateDateCounters = async (timeoutCycle) => {
	timeoutCycle ? clearTimeout(timeoutCycle) : null;
	const [generatedDay, remainingMiliSeconds] = generateDay();
	const { day: savedDay } = await getDay();
	console.log("Sol Invictus");
	if (generatedDay !== savedDay) {
		setDay(generatedDay);
	}
	timeoutCycle = setTimeout(() => {
		updateDateCounters(timeoutCycle);
	}, remainingMiliSeconds);

	const hostList = await getHostList();
	if (hostList.hostList) {
		chrome.storage.local.set({ hostList: hostList.hostList });
		const details = {
			text: hostList.hostList.length.toString(),
		};
		chrome.action.setBadgeText(details);
	}
};

const sessionCount = async () => {
	// console.log("Session Count");
	const sessionCount = (await chrome.storage.local.get("sessionCount")) || {};

	if (!sessionCount || typeof sessionCount.sessionCount !== "number") {
		chrome.storage.local.set({ sessionCount: 1 });
	} else {
		sessionCount.sessionCount++;
		chrome.storage.local.set({ sessionCount: sessionCount.sessionCount });
	}
};

const addOneToTabCount = async () => {
	// console.log('Add One To Tab Count');
	const tabCount = (await chrome.storage.local.get("tabCount")) || {};

	if (!tabCount || typeof tabCount.tabCount !== "number") {
		chrome.storage.local.set({ tabCount: 1 });
	} else {
		tabCount.tabCount++;
		chrome.storage.local.set({ tabCount: tabCount.tabCount });
	}
};

const storeTabState = async (tabId, tab, timeSpent) => {
	// console.log('Store Tab State');
	const urlSet = scrapeInformationFromUrl(tab.url);
	let [fullUrl, protocol, hostName, pathname, search] = urlSet;
	const blackList = await getBlackList();

	if (hostName.includes("www.")) {
		hostName = hostName.split("www.")[1];
	}

	const tabState = {
		tabId,
		siteName: hostName,
		hostName,
		url: fullUrl,
		timeStamp: Date.now(),
		timeSpent: 0,
		favIcon: tab.favIconUrl || "../images/notFound.png",
	};

	if (
		!tabState.url.includes("chrome://") &&
		!tabState.url.includes("chrome-extension://") &&
		!blackList.blackList.includes(tabState.hostName)
	) {
		const storedTabStateList = await getStoredTabStateList();

		if (!storedTabStateList.storedTabStateList) {
			storedTabStateList["storedTabStateList"] = [];
		}

		const [willBeUpdated, storedHost] = await setStoredTabState(
			storedTabStateList.storedTabStateList,
			tabState
		);
		// console.log(willBeUpdated);
		if (willBeUpdated) {
			updateSavedHost(storedHost);
			updateDomain(tabState);
		}
	}
};

const getStoredTabStateList = async () => {
	// console.log('Get Stored Tab State List');
	return await chrome.storage.local.get("storedTabStateList");
};

const getBlackList = async () => {
	const blackList = await chrome.storage.local.get("blackList");

	if (!blackList || !blackList.blackList) {
		chrome.storage.local.set({ blackList: [] });
	}

	return blackList || [];
};

// const setBlackList = async (urlPiece, operation = "add") => {
// 	const blackList = await chrome.storage.local.get("blackList");

// 	if (!blackList || !blackList.blackList) {
// 		chrome.storage.local.set({ blackList: [urlPiece] });
// 	} else {
// 		if (!blackList.blackList.includes(urlPiece) && operation === "add") {
// 			blackList.blackList.push(urlPiece);
// 			chrome.storage.local.set({ blackList: blackList.blackList });
// 		} else if (
// 			blackList.blackList.includes(urlPiece) &&
// 			operation === "remove"
// 		) {
// 			for (let i = 0; i < blackList.blackList.length; i++) {
// 				if (blackList.blackList[i] === urlPiece) {
// 					blackList.blackList.splice(i, 1);
// 				}
// 			}
// 			chrome.storage.local.set({ blackList: blackList.blackList });
// 		}
// 	}
// };

const getStoredDays = async () => {
	const storedDays = await chrome.storage.local.get("storedDays");

	if (!storedDays || !storedDays.storedDays) {
		chrome.storage.local.set({ storedDays: [] });
	}

	return storedDays || [];
};

const addStoredDays = async (day) => {
	const storedDays = await getStoredDays();
	if (storedDays && storedDays.storedDays) {
		let isIncluded = false;
		let storedDayIndex = -1;
		storedDays.storedDays.forEach((storedDay, index) => {
			if (storedDay.day === day.day) {
				isIncluded = true;
				storedDayIndex = index;
			}
		});

		if (isIncluded) {
			storedDay = storedDays.storedDays[storedDayIndex];
			storedDay.hostList = storedDay.hostList.concat(day.hostList);
			storedDay.tabCount += day.tabCount;
			storedDay.sessionCount += day.sessionCount;
			storedDays.storedDays[storedDayIndex] = storedDay;
			chrome.storage.local.set({ storedDays: storedDays.storedDays });
		} else {
			if (storedDays.storedDays.length < 30) {
				storedDays.storedDays.push(day);
				chrome.storage.local.set({ storedDays: storedDays.storedDays });
			} else {
				storedDays.storedDays.shift();
				storedDays.storedDays.push(day);
				chrome.storage.local.set({ storedDays: storedDays.storedDays });
			}
		}
	} else {
		chrome.storage.local.set({ storedDays: [day] });
	}
};

const setActiveTabCount = (activeTabCount) => {
	chrome.storage.local.set({ activeTabCount: activeTabCount });
};

const setActiveWindowCount = (activeWindowCount) => {
	chrome.storage.local.set({ activeWindowCount: activeWindowCount });
};

const setTotalWindowCount = async (sessionCount) => {
	const totalWindowCount = await chrome.storage.local.get("totalWindowCount");
	if (totalWindowCount.totalWindowCount === "number") {
		totalWindowCount.totalWindowCount += sessionCount;
	} else {
		totalWindowCount.totalWindowCount = sessionCount;
	}
	chrome.storage.local.set({
		totalWindowCount: totalWindowCount.totalWindowCount,
	});
};

const setTotalTabCount = async (tabCount) => {
	const totalTabCount = await chrome.storage.local.get("totalTabCount");
	if (totalTabCount.totalTabCount === "number") {
		totalTabCount.totalTabCount += tabCount;
	} else {
		totalTabCount.totalTabCount = tabCount;
	}
	chrome.storage.local.set({ totalTabCount: totalTabCount.totalTabCount });
};

const setActiveTabState = (tabId = undefined) => {
	const model = {
		tabId,
		activationTime: Date.now(),
	};
	chrome.storage.local.set({ activeTabState: model });
};

const getActiveTabState = async () => {
	const activeTabState = await chrome.storage.local.get("activeTabState");
	return activeTabState.activeTabState;
};

//#endregion

//#region Utilities

const generateDay = () => {
	const date = Date.now();
	const today = new Date(date);

	const todayInString = `${today.getFullYear()}/${
		today.getMonth() + 1
	}/${today.getDate()}`;

	const secondSpentToday =
		today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
	const remainingMiliSeconds = (86400 - secondSpentToday) * 1000;

	return [todayInString, remainingMiliSeconds];
};

const scrapeInformationFromUrl = (fullUrl) => {
	const url = new URL(fullUrl);
	return [fullUrl, url.protocol, url.hostname, url.pathname, url.search];
};

const setStoredTabState = (storedTabStateList, tabState) => {
	// console.log('Set Stored Tab State');

	let willBeUpdated = false;
	let isTabExist = false;
	let isSameHost = false;
	let isSameUrl = false;
	let changeIndex = -1;
	let storedHost = null;

	if (storedTabStateList.length === 0) {
		willBeUpdated = true;
		storedTabStateList.push(tabState);
		storedHost = tabState;
	} else {
		storedTabStateList.forEach((storedTabState, index) => {
			if (storedTabState.tabId === tabState.tabId) {
				changeIndex = index;

				isTabExist = true;
				if (storedTabState.hostName === tabState.hostName) {
					isSameHost = true;
					if (storedTabState.url === tabState.url) {
						isSameUrl = true;
					}
				}
			}
		});

		if (!isTabExist) {
			storedTabStateList.push(tabState);
			storedHost = tabState;
			willBeUpdated = true;
		} else {
			if (!isSameHost || !isSameUrl) {
				storedHost = storedTabStateList[changeIndex];
				storedTabStateList[changeIndex] = tabState;
				willBeUpdated = true;
			} else {
				storedHost = storedTabStateList[changeIndex];
			}
		}
	}

	chrome.storage.local.set({ storedTabStateList: storedTabStateList });
	console.log(storedHost);
	return [willBeUpdated, storedHost];
};

const updateDomain = (tabState) => {
	// console.log('Update Domain');

	addToHostList(tabState);
};

const updateTabCount = () => {
	chrome.tabs.query({}, (e) => {
		setActiveTabCount(e.length);
		isTabCountMaxed(e.length);
	});
};

const updateActiveWindowCount = () => {
	chrome.windows.getAll({}, (e) => {
		setActiveWindowCount(e.length);
	});
};

const isTabCountMaxed = async (activeTabCount) => {
	const maxActiveTabCount = await chrome.storage.local.get("maxActiveTabCount");
	if (typeof maxActiveTabCount.maxActiveTabCount === "number") {
		maxActiveTabCount.maxActiveTabCount >= activeTabCount
			? null
			: (maxActiveTabCount.maxActiveTabCount = activeTabCount);
	} else {
		maxActiveTabCount.maxActiveTabCount = activeTabCount;
	}
	chrome.storage.local.set({
		maxActiveTabCount: maxActiveTabCount.maxActiveTabCount,
	});
};

const updateSavedHost = async (storedHost) => {
	const hostList = await getHostList();

	hostList.hostList.forEach((item) => {
		if (
			item.timeStamp === storedHost.timeStamp &&
			item.tabId === storedHost.tabId &&
			item.url === storedHost.url
		) {
			console.log("%c Oh my heavens! ", "background: #222; color: #bada55");
			console.log(item);
			console.log(storedHost);
			item.timeSpent = storedHost.timeSpent;
			console.log(item);
	
			
		}
	});


	chrome.storage.local.set({ "hostList": hostList.hostList });

};

//#endregion
