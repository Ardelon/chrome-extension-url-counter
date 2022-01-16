const getSortingOptions = async () => {
    
    const options = await chrome.storage.local.get("options");
    const sortBy = options.options.sortBy;
    return sortBy || 'sortByName'
}

const setSortingOptions = async (sortValue) => {
    const options = await chrome.storage.local.get("options")

    if (options && options.options) {
        console.log('set if');
        options.options.sortBy = sortValue;
        chrome.storage.local.set({"options" : options.options})
    } else {
        console.log('set else');
        chrome.storage.local.set({"options" : {sortBy : 'sortByName'}})
    }
}