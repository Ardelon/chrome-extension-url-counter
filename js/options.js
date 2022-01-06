const previousDayListContainer = document.getElementById("previous-day-list");
const todayListContainer = document.getElementById("today-list");

const eventHandler = async () => {
    servePreviousDay();
    serveToday();

};

const getTabCount = async () => {
    return await chrome.storage.local.get("tabCount");
}

const servePreviousDay = async () => {
    const previousDayData = await chrome.storage.local.get("previousDay")
    const hostList = previousDayData.previousDay.hostList;
    const tabCount = previousDayData.tabCount;
    const data = await prepareData(hostList);
    clearElements(previousDayListContainer);
    const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data

    sortByNameList.forEach(hostName => {
        const visitCount = hostInformationObject[hostName].visitCount;
        const logo =  hostInformationObject[hostName].logo
        generateListElement(previousDayListContainer, hostName, visitCount, logo)

    });
}

const serveToday = async () => {
    const hostList = await chrome.storage.local.get("hostList");
    const tabCount = await getTabCount();
    const hostList1 = hostList.hostList
    const data = await prepareData(hostList1);

    clearElements(todayListContainer);
    const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data

    sortByVisitCount.forEach(hostName => {
        const visitCount = hostInformationObject[hostName].visitCount;
        const logo =  hostInformationObject[hostName].logo
        generateListElement(todayListContainer, hostName, visitCount, logo)

    });
}

eventHandler();