const openInNewTab = (url) => {
    window.open(url, '_blank').focus();
}

const scrapeInformationFromUrl = (fullUrl) => {
    const url = new URL(fullUrl);
    return [fullUrl, url.protocol, url.hostname, url.pathname, url.search]
};