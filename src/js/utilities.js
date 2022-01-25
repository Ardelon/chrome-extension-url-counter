export const openInNewTab = (url) => {
    window.open(url, '_blank').focus();
}

export const scrapeInformationFromUrl = (fullUrl) => {
    const url = new URL(fullUrl);
    return [fullUrl, url.protocol, url.hostname, url.pathname, url.search]
};

export const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
    // Use with filter to make an array unique

    // var a = ['a', 1, 'a', 2, '1'];
    // var unique = a.filter(onlyUnique);
}

