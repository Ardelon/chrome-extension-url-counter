// const sendInfoToServer = (props) => {
//     fetch('http://localhost:3000', {
//         method : 'POST',
//         body : JSON.stringify({props}),
//         headers: new Headers({
//             'Content-Type': 'application/json; charset=UTF-8'
//           })
//     })
// }

// //#region //* Chrome Event Listeners 

// // Chrome Browser is Opened
// chrome.windows.onCreated.addListener((window, filters) => {
//     console.log('Browser Created');
//     // sendInfoToServer(window);
//     sendInfoToServer(filters); // Object, optioal ,  ['normal', 'popup', panel]
//     updateDateCounters();
// });

// // New Tab is Created
// chrome.tabs.onCreated.addListener(async (tab) => {
//     console.log('New Tab Created');
//     // sendInfoToServer(tab)
//     addOneToTabCount();
//     const store = await chrome.storage.sync.get("store");
// });

// // Tab is Updated
// chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) => {
//     console.log('Tab is Updated');
//     if (tab.status === 'complete') {
//         // sendInfoToServer(tabId)
//         storeTabState(tabId, tab);
//     }
    
    

// });

// //#endregion

// //#region //* Browser is Opened Utilities

// const setSessionCount = () => {
//     console.log('Set Session Count +1');
// }

// const getSessionCount = () => {
//     console.log('Get Session Count');
// }

// const setDay = () => {
//     console.log('Set Day');

// }

// const getDay = () => {
//     console.log('Get Day');
// }

// const updateDateCounters = () => {
//     setSessionCount();

//     const [generatedDay, remainingMiliSeconds] = generateDay();
//     const savedDay = getDay();

//     if (generatedDay !== savedDay) {
//         setDay(generatedDay)
//     } else {
//         setTimeout(() => {
//             const [generatedDayToBe] = generateDay();
//             setDay(generatedDayToBe)
//         }, remainingMiliSeconds);
//     }
// }

// //#endregion

// //#region //* New Tab is Created Utilities

// const addOneToTabCount = async () => {
//     console.log('Add One To Tab Count');
//     let store = await chrome.storage.sync.get("store");
//     console.log(store);
//     if (!store) {
//         store = createStore();
//     }
//     store.tabCount++;
//     chrome.storage.sync.set("store", store);
// }

// //#endregion

// //#region //* Tab On Update Utilities

// const storeTabState = async (tabId, tab) => {
//     console.log('Store Tab State');
//     const urlSet = scrapeInformationFromUrl(tab.url)
//     const [fullUrl, protocol, hostname, pathname, search] = urlSet
//     const tabState = {
//         tabId,
//         siteName : hostname.split('.')[0],
//         hostname,
//         url : fullUrl
//     };

//     let storedTabStateList = await getStoredTabStateList(tabId);

//     if (!storedTabStateList) {
//         storedTabStateList = []
//     }


//     const willBeUpdated = await setStoredTabState(storedTabStateList, tabState);

//     if (willBeUpdated) {
//         updateDomain(tabState)
//     }

// };


// const getStoredTabStateList = async (tabId = 0) => {
//     console.log('Get Stored Tab State List');
//     return await chrome.storage.sync.get("storedTabStateList", (data) => {
//         return data
//     })
// }

// const setStoredTabState = async (storedTabStateList) => {
//     console.log('Set Stored Tab State');
//     let willBeUpdated = false
//     await storedTabStateList.forEach(storedTabState => {
//         if (storedTabState.hostName === tabState.hostName ) {
//             if (tabState.url !== storedTabState.url) {
//                 storedTabState = tabState
//                 willBeUpdated = true
//             }
    
//         }
//     });

//     chrome.storage.sync.set({"storedTabList" : storedTabStateList})
//     return willBeUpdated
// };

// const updateDomain = async (tabState) => {
//     console.log('Update Domain');

//     const store = await getStore()

//     let isRecordExist = false;

//     await store.hostList.forEach(host => {
//         if (host.siteName === tabState.siteName) {
//             host.visitCount++;
//             isRecordExist = true
//         }
//     });

//     if (!isRecordExist) {
//         store.hostList.push({siteName : tabState.siteName, hostName : tabState.hostName, visitCount : 1});
//     }
// }

// //#endregion

// //#region Minor Utility Functions, Not Shown in Sketch

// const generateDay = () => {

//     const date = Date.now();
//     const today = new Date(date);

//     const todayInString = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;

//     const secondSpentToday = (today.getHours()*3600)+(today.getMinutes()*60)+(today.getSeconds())
//     const remainingMiliSeconds = (86400 - secondSpentToday)*1000;


//     return [todayInString, remainingMiliSeconds]
// }

// const scrapeInformationFromUrl = (fullUrl) => {
//     const url = new URL(fullUrl);
//     return [fullUrl, url.protocol, url.hostname, url.pathname, url.search]
// }

// //#endregion

// const createStore = () => {
//     const store = {
//         day : "",
//         sessionCount : 0,
//         tabCount : 0,
//         hostList : []
//     }
//     chrome.storage.sync.set({"store" : store});
//     return store
// }

// const getStore = async () => {
//     return await chrome.storage.get("store", (data) => {
//         console.log(data);
//         if (!data) {
//             console.log(data);
//             data = createStore();
//         }
//         console.log(data);
//         return data
//     })
// };

// const setStore = (store) => {
//     chrome.storage.set("store",store)
// }



const execute = async () => {
    
    await chrome.storage.local.get(["store"], (data) => {
        let data1 = data[0]
        console.log(data1.store.tabCount);
        data1.store.tabCount++;
        console.log(data1.store.tabCount);
        chrome.storage.local.set({"store": data1})
    })
    // console.log(data);
}

chrome.storage.sync.clear(); 
chrome.storage.local.set({"store" : {tabCount : 1}})
// execute();