

//! Pured
const generateListElement = async (parent, hostName, visitCount, logo ) => {

    const element = document.createElement("div");
    const logoDisplay = document.createElement("img");
    const header =  document.createElement("h4");
    const visitDisplay =  document.createElement("p");



    element.classList.add("list-element");
    logoDisplay.classList.add("logo");
    header.classList.add("header");
    visitDisplay.classList.add("visitDisplay")

    if (logo.split("extension://").length > 1) {
        logo = "../images/notFound.png"
    }
    logoDisplay.src = logo
    header.innerText = hostName//`${hostName.substring(0,25)}`;

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

    parent.appendChild(element);

}

//! Pured
const prepareData = async (hostList) => {
    console.log("prepareData");
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
    console.log(sortByVisitCount);

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

}

const sortToName = (uniqueHostNameList) => {
    return uniqueHostNameList.sort();
};

const sortToVisitCount = (sortingKeyList) => {

    sortingKeyList

}

//! Pured
const clearElements = (element) => {
    element.innerHTML = "";
}

//! Pured
const goToSiteEventHandler = (hostName) => {
    window.open(`https://${hostName}`, "_blank");
}

