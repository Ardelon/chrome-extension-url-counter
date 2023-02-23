import { onlyUnique } from "./utilities";
//#region Prepare and Serve Operations

export const generateListElement = (
	parent,
	hostName,
	visitCount,
	logo,
	dataDate,
	updateTabCount
) => {
	const element = document.createElement("div");
	const blockage = document.createElement("div");
	const logoDisplay = document.createElement("img");
	const header = document.createElement("h4");
	const visitDisplay = document.createElement("p");

	element.classList.add("list-element");
	blockage.classList.add("blockage", "hide");
	logoDisplay.classList.add("logo");
	header.classList.add("header");
	visitDisplay.classList.add("visitDisplay");

	if (logo.split("extension://").length > 1) {
		logo = "../images/notFound.png";
	}
	logoDisplay.src = logo;
	header.innerText = hostName; //`${hostName.substring(0,25)}`;

	visitDisplay.innerText = visitCount;

	blockage.addEventListener("click", async (e) => {
		e.preventDefault();
		await removeDeletedElement(element, hostName, dataDate);
		await clearDomainData(dataDate, hostName);
		updateTabCount(dataDate);

		blockage.removeEventListener("click", (e) => {
			e.preventDefault();
		});
	});

	header.addEventListener("click", (e) => {
		e.preventDefault();
		goToSiteEventHandler(hostName);
	});

	logoDisplay.addEventListener("click", (e) => {
		e.preventDefault();
		goToSiteEventHandler(hostName);
	});

	element.appendChild(blockage);
	element.appendChild(logoDisplay);
	element.appendChild(header);
	element.appendChild(visitDisplay);

	parent.appendChild(element);
};

export const prepareData = (hostList) => {
	// const hostList = await chrome.storage.local.get("hostList");
	const uniqueHostNameList = [];
	const sortByNameList = [];
	const hostInformationObject = {};
	let totalVisit = 0;
	if (hostList) {
		totalVisit = hostList.length;

		hostList.forEach((host) => {
			if (!uniqueHostNameList.includes(host.siteName)) {
				uniqueHostNameList.push(host.siteName);
				sortByNameList.push(host.siteName);
				hostInformationObject[host.siteName] = {
					visitCount: 1,
					logo: host.favIcon || "../images/notFound.png",
				};
			} else {
				hostInformationObject[host.siteName].visitCount++;
				if (host.favIcon !== "../images/notFound.png") {
					hostInformationObject[host.siteName].logo = host.favIcon;
				}
			}
		});
	}
	sortByNameList.sort();
	const sortByVisitCount = generateSortForVisitCount(hostInformationObject);

	return [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList];
};

export const generateSortForVisitCount = (object) => {
	const keys = Object.keys(object);
	const sortingKeyList = [];
	const sortedList = [];

	keys.forEach((key) => {
		const visitCount = object[key].visitCount;
		const sortingKey = `${"0".repeat(6 - String(visitCount).length)}${visitCount}+${key}`;
		sortingKeyList.push(sortingKey);
	});
	sortingKeyList.sort();
	sortingKeyList.reverse();

	sortingKeyList.forEach((key) => {
		sortedList.push(key.split("+")[1]);
	});
	return sortedList;
};

export const clearElements = (element) => {
	element.innerHTML = "";
};

export const goToSiteEventHandler = (hostName) => {
	window.open(`https://${hostName}`, "_blank");
};

export const removeDeletedElement = (element) => {
	element.remove();
};

//#endregion

//#region Delete Operations

export const clearDomainData = async (date, hostName) => {
	const storedDays = await getStoredDays();

	if (storedDays.storedDays) {
		storedDays.storedDays.forEach((storedDay) => {
			if (storedDay.day === date) {
				const newHostList = [];
				storedDay.hostList.forEach((element) => {
					if (element.hostName !== hostName) {
						newHostList.push(element);
					}
				});
				storedDay.hostList = newHostList;
			}
		});
		chrome.storage.local.set({ storedDays: storedDays.storedDays });
	}
};

export const clearAllData = async (dayDate) => {
	const storedDays = await getStoredDays();
	const storedDayIndex = storedDays.storedDays.findIndex((element) => element.day === dayDate);

	storedDays.storedDays.splice(storedDayIndex, 1);
	await chrome.storage.local.set({ storedDays: storedDays.storedDays });
};
//#endregion

//#region Storage Operations

export const getBlackList = async () => {
	const blackList = await chrome.storage.local.get("blackList");

	if (!blackList || !blackList.blackList) {
		chrome.storage.local.set({ blackList: [] });
	}

	return blackList || [];
};

export const setBlackList = async (urlPiece, operation = "add") => {
	const blackList = await chrome.storage.local.get("blackList");

	if (!blackList || !blackList.blackList) {
		chrome.storage.local.set({ blackList: [urlPiece] });
	} else {
		if (!blackList.blackList.includes(urlPiece) && operation === "add") {
			blackList.blackList.push(urlPiece);
			const filteredBlackList = blackList.blackList.filter(onlyUnique);
			blackList.blackList = filteredBlackList;
			chrome.storage.local.set({ blackList: blackList.blackList });
		} else if (blackList.blackList.includes(urlPiece) && operation === "remove") {
			for (let i = 0; i < blackList.blackList.length; i++) {
				if (blackList.blackList[i] === urlPiece) {
					blackList.blackList.splice(i, 1);
				}
			}
			chrome.storage.local.set({ blackList: blackList.blackList });
		}
	}
};

export const getStoredDays = async () => {
	const storedDays = await chrome.storage.local.get("storedDays");

	if (!storedDays || !storedDays.storedDays) {
		chrome.storage.local.set({ storedDays: [] });
	}

	return storedDays || [];
};

export const addStoredDays = async (day) => {
	const storedDays = await getStoredDays();

	if (storedDays && storedDays.storedDays) {
		let storedDayIndex = -1;
		const today = await chrome.storage.local.get("day");
		storedDays.storedDays.forEach((day, index) => {
			if (day.day === today.day) {
				storedDayIndex = index;
			}
		});
		if (storedDayIndex > -1) {
			const updatedDay = {
				day: day.day,
				sessionCount: storedDays.storedDays[storedDayIndex].sessionCount
					? day.sessionCount + storedDays.storedDays[storedDayIndex].sessionCount
					: day.sessionCount,
				tabCount: storedDays.storedDays[storedDayIndex].tabCount + day.tabCount,
				hostList: storedDays.storedDays[storedDayIndex].hostList.concat(day.hostList),
			};
			storedDays.storedDays[storedDayIndex] = updatedDay;
			chrome.storage.local.set({ storedDays: storedDays.storedDays });
			// const updatedDay = {storedDays.storedDays[storedDayIndex], ...day}
		} else if (storedDays.storedDays.length < 31) {
			storedDays.storedDays.push(day);
			chrome.storage.local.set({ storedDays: storedDays.storedDays });
		} else {
			storedDays.storedDays.shift();
			storedDays.storedDays.push(day);
			chrome.storage.local.set({ storedDays: storedDays.storedDays });
		}
	} else {
		chrome.storage.local.set({ storedDays: [storedDays.storedDays] });
	}
};

//#endregion
