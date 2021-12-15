const store = {
    day : "",
    sessionCount : 0,
    tabCount : 0,
    domainList : []
}

const setDay = () => {
    const date = Date.now();
    const today = new Date(date);

    const todayInString = `${today.getUTCFullYear()}/${today.getUTCMonth}/${today.getUTCDate()}`

    if (store.day !== todayInString) {
        store.day = todayInString;
        store.sessionCount = 1;
    }
};

