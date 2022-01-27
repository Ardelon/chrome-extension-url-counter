import '../style/options.scss';

import {renderSlider} from './generateSlider';
import {getSortingOptions, setSortingOptions} from './manageOptions';
import {
    generateListElement, 
    prepareData, 
    clearElements, 
    clearPreviousDayData,
    clearTodayData,
    getBlackList,
    setBlackList,
    getStoredDays,
} from './manageInfo';

//#region Elements

const previousDayListContainer = document.getElementById("previous-day-list");
const todayListContainer = document.getElementById("today-list");

const previousDayTabCount = document.getElementById("previous-day-tab-count");
const previousDayVisitCount = document.getElementById("previous-day-total-visit");

const todayTabCount = document.getElementById("today-tab-count");
const todayVisitCount = document.getElementById("today-total-visit");


const previousDayDeleteAllButton = document.getElementById("previous-day-delete-all");
const previousDayDeleteDomainButton = document.getElementById("previous-day-delete-domain");

const todayDeleteAllButton = document.getElementById("today-delete-all");
const todayDeleteDomainButton = document.getElementById("today-delete-domain");

const sortByHeader = document.getElementById("sort-by-header");
const sortBySwitch = document.getElementById("sort-by-switch-input");
const sortBySwitchSpan = document.getElementById("sort-by-switch-span");

const blackListContainer = document.getElementById("black-list-container");
const blackListList = document.getElementById("black-list-list");
const hostNameInput = document.getElementById("host-name-input");
const addBlackListButton = document.getElementById("add-black-list-button");

const inputPlaceholder = "Write a link"

const getTabCount = async () => {
    return await chrome.storage.local.get("tabCount");
}

//#endregion

//#region render Data

// const renderDataHandler = async () => {
//     servePreviousDay();
//     serveToday();

// };

const servePreviousDay = async () => {
    const previousDayData = await chrome.storage.local.get("previousDay");
    clearElements(previousDayListContainer);

    if (previousDayData.previousDay) {

        const hostList = previousDayData.previousDay.hostList;
        const tabCount = previousDayData.previousDay.tabCount;
        const data = await prepareData(hostList);
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        
        previousDayTabCount.innerHTML = `<p>Tab Count : ${tabCount || 0}</p>`;
        const sortingOption = await getSortingOptions();

        if (sortingOption === 'sortByName') {
            
            sortByNameList.forEach(hostName => {
                const visitCount = hostInformationObject[hostName].visitCount;
                const logo =  hostInformationObject[hostName].logo
                generateListElement(previousDayListContainer, hostName, visitCount, logo, 'previousDay', updatePreviousDayVisitCount)
                
            });
        } else {

            sortByVisitCount.forEach(hostName => {
                const visitCount = hostInformationObject[hostName].visitCount;
                const logo =  hostInformationObject[hostName].logo
                generateListElement(previousDayListContainer, hostName, visitCount, logo, 'previousDay', updatePreviousDayVisitCount)
                
            });
        }

        
        previousDayVisitCount.innerHTML = `<p>Total Visit : ${totalVisit || 0}</p>` 
     
    } else {
        const noDataWarning = document.createElement("h2")
        noDataWarning.innerText = "No data found";
        noDataWarning.style.textAlign = "center"
        previousDayListContainer.appendChild(noDataWarning)
        previousDayVisitCount.innerHTML = `<p>Total Visit : 0</p>` ;
        previousDayTabCount.innerHTML = `<p>Tab Count : 0</p>`;
    }
}

const serveToday = async () => {
    const hostList = await chrome.storage.local.get("hostList");
    const tabCount = await getTabCount();

    clearElements(todayListContainer);
    todayTabCount.innerHTML = `<p>Tab Count : ${tabCount.tabCount || 0}</p>`;
    
    if (hostList.hostList) {

        const data = await prepareData(hostList.hostList);
        
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        
        const sortingOption = await getSortingOptions();

        if (sortingOption === 'sortByName') {
            
            sortByNameList.forEach(async hostName => {
                const visitCount = hostInformationObject[hostName].visitCount;
                const logo =  hostInformationObject[hostName].logo
                generateListElement(todayListContainer, hostName, visitCount, logo, 'today', updateTodayVisitCount);
                
            });
        } else {

            sortByVisitCount.forEach(async hostName => {
                const visitCount = hostInformationObject[hostName].visitCount;
                const logo =  hostInformationObject[hostName].logo
                generateListElement(todayListContainer, hostName, visitCount, logo, 'today', updateTodayVisitCount);
                
            });
        }

        todayVisitCount.innerHTML = `<p>Total Visit : ${totalVisit || 0}</p>` 

    } else {
        const noDataWarning = document.createElement("h2")
        noDataWarning.innerText = "No data found";
        noDataWarning.style.textAlign = "center"
        todayListContainer.appendChild(noDataWarning)
        todayVisitCount.innerHTML = `<p>Total Visit : 0</p>` 

    }
}


//#endregion

//#region Button Event Listeners

// previousDayDeleteAllButton.addEventListener('click', async (e) => {
//     e.preventDefault();
//     await clearPreviousDayData();
//     servePreviousDay();
//     updatePreviousDayVisitCount();
     
//     previousDayDeleteAllButton.removeEventListener('click', async (e) => {
//         e.preventDefault();
//     })
// })

// previousDayDeleteDomainButton.addEventListener('click', async (e) => {
//     e.preventDefault();
//     toggleBlockageElement(previousDayListContainer)

//     previousDayDeleteDomainButton.removeEventListener('click', async (e) => {
//         e.preventDefault();
//     })
// })

// todayDeleteAllButton.addEventListener('click', async (e) => {
//     e.preventDefault();
//     await clearTodayData();
//     serveToday();


//     todayDeleteAllButton.removeEventListener('click', async (e) => {
//         e.preventDefault();
//     })
// })

// todayDeleteDomainButton.addEventListener('click', async (e) => {
//     e.preventDefault();
//     toggleBlockageElement(todayListContainer)

//     todayDeleteDomainButton.removeEventListener('click', async (e) => {
//         e.preventDefault();
//     })
// })

//#endregion

//#region Utilities

const toggleBlockageElement = (parent) => {

    const childrenHTMLCollection = parent.children;
    const childrenArray = [...childrenHTMLCollection];

    childrenArray.forEach(child => {
        const childrenHTMLCollection = child.children;
        const childrenArray = [...childrenHTMLCollection];
    
        const blockage = childrenArray[0]
        blockage.classList.toggle("hide");
       
    });
}

const updateTodayVisitCount = async () => {
    const hostList = await chrome.storage.local.get("hostList");

    if (hostList.hostList) {

        const data = await prepareData(hostList.hostList);
        
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        todayVisitCount.innerHTML = `<p>Total Visit : ${totalVisit || 0}</p>` 
    }
}

const updatePreviousDayVisitCount = async () => {
    const previousDayData = await chrome.storage.local.get("previousDay");
    
    if (previousDayData.previousDay) {

        const hostList = previousDayData.previousDay.hostList;
        // const data = await prepareData(hostList);
        // const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        previousDayVisitCount.innerHTML = `<p>Total Visit : ${previousDayData.previousDay.visitCount || 0}</p>` 

    }
}




//#endregion

//#region Option Handlers 
    const displayOptions = async () => {

        await sortingOptionDisplay();
        optionsHandlerImplementation();
        hostNameInput.innerText = inputPlaceholder
         
    }

    const sortingOptionDisplay = async () => {
        
        const sortingOption = await getSortingOptions();

        if (sortingOption === 'sortByName') {
            sortByHeader.innerHTML = `<p>Sort By Name</p>`;
        } else {
            sortByHeader.innerHTML = `<p>Sort By Visit Count</p>`;
            sortBySwitch.checked = true
        }
    }

    const optionsHandlerImplementation = async () => {

        sortBySwitch.addEventListener('change', async (e) => {
        
            e.preventDefault();
            if (!sortBySwitch.checked) {
                setSortingOptions('sortByName');
                sortByHeader.innerHTML = `<p>Sort By Name</p>`;
            } else {
                setSortingOptions('sortByVisitCount')
                sortByHeader.innerHTML = `<p>Sort By Visit Count</p>`;
            } 
    
            servePreviousDay();
            serveToday();
    
            sortBySwitch.removeEventListener('click', (e) => {
                e.preventDefault()
            });
        });

        hostNameInput.addEventListener('focusin', (e) => {
            e.preventDefault();
            if (hostNameInput.innerText === inputPlaceholder) {
                hostNameInput.innerText = "";
            } 
            hostNameInput.removeEventListener('focusin', (e) => {
                e.preventDefault();
            });
        });
        
        hostNameInput.addEventListener('focusout', (e) => {
            e.preventDefault();
            if (hostNameInput.innerText === "") {
                hostNameInput.innerText = inputPlaceholder
            }
            hostNameInput.removeEventListener('focusout', (e) => {
                e.preventDefault();
            });
        });

        addBlackListButton.addEventListener('click', (e) => {
            e.preventDefault();
            const hostName = hostNameInput.innerText;
            if (hostName.length && hostName !== inputPlaceholder) {
                setBlackList(hostName)
            }
          
        })
    }

    const generateBlackListElement = async (hostName) => {

        const blackListElement = document.createElement('div');
        blackListElement.classList.add("black-list-element");

        const blackListElementHostName = document.createElement("h2") ;
        blackListElementHostName.innerText = hostName;
        blackListElementHostName.classList.add("black-list-element-host-name");

        const removeFromBlackListButton = document.createElement("div");
        removeFromBlackListButton.innerHTML = "<h3>Remove</h3>"
        removeFromBlackListButton.classList.add("remove-from-black-list-button");
        removeFromBlackListButton.addEventListener('click', (e) => {
            e.preventDefault();
            setBlackList(hostName, "remove");
            blackListElement.remove();

            removeFromBlackListButton.removeEventListener('click', (e) => {
                e.preventDefault();
                setBlackList(hostName, "remove");
                blackListElement.remove();
            });
        });

        blackListElement.appendChild(blackListElementHostName);
        blackListElement.appendChild(removeFromBlackListButton);
        return blackListElement;
    }

    const displayBlackListElements = async () => {
        const blackList = await getBlackList();

        if (blackList && blackList.blackList && blackList.blackList.length) {
            blackList.blackList.forEach(async (hostName) => {
                const generatedElement = await generateBlackListElement(hostName);
                blackListList.appendChild(generatedElement);
            });
        }
    }

    const addHostNameToBlackList = async () => {

    }


//#endregion

// renderDataHandler();
displayOptions();
displayBlackListElements();
renderSlider();

// hostNameInput.addEventListener('input', (e) => {
//     e.preventDefault()
    
//     hostNameInput.removeEventListener('input', (e) => {
//         e.preventDefault()
    
//     });
// })

