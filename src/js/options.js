import '../style/options.scss';

import {renderSlider} from './generateSlider';
import {getSortingOptions, setSortingOptions} from './manageOptions';
import {
    getBlackList,
    setBlackList,
} from './manageInfo';

//#region Elements


const sortByHeader = document.getElementById("sort-by-header");
const sortBySwitch = document.getElementById("sort-by-switch-input");
const sortBySwitchSpan = document.getElementById("sort-by-switch-span");

const blackListContainer = document.getElementById("black-list-container");
const blackListList = document.getElementById("black-list-list");
const hostNameInput = document.getElementById("host-name-input");
const addBlackListButton = document.getElementById("add-black-list-button");

const inputPlaceholder = "Write a link"


//#endregion

//#region Option Handlers 
    const displayOptions = async () => {

        await sortingOptionDisplay();
        optionsHandlerImplementation();
        hostNameInput.innerText = inputPlaceholder
         
    }

    const sortingOptionDisplay = async () => {
        
        const sortingOption = await getSortingOptions();

        if (sortingOption === 'sortByName') {
            sortByHeader.innerHTML = `<p>Sort By Name</p>`;
        } else {
            sortByHeader.innerHTML = `<p>Sort By Visit Count</p>`;
            sortBySwitch.checked = true
        }
    }

    const optionsHandlerImplementation = async () => {

        sortBySwitch.addEventListener('change', async (e) => {
        
            e.preventDefault();
            if (!sortBySwitch.checked) {
                setSortingOptions('sortByName');
                sortByHeader.innerHTML = `<p>Sort By Name</p>`;
            } else {
                setSortingOptions('sortByVisitCount')
                sortByHeader.innerHTML = `<p>Sort By Visit Count</p>`;
            } 
    
            //TODO Update Data Here
            renderSlider();
    
            sortBySwitch.removeEventListener('click', (e) => {
                e.preventDefault()
            });
        });

        hostNameInput.addEventListener('focusin', (e) => {
            e.preventDefault();
            if (hostNameInput.innerText === inputPlaceholder) {
                hostNameInput.innerText = "";
            } 
            hostNameInput.removeEventListener('focusin', (e) => {
                e.preventDefault();
            });
        });
        
        hostNameInput.addEventListener('focusout', (e) => {
            e.preventDefault();
            if (hostNameInput.innerText === "") {
                hostNameInput.innerText = inputPlaceholder
            }
            hostNameInput.removeEventListener('focusout', (e) => {
                e.preventDefault();
            });
        });

        addBlackListButton.addEventListener('click', (e) => {
            e.preventDefault();
            const hostName = hostNameInput.innerText;
            if (hostName.length && hostName !== inputPlaceholder) {
                setBlackList(hostName)
            }
          
        })
    }

    const generateBlackListElement = async (hostName) => {

        const blackListElement = document.createElement('div');
        blackListElement.classList.add("black-list-element");

        const blackListElementHostName = document.createElement("h2") ;
        blackListElementHostName.innerText = hostName;
        blackListElementHostName.classList.add("black-list-element-host-name");

        const removeFromBlackListButton = document.createElement("div");
        removeFromBlackListButton.innerHTML = "<h3>Remove</h3>"
        removeFromBlackListButton.classList.add("remove-from-black-list-button");
        removeFromBlackListButton.addEventListener('click', (e) => {
            e.preventDefault();
            setBlackList(hostName, "remove");
            blackListElement.remove();

            removeFromBlackListButton.removeEventListener('click', (e) => {
                e.preventDefault();
                setBlackList(hostName, "remove");
                blackListElement.remove();
            });
        });

        blackListElement.appendChild(blackListElementHostName);
        blackListElement.appendChild(removeFromBlackListButton);
        return blackListElement;
    }

    const displayBlackListElements = async () => {
        const blackList = await getBlackList();

        if (blackList && blackList.blackList && blackList.blackList.length) {
            blackList.blackList.forEach(async (hostName) => {
                const generatedElement = await generateBlackListElement(hostName);
                blackListList.appendChild(generatedElement);
            });
        }
    }


//#endregion

// renderDataHandler();
displayOptions();
displayBlackListElements();
renderSlider();
