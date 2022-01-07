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

    if (previousDayData.previousDay) {

        const hostList = previousDayData.previousDay.hostList;
        const tabCount = previousDayData.tabCount;
        const data = await prepareData(hostList);
        clearElements(previousDayListContainer);
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        
        sortByVisitCount.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(previousDayListContainer, hostName, visitCount, logo)
            
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

    if (hostList.hostList) {

        const tabCount = await getTabCount();
        const hostList1 = hostList.hostList
        const data = await prepareData(hostList1);
        
        clearElements(todayListContainer);
        const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
        
        sortByVisitCount.forEach(async hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            const logoEvent = await generateListElement(todayListContainer, hostName, visitCount, logo);
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
    clearPreviousDayData();
    servePreviousDay();
     
    previousDayDeleteAllButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

previousDayDeleteDomainButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const dataDate = 'previousDay';
    addEventListenerToListElements(previousDayListContainer, removeDeletedElement, dataDate )

    previousDayDeleteDomainButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

todayDeleteAllButton.addEventListener('click', async (e) => {
    e.preventDefault();
    clearTodayData();
    serveToday();

    todayDeleteAllButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

todayDeleteDomainButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const dataDate = 'today';
    addEventListenerToListElements(todayListContainer, removeDeletedElement, dataDate)

    todayDeleteDomainButton.removeEventListener('click', async (e) => {
        e.preventDefault();
    })
})

//#endregion

//#region Utilities

const addEventListenerToListElements = (parent, event, dataDate) => {
    const childrenHTMLCollection = parent.children;
    const childrenArray = [...childrenHTMLCollection];

    childrenArray.forEach(child => {
        removeListElementChildrenEventListener(child);
        // child.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     event(child, dataDate);

        //     child.removeEventListener('click', (e) => {
        //         e.preventDefault();
        //         event();
        //     })
        // })
    })
}

const removeEventListenerFromListElements = (parent, event) => {
    const childrenHTMLCollection = parent.children;
    const childrenArray = [...childrenHTMLCollection];

    childrenArray.forEach(child => {
        child.removeEventListener('click', (e) => {
            e.preventDefault();
            event(child);

        })
    })
}

const removeDeletedElement = async (element, dataDate) => {
    
  

    if (dataDate === 'today') {
        clearSingleDomainToday()
    } else {
        clearSingleDomainPreviousDay()
    }

    element.remove();

}

const removeListElementChildrenEventListener = (element) => {

    const childrenHTMLCollection = element.children;
    const childrenArray = [...childrenHTMLCollection];

    const logo = childrenArray[0];
    const header = childrenArray[1];
    const hostName = header.innerText;


    console.log(todayEventList[hostName][0]);

    console.log(logo, header);

    logo.removeEventListener('click', (e) => {
        e.preventDefault()
        todayEventList[hostName][0];
    }, true);

    header.removeEventListener('click', (e) => {
        e.preventDefault()
        todayEventList[hostName][1];
    }, true);


    
}

//#endregion

renderDataHandler();
