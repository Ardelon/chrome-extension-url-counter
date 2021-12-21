const getTabCount = async () => {
    return await chrome.storage.local.get("tabCount");
}

// let tabCountButton = document.getElementById("tab-count-button");
let tabCountDiv = document.getElementById("tab-count");
let listContainer = document.getElementById("list-container");
let totalVisitDisplay = document.getElementById("total-visit");




// tabCountButton.addEventListener("click", async () => {
  
//     eventHandler()
// })

const generateListElement = async (hostName, visitCount, logo ) => {

    const element = document.createElement("div");
    const logoDisplay = document.createElement("img");
    const header =  document.createElement("h4");
    const visitDisplay =  document.createElement("p");



    element.classList.add("list-element");
    logoDisplay.classList.add("logo");
    header.classList.add("header");
    visitDisplay.classList.add("visitDisplay")

    logoDisplay.src = logo
    header.innerText = hostName;

    visitDisplay.innerText = visitCount;


    header.addEventListener('click', (e) => {
        e.preventDefault()
        goToSiteEventHandler(hostName);
    })

    logoDisplay.addEventListener('click', (e) => {
        e.preventDefault()
        goToSiteEventHandler(hostName);
    })


    element.appendChild(logoDisplay);
    element.appendChild(header);
    element.appendChild(visitDisplay);

    listContainer.appendChild(element);

}

const prepareData = async () => {

    const hostList = await chrome.storage.local.get("hostList");
    const uniqueHostNameList = [];
    const hostInformationObject = {};
    const totalVisit = hostList.hostList.length

    hostList.hostList.forEach(host => {
        if (!uniqueHostNameList.includes(host.siteName)) {
            uniqueHostNameList.push(host.siteName);
            hostInformationObject[host.siteName] = {
                visitCount : 1,
                logo : host.favIcon || "https://assets.justinmind.com/wp-content/uploads/2019/07/favicon.ico"
            }
        } else {
            hostInformationObject[host.siteName].visitCount++
        }
    });



    return [uniqueHostNameList, hostInformationObject, totalVisit ]


}

const clearElements = () => {
    listContainer.innerHTML = "";
}

const goToSiteEventHandler = (hostName) => {
    window.open(`https://${hostName}`, "_blank");
}

const eventHandler = async () => {
    const tabCount = await getTabCount();
    const data = await prepareData();
    clearElements();
    const [uniqueHostNameList, hostInformationObject, totalVisit ] = data
    tabCountDiv.innerText = `Tab Count : ${tabCount.tabCount}`;
    uniqueHostNameList.forEach(hostName => {
        const visitCount = hostInformationObject[hostName].visitCount;
        const logo =  hostInformationObject[hostName].logo
        generateListElement(hostName, visitCount, logo)

    });

    totalVisitDisplay.innerText = `Total Visit : ${totalVisit}` 
}

eventHandler();