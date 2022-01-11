//#region Elements

const previousDayListContainer = document.getElementById("previous-day-list");
const todayListContainer = document.getElementById("today-list");

const previousDayDeleteAllButton = document.getElementById("previous-day-delete-all");
const previousDayDeleteDomainButton = document.getElementById("previous-day-delete-domain");

const todayDeleteAllButton = document.getElementById("today-delete-all");
const todayDeleteDomainButton = document.getElementById("today-delete-domain");

let todayEventList = {};
let previousDayEventList = {};

const getTabCount = async () => {
    return await chrome.storage.local.get("tabCount");
}

//#endregion

//#region render Data

const renderDataHandler = async () => {
    servePreviousDay();
    serveToday();

};

const servePreviousDay = async () => {
    const previousDayData = await chrome.storage.local.get("previousDay");
    clearElements(previousDayListContainer);

    if (previousDayData.previousDay) {

        const hostList = previousDayData.previousDay.hostList;
        const tabCount = previousDayData.tabCount;
        const data = await prepareData(hostList);
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        
        sortByVisitCount.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(previousDayListContainer, hostName, visitCount, logo, 'previousDay')
            
        });
    } else {
        const noDataWarning = document.createElement("h2")
        noDataWarning.innerText = "No data found";
        noDataWarning.style.textAlign = "center"
        previousDayListContainer.appendChild(noDataWarning)
    }
}

const serveToday = async () => {
    const hostList = await chrome.storage.local.get("hostList");
    clearElements(todayListContainer);

    if (hostList.hostList) {

        const tabCount = await getTabCount();
        const hostList1 = hostList.hostList
        const data = await prepareData(hostList1);
        
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        
        sortByVisitCount.forEach(async hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            const logoEvent = await generateListElement(todayListContainer, hostName, visitCount, logo, 'today');
            todayEventList[hostName] = logoEvent;
            
        });

    } else {
        const noDataWarning = document.createElement("h2")
        noDataWarning.innerText = "No data found";
        noDataWarning.style.textAlign = "center"
        todayListContainer.appendChild(noDataWarning)
    }
}

//#endregion

//#region Button Event Listeners

previousDayDeleteAllButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await clearPreviousDayData();
    servePreviousDay();
     
    previousDayDeleteAllButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

previousDayDeleteDomainButton.addEventListener('click', async (e) => {
    e.preventDefault();
    toggleBlockageElement(previousDayListContainer)

    previousDayDeleteDomainButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

todayDeleteAllButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await clearTodayData();
    serveToday();

    todayDeleteAllButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

todayDeleteDomainButton.addEventListener('click', async (e) => {
    e.preventDefault();
    toggleBlockageElement(todayListContainer)

    todayDeleteDomainButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

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




//#endregion

renderDataHandler();
