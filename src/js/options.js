import "../style/index.scss";

import {renderSlider, scrollBeltToEnd} from "./generateSlider";
import {getSortingOptions, setSortingOptions} from "./manageOptions";
import {
    
	getBlackList,
	setBlackList,
} from "./manageInfo";
import { exportFormat } from "./utilities";

//#region Elements


const sortByName = document.getElementById("sort-by-name");
const sortByVisitCount = document.getElementById("sort-by-visit-count");
const sortBySwitch = document.getElementById("sort-by-switch-input");
// const sortBySwitchSpan = document.getElementById("sort-by-switch-span");

// const blackListContainer = document.getElementById("black-list-container");
const blackListList = document.getElementById("black-list-list");
const hostNameInput = document.getElementById("host-name-input");
const addBlackListButton = document.getElementById("add-black-list-button");

const inputPlaceholder = "Write a link";

// const csvExportButton = document.getElementById("csv-export-button");
const jsonExportButton = document.getElementById("json-export-button");
// const excelExportButton = document.getElementById("excel-export-button");


//#endregion

//#region Option Handlers 
const displayOptions = async () => {

	await sortingOptionDisplay();
	optionsHandlerImplementation();
	hostNameInput.innerText = inputPlaceholder;
	exportOptionLoader();
         
};

const sortingOptionDisplay = async () => {
        
	const sortingOption = await getSortingOptions();

	if (sortingOption === "sortByName") {
		sortByName.classList.add("flamio");
		sortByVisitCount.classList.remove("flamio");
	} else {
		sortByName.classList.remove("flamio");
		sortByVisitCount.classList.add("flamio");
		sortBySwitch.checked = true;
	}
};

const optionsHandlerImplementation =  () => {

	sortBySwitch.addEventListener("change", async (e) => {
        
		e.preventDefault();
		if (!sortBySwitch.checked) {
			setSortingOptions("sortByName");
			sortByName.classList.add("flamio");
			sortByVisitCount.classList.remove("flamio");
		} else {
			setSortingOptions("sortByVisitCount");
			sortByName.classList.remove("flamio");
			sortByVisitCount.classList.add("flamio");
		} 
    
		//TODO Update Data Here
		await renderSlider();

    
		sortBySwitch.removeEventListener("click", (e) => {
			e.preventDefault();
		});
	});

	hostNameInput.addEventListener("focusin", (e) => {
		e.preventDefault();
		if (hostNameInput.innerText === inputPlaceholder) {
			hostNameInput.innerText = "";
		} 
		hostNameInput.removeEventListener("focusin", (e) => {
			e.preventDefault();
		});
	});
        
	hostNameInput.addEventListener("focusout", (e) => {
		e.preventDefault();
		if (hostNameInput.innerText === "") {
			hostNameInput.innerText = inputPlaceholder;
		}
		hostNameInput.removeEventListener("focusout", (e) => {
			e.preventDefault();
		});
	});

	addBlackListButton.addEventListener("click", async (e) => {
		e.preventDefault();
		const hostName = hostNameInput.innerText;
		if (hostName.length && hostName !== inputPlaceholder) {
			await setBlackList(hostName);
			displayBlackListElements();
		}
          
	});
};

const exportOptionLoader =  () => {
	// csvExportButton.addEventListener('click', async (e) => {
	//     e.preventDefault();
	//     exportFormat('csv')
	//     csvExportButton.removeEventListener('click', async (e) => {
	//         e.preventDefault
	//         exportFormat('csv')
	//     })
	// })

	jsonExportButton.addEventListener("click",  (e) => {
		e.preventDefault();
		exportFormat("json" );
		jsonExportButton.removeEventListener("click",  (e) => {
			e.preventDefault;
			exportFormat("json");
		});
	});

	// excelExportButton.addEventListener('click', async (e) => {
	//     e.preventDefault();
	//     exportFormat('excel')
	//     excelExportButton.removeEventListener('click', async (e) => {
	//         e.preventDefault
	//         exportFormat('excel')
	//     })
	// })
};

const generateBlackListElement =  (hostName) => {

	const blackListElement = document.createElement("div");
	blackListElement.classList.add("black-list-element");

	const blackListElementHostName = document.createElement("h2") ;
	blackListElementHostName.innerText = hostName;
	blackListElementHostName.classList.add("black-list-element-host-name");

	const removeFromBlackListButton = document.createElement("div");
	removeFromBlackListButton.innerHTML = "<h3>Remove</h3>";
	removeFromBlackListButton.classList.add("remove-from-black-list-button");
	removeFromBlackListButton.addEventListener("click", (e) => {
		e.preventDefault();
		setBlackList(hostName, "remove");
		blackListElement.remove();

		removeFromBlackListButton.removeEventListener("click", (e) => {
			e.preventDefault();
			setBlackList(hostName, "remove");
			blackListElement.remove();
		});
	});

	blackListElement.appendChild(blackListElementHostName);
	blackListElement.appendChild(removeFromBlackListButton);
	return blackListElement;
};

const displayBlackListElements = async () => {
	console.log("displayBlackListElements");
	const blackList = await getBlackList();
	blackListList.innerHTML = null;
	if (blackList && blackList.blackList && blackList.blackList.length) {
		console.log(blackList.blackList.length);
		blackList.blackList.forEach(async (hostName) => {
			const generatedElement = await generateBlackListElement(hostName);
			blackListList.appendChild(generatedElement);
		});
	}
};

    


//#endregion

// renderDataHandler();

const loaderForAsync = async () => {

	await renderSlider();
	await displayOptions();
	await displayBlackListElements();
	scrollBeltToEnd();

  
};

loaderForAsync();