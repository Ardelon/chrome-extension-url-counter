import "../style/popup.scss";

import {openInNewTab, scrapeInformationFromUrl} from "./utilities";
import {getSortingOptions} from "./manageOptions";
import {
	generateListElement, 
	prepareData, 
	clearElements, 
	getBlackList,
	setBlackList,	
} from "./manageInfo";


// let tabCountButton = document.getElementById("tab-count-button");
const tabCountDiv = document.getElementById("tab-count");
const listContainer = document.getElementById("list-container");
const totalVisitDisplay = document.getElementById("total-visit");

const optionsPageButton = document.getElementById("options-page-button");
const githubPageButton = document.getElementById("github-page-button");

const dontSaveButton = document.getElementById("dont-save-button");


const getTabCount = async () => {
	return await chrome.storage.local.get("tabCount");
};

const eventHandler = async () => {
	const hostList = await chrome.storage.local.get("hostList");
	const tabCount = await getTabCount();
	const hostList1 = hostList.hostList;
	const data = await prepareData(hostList1);
	clearElements(listContainer);
	const [, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data;
	tabCountDiv.innerHTML = `<p>Tab Count : ${tabCount.tabCount || 0}</p>`;

	const sortingOption = await getSortingOptions();

	if (sortingOption === "sortByName") {
    
		sortByNameList.forEach(hostName => {
			const visitCount = hostInformationObject[hostName].visitCount;
			const logo =  hostInformationObject[hostName].logo;
			generateListElement(listContainer, hostName, visitCount, logo);

		});

	} else {
    
		sortByVisitCount.forEach(hostName => {
			const visitCount = hostInformationObject[hostName].visitCount;
			const logo =  hostInformationObject[hostName].logo;
			generateListElement(listContainer, hostName, visitCount, logo);
    
		});
    
	} 
	totalVisitDisplay.innerHTML = `<p>Total Visit : ${totalVisit}</p>` ;


};

const openOptionsPageEvent = () => {

    
	if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
	} else {
		window.open(chrome.runtime.getURL("options.html"));
	}
};

const prepareDontSaveButton = async () => {
	const currentTab = await chrome.tabs.query({"active" : true, "currentWindow" : true});
	const url  = currentTab[0].url;
	const [, , hostName ] = scrapeInformationFromUrl(url);
	const blackList = await getBlackList();
    

	if (blackList.blackList && blackList.blackList.includes(hostName)) {
		dontSaveButton.classList.add("this-site-will-not-be-saved");
	}
    

	dontSaveButton.addEventListener("click",  (e) => {
		e.preventDefault();
        
		if (dontSaveButton.classList.contains("this-site-will-not-be-saved")) {
			setBlackList(hostName, "remove");
		} else {
			setBlackList(hostName);
		}
        
		dontSaveButton.classList.toggle("this-site-will-not-be-saved");
    
		dontSaveButton.removeEventListener("click",  (e) => {
			e.preventDefault();
		});
        
	});
};


eventHandler();
prepareDontSaveButton();


optionsPageButton.addEventListener("click", (e) => {
	e.preventDefault();
	openOptionsPageEvent();
	optionsPageButton.removeEventListener("click", (e) => {
		e.preventDefault();
		openOptionsPageEvent();
	});
});

githubPageButton.addEventListener("click", (e => {
	e.preventDefault();
	openInNewTab("https://github.com/Ardelon/chrome-extension-url-counter");
}));


