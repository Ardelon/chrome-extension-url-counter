// let tabCountButton = document.getElementById("tab-count-button");
let tabCountDiv = document.getElementById("tab-count");
let listContainer = document.getElementById("list-container");
let totalVisitDisplay = document.getElementById("total-visit");


const getTabCount = async () => {
    return await chrome.storage.local.get("tabCount");
}

const eventHandler = async () => {
    const hostList = await chrome.storage.local.get("hostList");
    const tabCount = await getTabCount();
    const hostList1 = hostList.hostList
    const data = await prepareData(hostList1);
    clearElements(listContainer);
    const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
    tabCountDiv.innerText = `Tab Count : ${tabCount.tabCount || 0}`;
    
    sortByVisitCount.forEach(hostName => {
        const visitCount = hostInformationObject[hostName].visitCount;
        const logo =  hostInformationObject[hostName].logo
        generateListElement(listContainer, hostName, visitCount, logo)

    });

    totalVisitDisplay.innerText = `Total Visit : ${totalVisit}` 
}

eventHandler();