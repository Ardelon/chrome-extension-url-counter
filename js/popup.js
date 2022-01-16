// let tabCountButton = document.getElementById("tab-count-button");
let tabCountDiv = document.getElementById("tab-count");
let listContainer = document.getElementById("list-container");
let totalVisitDisplay = document.getElementById("total-visit");
const optionsPageButton = document.getElementById("options-page-button");


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
    tabCountDiv.innerHTML = `<p>Tab Count : ${tabCount.tabCount || 0}</p>`;

    const sortingOption = await getSortingOptions();

    if (sortingOption === 'sortByName') {
    
        sortByNameList.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(listContainer, hostName, visitCount, logo)

        });

    } else {
    
        sortByVisitCount.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(listContainer, hostName, visitCount, logo)
    
        });
    
    } 
    totalVisitDisplay.innerHTML = `<p>Total Visit : ${totalVisit}</p>` 
}

const openOptionsPageEvent = () => {

    
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
}

eventHandler();
optionsPageButton.addEventListener('click', (e) => {
    e.preventDefault();
    openOptionsPageEvent()
    optionsPageButton.removeEventListener('click', (e) => {
        e.preventDefault();
        openOptionsPageEvent();
    })
})