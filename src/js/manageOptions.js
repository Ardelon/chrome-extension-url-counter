export const getSortingOptions = async () => {
    
    const options = await chrome.storage.local.get("options");
    if (options.options) {

        const sortBy = options.options.sortBy;
        return sortBy || 'sortByName'
    } else {
        return 'sortByName';
    }
}

export const setSortingOptions = async (sortValue) => {
    const options = await chrome.storage.local.get("options")

    if (options && options.options) {
        options.options.sortBy = sortValue;
        chrome.storage.local.set({"options" : options.options})
    } else {
        chrome.storage.local.set({"options" : {sortBy : 'sortByName'}})
    }
}