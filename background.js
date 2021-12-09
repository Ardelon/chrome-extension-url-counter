let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);;
})

// chrome.tabs.onCreated.addListener((e) => {
//     fetch('http://localhost:3000')
   
// })

chrome.tabs.onUpdated.addListener((e) => {
    fetch('http://localhost:3000', {
        method : 'POST',
        body : {e}
    })
   
})

const callback = (e) => {
    fetch('http://localhost:3000', {
        method : 'POST',
        body : {e}
    })
}
chrome.tabs.onActivated.addListener(callback)