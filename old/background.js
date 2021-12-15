
const store = [];

chrome.tabs.onUpdated.addListener(async (e) => {

    const currentTab = await getCurrentTab();
    const allTabs = getAllTabs();
    const model = {
        tabId : currentTab.id,
        url : currentTab.url
    }
    addTab(model);

    fetch('http://localhost:3000', {
        method : 'POST',
        body : JSON.stringify({store}),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
          })
    })

   
})

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  async function getAllTabs() {

    const allTabs = await chrome.tabs.query({});
    return allTabs;
}
