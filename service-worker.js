// Service Worker for Image Search Options Chrome Extension

async function getStorageValue(key, defaultValue = null) {
	const result = await chrome.storage.local.get(key);
	return result[key] !== undefined ? result[key] : defaultValue;
}

async function setStorageValue(key, value) {
	return chrome.storage.local.set({ [key]: value });
}

async function createMenu() {
	const menuItems = [
		"SauceNAO", "IQDB", "TinEye", "Google", 
		"Other1", "Other2", "Other3", "Other4", "Other5", "Other6", "Multi"
	];
	
	// Clear existing menu items
	await chrome.contextMenus.removeAll();
	
	for (let i = 0; i < menuItems.length; i++) {
		const item = menuItems[i];
		const enabled = await getStorageValue(item + "-Enabled", "0");
		if (enabled === "1") {
			const name = await getStorageValue(item + "-Name", item + " Search");
			chrome.contextMenus.create({
				"title": name,
				"id": item,
				"contexts": ["image"]
			});
		}
	}
}

async function doSearch(info, tab) {
	const src = info.srcUrl;

	if (src.indexOf('data:') === 0) {
		// incompatible
		console.warn("Not Yet Compatible With Data URIs");
		return;
	}

	if (info.menuItemId === "Multi") {
		const menuItems = [
			"SauceNAO", "IQDB", "TinEye", "Google",
			"Other1", "Other2", "Other3", "Other4", "Other5", "Other6"
		];
		
		const loadLocation = await getStorageValue("loadLocation", "1");
		
		for (let i = 0; i < menuItems.length; i++) {
			const item = menuItems[i];
			const multiEnabled = await getStorageValue(item + "-Multi", "0");
			if (multiEnabled === "1") {
				const url = await getStorageValue(item + "-URL", "");
				const searchUrl = url + encodeURIComponent(src);
				chrome.tabs.create({ 
					url: searchUrl, 
					active: loadLocation === "1" 
				});
			}
		}
	} else {
		const url = await getStorageValue(info.menuItemId + "-URL", "");
		const searchUrl = url + encodeURIComponent(src);
		const loadLocation = await getStorageValue("loadLocation", "1");
		
		chrome.tabs.create({ 
			url: searchUrl, 
			active: loadLocation === "1" 
		});
	}
	return true;
}

async function initialize() {
	// Set default values if they don't exist
	const defaults = {
		"loadLocation": "1",
		
		"SauceNAO-Enabled": "1",
		"SauceNAO-Multi": "1",
		"SauceNAO-Name": "SauceNAO Search",
		"SauceNAO-URL": "https://saucenao.com/search.php?db=999&url=",
		
		"IQDB-Enabled": "1",
		"IQDB-Multi": "1",
		"IQDB-Name": "IQDB Search",
		"IQDB-URL": "https://iqdb.org/?url=",
		
		"TinEye-Enabled": "1",
		"TinEye-Multi": "1",
		"TinEye-Name": "TinEye Search",
		"TinEye-URL": "https://tineye.com/search/?url=",
		
		"Google-Enabled": "1",
		"Google-Multi": "1",
		"Google-Name": "Google Search",
		"Google-URL": "https://lens.google.com/uploadbyurl?url=",
		
		"Other1-Enabled": "0",
		"Other1-Multi": "0",
		"Other1-Name": "Other Search 1",
		"Other1-URL": "https://other-site-1",
		
		"Other2-Enabled": "0",
		"Other2-Multi": "0",
		"Other2-Name": "Other Search 2",
		"Other2-URL": "https://other-site-2",
		
		"Other3-Enabled": "0",
		"Other3-Multi": "0",
		"Other3-Name": "Other Search 3",
		"Other3-URL": "https://other-site-3",
		
		"Other4-Enabled": "0",
		"Other4-Multi": "0",
		"Other4-Name": "Other Search 4",
		"Other4-URL": "https://other-site-4",
		
		"Other5-Enabled": "0",
		"Other5-Multi": "0",
		"Other5-Name": "Other Search 5",
		"Other5-URL": "https://other-site-5",
		
		"Other6-Enabled": "0",
		"Other6-Multi": "0",
		"Other6-Name": "Other Search 6",
		"Other6-URL": "https://other-site-6",
		
		"Multi-Enabled": "1",
		"Multi-Name": "ALL"
	};
	
	// Check and set defaults for any missing values
	for (const [key, value] of Object.entries(defaults)) {
		const existing = await getStorageValue(key);
		if (existing === null) {
			await setStorageValue(key, value);
		}
	}
	
	// Create the context menu
	await createMenu();
}

// Event listeners
chrome.runtime.onInstalled.addListener(initialize);
chrome.runtime.onStartup.addListener(initialize);
chrome.contextMenus.onClicked.addListener(doSearch);

// Handle messages from options page
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.action === 'recreateMenus') {
		await createMenu();
		sendResponse({ success: true });
	}
});

// Export createMenu function for use by options page
globalThis.createMenu = createMenu; 