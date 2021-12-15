const urlCounterDateKey = "url-counter-date-key";
const sessionCountKey = "session-count";
const tabListKey = "tab-list-key";

const setDay = () => {
    const date = Date.now();
    const today = new Date(date);

    const todayInString = `${today.getUTCFullYear()}/${today.getUTCMonth}/${today.getUTCDate()}`

    const savedDate = localStorage.getItem(urlCounterDateKey);
    if (savedDate !== todayInString) {
        localStorage.setItem(urlCounterDateKey, todayInString);
        setSessionCount();
    }
};

const setSessionCount = (count = 0) => {
    localStorage.setItem(sessionCountKey, count );
}

const getSessionCount = () => {
    return localStorage.getItem(sessionCount);
}

const setTabList = (tabList) => {
    localStorage.setItem(tabListKey, JSON.stringify(tabList));
};

const getTabList = () => {
    return JSON.parse(localStorage.getItem(tabListKey));
};

const addTab = (tabModel) => {

    const {tabId} = tabModel;
    const tabKey = prepareTabKey(tabId);
    const tabList = getTabList();
    
    if(!tabList.includes(tabKey)) {
        tabList.push(tabKey);
    };
    
    setTab(tabModel);
    setTabList(tabList);
};

const setTab = (tabModel) => {
    const {tabId} = tabModel;
    const tabKey = prepareTabKey(tabId)
    const tabState = JSON.parse(localStorage.getItem(tabKey));
    localStorage.setItem(tabKey, JSON.stringify(tabModel, ...tabState));
}

const getTab = (tabId) => {

    const tabKey = prepareTabKey(tabId);
    return JSON.parse(localStorage.getItem(tabKey));
}

const prepareTabKey = (tabId) => {
    return `${getSessionCount()}-session${tabId}-id`;
}