//#region Chrome Event Listeners

chrome.windows.onCreated.addListener((window, filters) => {
    // console.log('Browser Created');

    sessionCount(window)
    updateDateCounters();

});

// New Tab is Created
chrome.tabs.onCreated.addListener(async (tab) => {
    // console.log('New Tab Created');
    addOneToTabCount();
  
});

// Tab is Updated
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) => {
    // console.log('Tab is Updated');
    if (tab.status === 'complete') {
        storeTabState(tabId, tab);
    }
});

//#endregion

//#region Storage Methods

const getHostList = async () => {
    return await chrome.storage.local.get("hostList");
}

const addToHostList = async (model) => {
    let hostList = await getHostList();
    if (!hostList.hostList) {
        hostList["hostList"] = [];
    }
    hostList.hostList.push(model)
    chrome.storage.local.set({"hostList":hostList.hostList})

}

const clearStorage = () => {
    chrome.storage.local.set({"hostList" : null})
    chrome.storage.local.set({"day" : null})
    chrome.storage.local.set({"sessionCount" : null});
    chrome.storage.local.set({"tabCount" : null});
    chrome.storage.local.set({"storedTabStateList" : null})
}

const storeStorage = async () => {
    const hostList = await chrome.storage.local.get("hostList")
    const day = await chrome.storage.local.get("day")
    const sessionCount = await chrome.storage.local.get("sessionCount")
    const tabCount = await chrome.storage.local.get("tabCount")
    // const storedTabStateList = await chrome.storage.local.get("storedTabStateList")
    
    const model = {
        day : day.day,
        sessionCount : sessionCount.sessionCount,
        tabCount : tabCount.tabCount,
        hostList : hostList.hostList
    }

    setPreviousDay(model);

}

const setDay = async (generatedDay) => {
    // console.log('Set Day');
    await storeStorage();
    await clearStorage();
    chrome.storage.local.set({"day" : generatedDay});
}

const getDay = async () => {
    // console.log('Get Day');
    return await chrome.storage.local.get("day");
}

const updateDateCounters = async () => {

    const [generatedDay, remainingMiliSeconds] = generateDay();
    const {day : savedDay} = await getDay();
  
    if (generatedDay !== savedDay) {
        setDay(generatedDay)
    } else {
        setTimeout(() => {
            const [generatedDayToBe] = generateDay();
            setDay(generatedDayToBe);
        }, remainingMiliSeconds);
    }
}

const sessionCount = async (e) => {
    // console.log("Session Count");
    let sessionCount = await chrome.storage.local.get("sessionCount") || {} ;

    if (!sessionCount || typeof (sessionCount.sessionCount) !== 'number' ) {
        chrome.storage.local.set({"sessionCount": 1});        
    } else {

        sessionCount.sessionCount++
        chrome.storage.local.set({"sessionCount": sessionCount.sessionCount});        
    }
};

const addOneToTabCount = async () => {
    // console.log('Add One To Tab Count');
    let tabCount = await chrome.storage.local.get("tabCount") || {} ;

    if (!tabCount || typeof (tabCount.tabCount) !== 'number' ) {
        chrome.storage.local.set({"tabCount": 1});        
    } else {

        tabCount.tabCount++
        chrome.storage.local.set({"tabCount": tabCount.tabCount});        
    }
 
};

const storeTabState = async (tabId, tab) => {
    // console.log('Store Tab State');
    const urlSet = scrapeInformationFromUrl(tab.url)
    let [fullUrl, protocol, hostName, pathname, search] = urlSet;

    if (hostName.includes("www.")) {
        hostName = hostName.split("www.")[1];
    }
    
    const tabState = {
        tabId,
        siteName : hostName,
        hostName,
        url : fullUrl,
        timeStamp : Date.now(),
        favIcon : tab.favIconUrl || "../images/notFound.png"
    };

    if (!tabState.url.includes("chrome://")) {

        
        let storedTabStateList = await getStoredTabStateList();
        
        if (!storedTabStateList.storedTabStateList) {
            storedTabStateList["storedTabStateList"] = []
        }
        
        const willBeUpdated = await setStoredTabState(storedTabStateList.storedTabStateList, tabState);
        // console.log(willBeUpdated);
        if (willBeUpdated) {
            updateDomain(tabState)
        }
    }

};

const getStoredTabStateList = async () => {
    // console.log('Get Stored Tab State List');
    return await chrome.storage.local.get("storedTabStateList")
};

const setPreviousDay = async (previousDay) => {
    chrome.storage.local.set({"previousDay" : previousDay})
}


//#endregion

//#region Utilities

const generateDay = () => {

    const date = Date.now();
    const today = new Date(date);

    const todayInString = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;

    const secondSpentToday = (today.getHours()*3600)+(today.getMinutes()*60)+(today.getSeconds())
    const remainingMiliSeconds = (86400 - secondSpentToday)*1000;


    return [todayInString, remainingMiliSeconds]
}

const scrapeInformationFromUrl = (fullUrl) => {
    const url = new URL(fullUrl);
    return [fullUrl, url.protocol, url.hostname, url.pathname, url.search]
};

const setStoredTabState = async (storedTabStateList, tabState) => {
    // console.log('Set Stored Tab State');
    
    let willBeUpdated = false;
    let isTabExist = false;
    let isSameHost = false;
    let isSameUrl = false;
    let changeIndex = -1;

    if (storedTabStateList.length === 0) {
        willBeUpdated = true; 
        storedTabStateList.push(tabState);   
    } else {
        storedTabStateList.forEach((storedTabState, index) => {
            if (storedTabState.tabId === tabState.tabId) {
                changeIndex = index;

                isTabExist = true
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
            willBeUpdated = true; 
        } else {
            if (!isSameHost || !isSameUrl) {
                storedTabStateList[changeIndex] = tabState;
                willBeUpdated = true; 
            }
        }

    }

    chrome.storage.local.set({"storedTabStateList" : storedTabStateList});

    return willBeUpdated

    
};

const updateDomain = async (tabState) => {
    // console.log('Update Domain');

    addToHostList(tabState)
}


//#endregion