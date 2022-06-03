import { getStoredDays } from "./manageInfo";

export const openInNewTab = (url) => {
	window.open(url, "_blank").focus();
};

export const scrapeInformationFromUrl = (fullUrl) => {
	const url = new URL(fullUrl);
	return [fullUrl, url.protocol, url.hostname, url.pathname, url.search];
};

export const onlyUnique = (value, index, self) => {
	return self.indexOf(value) === index;
	// Use with filter to make an array unique

	// var a = ['a', 1, 'a', 2, '1'];
	// var unique = a.filter(onlyUnique);
};

export const exportFormat = async (format) => {
	const storedDays = await getStoredDays();


	if (format === "json") {

		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storedDays));
		var a = document.createElement("a");
		a.setAttribute("href",     dataStr     );
		a.setAttribute("download", "scene.json");
		a.click();

	}

	// if (format === "csv") {

	//     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storedDays));
	//     var a = document.createElement('a');
	//     a.setAttribute("href",     dataStr     );
	//     a.setAttribute("download", "scene.json");
	//     a.click();

	// }

	// if (format === "excel") {

	//     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storedDays));
	//     var a = document.createElement('a');
	//     a.setAttribute("href",     dataStr     );
	//     a.setAttribute("download", "scene.json");
	//     a.click();

	// }
};

