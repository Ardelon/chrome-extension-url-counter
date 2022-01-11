
//#region Prepare and Serve Operations

const generateListElement = async (parent, hostName, visitCount, logo, dataDate ) => {

    const element = document.createElement("div");
    const blockage = document.createElement("div");
    const logoDisplay = document.createElement("img");
    const header =  document.createElement("h4");
    const visitDisplay =  document.createElement("p");



    element.classList.add("list-element");
    blockage.classList.add("blockage", "hide");
    logoDisplay.classList.add("logo");
    header.classList.add("header");
    visitDisplay.classList.add("visitDisplay")

    if (logo.split("extension://").length > 1) {
        logo = "../images/notFound.png"
    }
    logoDisplay.src = logo
    header.innerText = hostName//`${hostName.substring(0,25)}`;

    visitDisplay.innerText = visitCount;

    blockage.addEventListener('click', (e) => {
        e.preventDefault();
        removeDeletedElement(element, hostName, dataDate);

        blockage.removeEventListener('click', (e) => {
            e.preventDefault();
            removeDeletedElement();
        })
    })

    header.addEventListener('click', (e) => {
        e.preventDefault()
        goToSiteEventHandler(hostName);
    })

    logoDisplay.addEventListener('click', (e) => {
        e.preventDefault()
        goToSiteEventHandler(hostName);
    });

    element.appendChild(blockage);
    element.appendChild(logoDisplay);
    element.appendChild(header);
    element.appendChild(visitDisplay);

    parent.appendChild(element);

}

// const logoEventListener = (logoDisplay, hostName) => {
//     const logoEvent = logoDisplay.addEventListener('click', (e) => {
//         e.preventDefault()
//         goToSiteEventHandler(hostName);
//     })
// }

const prepareData = async (hostList) => {
    // const hostList = await chrome.storage.local.get("hostList");
    let uniqueHostNameList = [];
    let sortByNameList = []
    const hostInformationObject = {};
    let totalVisit = 0
    if (hostList) {
        totalVisit = hostList.length
        
        hostList.forEach(host => {
            if (!uniqueHostNameList.includes(host.siteName)) {
                uniqueHostNameList.push(host.siteName);
                sortByNameList.push(host.siteName)
                hostInformationObject[host.siteName] = {
                    visitCount : 1,
                    logo : host.favIcon || "../images/notFound.png"
                }
            } else {
                hostInformationObject[host.siteName].visitCount++
                if (host.favIcon !== "../images/notFound.png") {
                    hostInformationObject[host.siteName].logo = host.favIcon;
                }
                
            }
        });   
    }
    sortByNameList.sort();
    const sortByVisitCount = generateSortForVisitCount(hostInformationObject);

    return [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ]


}

const generateSortForVisitCount = (object) => {

    const keys = Object.keys(object);
    const sortingKeyList = [];
    const sortedList = [];

    keys.forEach(key => {
        const visitCount = object[key].visitCount
        const sortingKey = `${'0'.repeat(6-String(visitCount).length)}${visitCount}+${key}`
        sortingKeyList.push(sortingKey)        
    });
    sortingKeyList.sort();
    sortingKeyList.reverse();

    sortingKeyList.forEach(key => {
        sortedList.push(key.split("+")[1]);
    })
    return sortedList

};

const clearElements = (element) => {
    element.innerHTML = "";
}

const goToSiteEventHandler = (hostName) => {
    window.open(`https://${hostName}`, "_blank");
}

const removeDeletedElement = async (element, hostName, dataDate) => {
    
   

    if (dataDate === 'today') {
        clearSingleDomainToday(hostName)
    } else {
        clearSingleDomainPreviousDay(hostName)
    }

    element.remove();

}

//#endregion

//#region Delete Operations

const clearSingleDomainPreviousDay = async (hostName) => {
    const previousDayData = await chrome.storage.local.get("previousDay");

    if (previousDayData.previousDay) { 

        const hostList = previousDayData.previousDay.hostList;
        console.log(previousDayData.previousDay);
        console.log(hostList);

        const newHostList = [];

        hostList.forEach(element => {
            if (element.hostName !== hostName) {
                newHostList.push(element);
            }
        })

        previousDayData.previousDay.hostList = newHostList;
        chrome.storage.local.set({"previousDay" : previousDayData.previousDay})
    }
};

const clearSingleDomainToday = async (hostName) => {
    const hostList = await chrome.storage.local.get("hostList");

    if (hostList.hostList) {

        const newHostList = [];

        hostList.hostList.forEach(element => {
            if (element.hostName !== hostName) {
                newHostList.push(element);
            }
        })

        chrome.storage.local.set({"hostList" : newHostList})
    }
};

const clearPreviousDayData = async () => {
    chrome.storage.local.set({"previousDay" : null})
};

const clearTodayData = async () => {

    chrome.storage.local.set({"hostList" : null})
    chrome.storage.local.set({"day" : null})
    chrome.storage.local.set({"sessionCount" : null});
    chrome.storage.local.set({"tabCount" : null});
    chrome.storage.local.set({"storedTabStateList" : null})
};

//#endregion