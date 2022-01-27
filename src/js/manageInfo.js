import { onlyUnique } from "./utilities";
//#region Prepare and Serve Operations

export const generateListElement = async (parent, hostName, visitCount, logo, dataDate ) => {

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

    blockage.addEventListener('click', async (e) => {
        e.preventDefault();
        await removeDeletedElement(element, hostName, dataDate);
        clearDomainData(dataDate, hostName);

        blockage.removeEventListener('click', (e) => {
            e.preventDefault();
      
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

export const prepareData = async (hostList) => {
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

export const generateSortForVisitCount = (object) => {

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

export const clearElements = (element) => {
    element.innerHTML = "";
}

export const goToSiteEventHandler = (hostName) => {
    window.open(`https://${hostName}`, "_blank");
}

export const removeDeletedElement = async (element, hostName, dataDate) => {
    
   

    if (dataDate === 'today') {
        // await clearSingleDomainToday(hostName)
    } else {
        // await clearSingleDomainPreviousDay(hostName)
    }

    element.remove();

}

//#endregion

//#region Delete Operations

export const clearSingleDomainPreviousDay = async (hostName) => {
    const previousDayData = await chrome.storage.local.get("previousDay");

    if (previousDayData.previousDay) { 

        const hostList = previousDayData.previousDay.hostList;

        const newHostList = [];

        hostList.forEach((element, index) => {
            if (element.hostName !== hostName) {
                newHostList.push(element);
            }
        });
        previousDayData.previousDay.visitCount = newHostList.length
        previousDayData.previousDay.hostList = newHostList;
        chrome.storage.local.set({"previousDay" : previousDayData.previousDay})
    }
};

export const clearSingleDomainToday = async (hostName) => {
    const hostList = await chrome.storage.local.get("hostList");

    if (hostList.hostList) {

        const newHostList = [];

        hostList.hostList.forEach(element => {
            if (element.hostName !== hostName) {
                newHostList.push(element);
            }
        })
        hostList.hostList = newHostList
        chrome.storage.local.set({"hostList" : hostList.hostList})
    }
};

export const clearPreviousDayData = async () => {
    chrome.storage.local.set({"previousDay" : null})
};

export const clearTodayData = async () => {

    chrome.storage.local.set({"hostList" : null})
    // chrome.storage.local.set({"day" : null})
    chrome.storage.local.set({"sessionCount" : null});
    chrome.storage.local.set({"tabCount" : null});
    chrome.storage.local.set({"storedTabStateList" : null})
};

export const clearDomainData = async (date, hostName) => {

    const storedDays = await getStoredDays();

    if (storedDays.storedDays) {
        storedDays.storedDays.forEach((storedDay, index) => {
            if (storedDay.day === date) {
                const newHostList = [];
                console.log(storedDay);
                storedDay.hostList.forEach(element =>{
                    if (element.hostName !== hostName) {
                        newHostList.push(element);
                    }
                });
                storedDay.hostList = newHostList;                
            }
        });
        chrome.storage.local.set({"storedDays" : storedDays.storedDays});
    }

}

export const clearAllData = async (date) => {

}
//#endregion

//#region Storage Operations

export const getBlackList = async () => {
    const blackList = await chrome.storage.local.get("blackList");

    if (!blackList || !blackList.blackList) {
        chrome.storage.local.set({"blackList" : []});
    } 

    return blackList || []
}

export const setBlackList = async (urlPiece, operation = "add") => {

    const blackList = await chrome.storage.local.get("blackList");
    
    if (!blackList || !blackList.blackList) {
        chrome.storage.local.set({"blackList" : [urlPiece]});
    } else {
        if (!blackList.blackList.includes(urlPiece) && operation === "add") {
            blackList.blackList.push(urlPiece);
            const filteredBlackList = blackList.blackList.filter(onlyUnique);
            blackList.blackList = filteredBlackList
            chrome.storage.local.set({"blackList" : blackList.blackList});   
        } else if (blackList.blackList.includes(urlPiece) && operation === "remove") {
            for( let i = 0; i < blackList.blackList.length; i++){ 
    
                if ( blackList.blackList[i] === urlPiece) { 
            
                    blackList.blackList.splice(i, 1); 
                }
            
            }
            chrome.storage.local.set({"blackList" : blackList.blackList});   
        }
    }
}   

export const getStoredDays = async () => {
    const storedDays = await chrome.storage.local.get("storedDays");

    if (!storedDays || !storedDays.storedDays) {
        chrome.storage.local.set({"storedDays" : []});
    }

    return storedDays || [];
}

export const addStoredDays = async (day) => {
    const storedDays = await getStoredDays();
    
    if (storedDays && storedDays.storedDays) {
        if (storedDays.storedDays.length < 31) {
            storedDays.storedDays.push(day);
            chrome.storage.local.set({"storedDays" : storedDays.storedDays})
        } else {
            storedDays.storedDays.shift();
            storedDays.storedDays.push(day);
            chrome.storage.local.set({"storedDays" : storedDays.storedDays})
        }
    } else {
        chrome.storage.local.set({"storedDays" : [storedDays.storedDays]})
    }
}

//#endregion