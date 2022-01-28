import _ from 'lodash'
import { getStoredDays, prepareData, generateListElement, clearAllData } from './manageInfo';
import { getSortingOptions } from './manageOptions';

const listContainer = document.getElementById("list-container-belt");
const goLeftButton = document.getElementById("list-container-go-left-button");
const goRightButton = document.getElementById("list-container-go-right-button")

export const renderSlider = async () => {
    const storedDays = await getStoredDays();

    if (storedDays && storedDays.storedDays) {
        listContainer.innerHTML = null;
        storedDays.storedDays.forEach(async (storedDay, index) => {
            const day = await generateDayContainer(storedDay, index);
            listContainer.appendChild(day)
        });
    }
}

const thLeft = _.throttle(function() {
    slideVisionMethod2('left')
}, 800);

const thRight = _.throttle(function() {
    slideVisionMethod2('right')
}, 800);

goLeftButton.addEventListener('click', thLeft)


goRightButton.addEventListener('click', thRight);

const slideVisionMethod2 = (direction) => {

    let frame = 64; 
    let frameRate = 6; // miliseconds
    let interval;
    let target;
    let horizontalAmount;
    let verticalAmount;
    clearInterval(interval);
    const driver = {
        'left' : () => {
      
            const belt = document.getElementById(`list-container-belt`)   
            const firstChild = belt.firstElementChild;
            const style = window.getComputedStyle(firstChild);
            horizontalAmount = parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.width)
            target = Math.max(belt.scrollLeft - horizontalAmount, 0);
            interval = setInterval(() => {
                belt.scrollLeft = Math.max(belt.scrollLeft - Math.max(horizontalAmount/frame, 1), target);
                if (belt.scrollLeft === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'right' : () => {

            const belt = document.getElementById(`list-container-belt`)   
            const firstChild = belt.firstElementChild;
            const style = window.getComputedStyle(firstChild);
            horizontalAmount = parseInt(style.marginLeft) + parseInt(style.marginRight) + parseInt(style.width)
            target = Math.min(belt.scrollLeft + horizontalAmount, belt.scrollWidth - belt.clientWidth);

            interval = setInterval(() => {
                belt.scrollLeft = Math.min(belt.scrollLeft + Math.max(horizontalAmount/frame, 1), target);
                if (belt.scrollLeft === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'up' : () => {

            selectedBelt = Math.max(selectedBelt - 1, 0);
            const belt = document.getElementById(`selected-belt-${selectedBelt}`);
            const style = window.getComputedStyle(belt);
            verticalAmount = parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.height)
            target = Math.max(mainContainer.scrollTop - verticalAmount, 0);
            
            interval = setInterval(() => {
                mainContainer.scrollTop = Math.max(mainContainer.scrollTop - Math.max(verticalAmount/frame, 1), target)
                if (mainContainer.scrollTop === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        },
        'down' : () => {

            selectedBelt = Math.min(selectedBelt + 1, 30);
            const belt = document.getElementById(`selected-belt-${selectedBelt}`);
            const style = window.getComputedStyle(belt);
            verticalAmount = parseInt(style.marginTop) + parseInt(style.marginBottom) + parseInt(style.height)
            target = Math.min(mainContainer.scrollTop + verticalAmount, mainContainer.scrollHeight - mainContainer.clientHeight)

            interval = setInterval(() => {
                mainContainer.scrollTop = Math.min(mainContainer.scrollTop + Math.max(verticalAmount/frame, 1), target)
                if (mainContainer.scrollTop === target) {
                    clearInterval(interval)
                }
            }, frameRate);
        }
    }

    const driverKeys = Object.keys(driver);
    if (driverKeys.includes(direction)) {
        driver[direction]();
    } else {
        console.log('No or wrong direction');
    }
}

const generateDayContainer = async (storedDay, index) => {

    const dayContainer = document.createElement("div");
    dayContainer.classList.add("belt-element");
    dayContainer.id = `day-container-${index}`;

    const dayHeader = document.createElement("h1");
    dayHeader.innerText = storedDay.day;
    dayHeader.classList.add("belt-header");

    const counterContainer = document.createElement("div");
    counterContainer.classList.add("counter-container");

    const tabCount = document.createElement("div");
    tabCount.classList.add("count-indicator");
    tabCount.innerHTML = `<p>Tab Count : ${storedDay.tabCount || 0}</p>`;

    const totalVisitCount = document.createElement("div");
    totalVisitCount.classList.add("count-indicator", "total-visit-count");

    const dayList = document.createElement("div");
    dayList.classList.add("belt-host-list-container");

    const deleteButtonsContainer = document.createElement("div");
    deleteButtonsContainer.classList.add("delete-buttons-container");

    const deleteAllButton = document.createElement("div");
    deleteAllButton.innerHTML = "<p>Delete All</p>"
    deleteAllButton.classList.add("delete-button");

    const deleteDomaintButton = document.createElement("div");
    deleteDomaintButton.innerHTML = "<p>Delete Domain</p>";
    deleteDomaintButton.classList.add("delete-button");

    const data = await prepareData(storedDay.hostList);

    const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data;
    const sortingOption = await getSortingOptions();

    if (sortingOption === 'sortByName') {
            
        sortByNameList.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(dayList, hostName, visitCount, logo, storedDay.day, updateTabCount)
            
        });
    } else {

        sortByVisitCount.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(dayList, hostName, visitCount, logo, storedDay.day, updateTabCount)
            
        });
    }

    totalVisitCount.innerHTML =  `<p>Total Visit : ${totalVisit || 0}</p>`;

    deleteDomaintButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const blockageList = [...dayList.getElementsByClassName("hide")];
        if (blockageList.length) {

            blockageList.forEach(blockage => {
                blockage.classList.remove("hide");
            });
        } else {
            console.log("selam")
            reGenerateDay(storedDay.day, index);
        }
        deleteDomaintButton.removeEventListener('click', async (e) => {
            e.preventDefault();
        })
    })

    deleteAllButton.addEventListener('click', async (e) => {
        e.preventDefault();

        await clearAllData(storedDay.day);
        renderSlider();

        deleteAllButton.removeEventListener('click', async (e) => {
            e.preventDefault();
        })
    })
    
    
    counterContainer.appendChild(tabCount);
    counterContainer.appendChild(totalVisitCount);
    
    deleteButtonsContainer.appendChild(deleteAllButton);
    deleteButtonsContainer.appendChild(deleteDomaintButton);
    
    dayContainer.appendChild(dayHeader);
    dayContainer.appendChild(dayList);
    dayContainer.appendChild(counterContainer);
    dayContainer.appendChild(deleteButtonsContainer)

    return dayContainer

}

const reGenerateDay = async (dayDate) => {

    const storedDays = await getStoredDays();
    const storedDayIndex = storedDays.storedDays.findIndex((element) => element.day === dayDate);
    const storedDay = storedDays.storedDays[storedDayIndex];

    const dayContainer = document.getElementById(`day-container-${storedDayIndex}`);
    const totalVisitCounterCollection = dayContainer.getElementsByClassName("total-visit-count");
    const beltHostListContainerCollection = dayContainer.getElementsByClassName("belt-host-list-container");
    const beltHostListContainer = beltHostListContainerCollection[0];

    beltHostListContainer.innerHTML = null;

    const data = await prepareData(storedDay.hostList);

    const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data;

    const sortingOption = await getSortingOptions();

    if (sortingOption === 'sortByName') {
            
        sortByNameList.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(beltHostListContainer, hostName, visitCount, logo, storedDay.day, updateTabCount)
            
        });
    } else {

        sortByVisitCount.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            generateListElement(beltHostListContainer, hostName, visitCount, logo, storedDay.day, updateTabCount)
            
        });
    }

    totalVisitCounterCollection[0].innerHTML = `<p>Total Visit : ${totalVisit || 0}</p>`;
}

const updateTabCount = async (dayDate) => {
    const storedDays = await getStoredDays();
    const storedDayIndex = storedDays.storedDays.findIndex((element) => element.day === dayDate);
    
    const dayContainer = document.getElementById(`day-container-${storedDayIndex}`);
    const totalVisitCounterCollection = dayContainer.getElementsByClassName("total-visit-count");

    const data = await prepareData(storedDays.storedDays[storedDayIndex].hostList);

    const [,, totalVisit ] = data;

    totalVisitCounterCollection[0].innerHTML = `<p>Total Visit : ${totalVisit || 0}</p>`;

}





