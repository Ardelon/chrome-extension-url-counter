const sendInfoToServer = (props) => {
    fetch('http://localhost:3000', {
        method : 'POST',
        body : JSON.stringify({props}),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
          })
    })
}

//#region //* Chrome Event Listeners 

// Chrome Browser is Opened
chrome.windows.onCreated.addListener((window, filters) => {
    // console.log('Browser Created');
    // sendInfoToServer(window);
    // sendInfoToServer(filters); // Object, optioal ,  ['normal', 'popup', panel]
    // updateDateCounters();
    sessionCount(window)

});

// New Tab is Created
chrome.tabs.onCreated.addListener(async (tab) => {
    // console.log('New Tab Created');
    // sendInfoToServer(tab)
    addOneToTabCount();
  
});

// Tab is Updated
chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) => {
    // console.log('Tab is Updated');
    if (tab.status === 'complete') {
        // sendInfoToServer(tabId)
        storeTabState(tabId, tab);
    }
    
    

});

//#endregion

//#region //* Browser is Opened Utilities

const setSessionCount = () => {
    // console.log('Set Session Count +1');
}

const getSessionCount = () => {
    // console.log('Get Session Count');
}

const setDay = () => {
    // console.log('Set Day');

}

const getDay = () => {
    // console.log('Get Day');
}

const updateDateCounters = () => {
    setSessionCount();

    const [generatedDay, remainingMiliSeconds] = generateDay();
    const savedDay = getDay();

    if (generatedDay !== savedDay) {
        setDay(generatedDay)
    } else {
        setTimeout(() => {
            const [generatedDayToBe] = generateDay();
            setDay(generatedDayToBe)
        }, remainingMiliSeconds);
    }
}

const sessionCount = async (e) => {
    console.log("Session Count");
    let sessionCount = await chrome.storage.local.get("sessionCount") || {} ;

    if (!sessionCount || typeof (sessionCount.sessionCount) !== 'number' ) {
        chrome.storage.local.set({"sessionCount": 1});        
    } else {
        // console.log("else");
        sessionCount.sessionCount++
        chrome.storage.local.set({"sessionCount": sessionCount.sessionCount});        
    }
}

//#endregion

//#region //* New Tab is Created Utilities

const addOneToTabCount = async () => {
    // console.log('Add One To Tab Count');
    let tabCount = await chrome.storage.local.get("tabCount") || {} ;

    if (!tabCount || typeof (tabCount.tabCount) !== 'number' ) {
        chrome.storage.local.set({"tabCount": 1});        
    } else {
        // console.log("else");
        tabCount.tabCount++
        chrome.storage.local.set({"tabCount": tabCount.tabCount});        
    }
    // console.log(await chrome.storage.local.get("tabCount"));
    
 
}

//#endregion

//#region //* Tab On Update Utilities

const storeTabState = async (tabId, tab) => {
    // console.log('Store Tab State');
    const urlSet = scrapeInformationFromUrl(tab.url)
    const [fullUrl, protocol, hostName, pathname, search] = urlSet
    
    const tabState = {
        tabId,
        siteName : hostName,
        hostName,
        url : fullUrl,
        timeStamp : Date.now()
    };
   
    let storedTabStateList = await getStoredTabStateList();

    if (!storedTabStateList.storedTabStateList) {
        storedTabStateList["storedTabStateList"] = []
    }

    const willBeUpdated = await setStoredTabState(storedTabStateList.storedTabStateList, tabState);
    console.log(willBeUpdated);
    if (willBeUpdated) {
        updateDomain(tabState)
    }

};


const getStoredTabStateList = async () => {
    // console.log('Get Stored Tab State List');
    return await chrome.storage.local.get("storedTabStateList")
}

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

    // const store = await getStore()

    // let isRecordExist = false;

    // await store.hostList.forEach(host => {
    //     if (host.siteName === tabState.siteName) {
    //         host.visitCount++;
    //         isRecordExist = true
    //     }
    // });

    // if (!isRecordExist) {
    //     store.hostList.push({siteName : tabState.siteName, hostName : tabState.hostName, visitCount : 1});
    // }

    addToHostList(tabState)
}

//#endregion

//#region Minor Utility Functions, Not Shown in Sketch

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
}

//#endregion

const createStore = () => {
    const store = {
        day : "",
        sessionCount : 0,
        tabCount : 0,
        hostList : []
    }
    // chrome.storage.local.set({"store" : store});
    return store
}

const getStore = async () => {
    return await chrome.storage.local.get("store", (data) => {
        if (!data) {
            data = createStore();
        }
        return data
    })
};

const setStore = (store) => {
    // chrome.storage.local.set("store",store)
}


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


// const execute = async () => {
    
//     await chrome.storage.local.get(["store"], (data) => {
//         let data1 = data[0]
//         console.log(data1.store.tabCount);
//         data1.store.tabCount++;
//         console.log(data1.store.tabCount);
//         chrome.storage.local.set({"store": data1})
//     })
//     // console.log(data);
// }

// chrome.storage.sync.clear(); 
// chrome.storage.local.set({"store" : {tabCount : 1}})
// execute();