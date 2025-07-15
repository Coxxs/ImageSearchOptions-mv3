// Helper functions for storage
async function getStorageValue(key) {
	const result = await chrome.storage.local.get(key);
	return result[key];
}

async function setStorageValue(key, value) {
	return chrome.storage.local.set({ [key]: value });
}

// Saves options to chrome.storage.local
async function saveSettings() {
	const select = document.getElementById("loadLocation");
	await setStorageValue("loadLocation", select.children[select.selectedIndex].value);
	
	//SauceNAO
	let checkbox = document.getElementById("saucenao-enabled");
	await setStorageValue("SauceNAO-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("saucenao-multi");
	await setStorageValue("SauceNAO-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("SauceNAO-Name", document.getElementById("saucenao-name").value);
	await setStorageValue("SauceNAO-URL", document.getElementById("saucenao-url").value);
	
	//IQDB
	checkbox = document.getElementById("iqdb-enabled");
	await setStorageValue("IQDB-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("iqdb-multi");
	await setStorageValue("IQDB-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("IQDB-Name", document.getElementById("iqdb-name").value);
	await setStorageValue("IQDB-URL", document.getElementById("iqdb-url").value);
	
	//TinEye
	checkbox = document.getElementById("tineye-enabled");
	await setStorageValue("TinEye-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("tineye-multi");
	await setStorageValue("TinEye-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("TinEye-Name", document.getElementById("tineye-name").value);
	await setStorageValue("TinEye-URL", document.getElementById("tineye-url").value);
	
	//Google
	checkbox = document.getElementById("google-enabled");
	await setStorageValue("Google-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("google-multi");
	await setStorageValue("Google-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Google-Name", document.getElementById("google-name").value);
	await setStorageValue("Google-URL", document.getElementById("google-url").value);
	
	//Other1
	checkbox = document.getElementById("other1-enabled");
	await setStorageValue("Other1-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("other1-multi");
	await setStorageValue("Other1-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Other1-Name", document.getElementById("other1-name").value);
	await setStorageValue("Other1-URL", document.getElementById("other1-url").value);

	//Other2
	checkbox = document.getElementById("other2-enabled");
	await setStorageValue("Other2-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("other2-multi");
	await setStorageValue("Other2-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Other2-Name", document.getElementById("other2-name").value);
	await setStorageValue("Other2-URL", document.getElementById("other2-url").value);
	
	//Other3
	checkbox = document.getElementById("other3-enabled");
	await setStorageValue("Other3-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("other3-multi");
	await setStorageValue("Other3-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Other3-Name", document.getElementById("other3-name").value);
	await setStorageValue("Other3-URL", document.getElementById("other3-url").value);

	//Other4
	checkbox = document.getElementById("other4-enabled");
	await setStorageValue("Other4-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("other4-multi");
	await setStorageValue("Other4-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Other4-Name", document.getElementById("other4-name").value);
	await setStorageValue("Other4-URL", document.getElementById("other4-url").value);
	
	//Other5
	checkbox = document.getElementById("other5-enabled");
	await setStorageValue("Other5-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("other5-multi");
	await setStorageValue("Other5-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Other5-Name", document.getElementById("other5-name").value);
	await setStorageValue("Other5-URL", document.getElementById("other5-url").value);
	
	//Other6
	checkbox = document.getElementById("other6-enabled");
	await setStorageValue("Other6-Enabled", checkbox.checked ? "1" : "0");
	checkbox = document.getElementById("other6-multi");
	await setStorageValue("Other6-Multi", checkbox.checked ? "1" : "0");
	await setStorageValue("Other6-Name", document.getElementById("other6-name").value);
	await setStorageValue("Other6-URL", document.getElementById("other6-url").value);
	
	//Multi
	checkbox = document.getElementById("multi-enabled");
	await setStorageValue("Multi-Enabled", checkbox.checked ? "1" : "0");
	await setStorageValue("Multi-Name", document.getElementById("multi-name").value);
	
	// Send message to service worker to recreate context menus
	try {
		await chrome.runtime.sendMessage({ action: 'recreateMenus' });
	} catch (error) {
		console.log('Could not send message to service worker:', error);
		// Fallback: try to recreate menus directly if service worker is available
		if (chrome.contextMenus) {
			chrome.contextMenus.removeAll();
			// The service worker will handle recreation on next startup
		}
	}
	
	// Update status to let user know options were saved.
	const status = document.getElementById("status");
	status.innerHTML = "Changes Applied...";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

// Restores form values from chrome.storage.local
async function loadSettings() {
	//Load Location
	const select = document.getElementById("loadLocation");
	const loadLocation = await getStorageValue("loadLocation");
	for (let i = 0; i < select.children.length; i++) {
		const child = select.children[i];
		if (child.value === loadLocation) {
			child.selected = true;
			break;
		}
	}
	
	//SauceNAO
	let checkbox = document.getElementById("saucenao-enabled");
	checkbox.checked = await getStorageValue("SauceNAO-Enabled") === "1";
	checkbox = document.getElementById("saucenao-multi");
	checkbox.checked = await getStorageValue("SauceNAO-Multi") === "1";
	document.getElementById("saucenao-name").value = await getStorageValue("SauceNAO-Name");
	document.getElementById("saucenao-url").value = await getStorageValue("SauceNAO-URL");
	
	//IQDB
	checkbox = document.getElementById("iqdb-enabled");
	checkbox.checked = await getStorageValue("IQDB-Enabled") === "1";
	checkbox = document.getElementById("iqdb-multi");
	checkbox.checked = await getStorageValue("IQDB-Multi") === "1";
	document.getElementById("iqdb-name").value = await getStorageValue("IQDB-Name");
	document.getElementById("iqdb-url").value = await getStorageValue("IQDB-URL");
	
	//TinEye
	checkbox = document.getElementById("tineye-enabled");
	checkbox.checked = await getStorageValue("TinEye-Enabled") === "1";
	checkbox = document.getElementById("tineye-multi");
	checkbox.checked = await getStorageValue("TinEye-Multi") === "1";
	document.getElementById("tineye-name").value = await getStorageValue("TinEye-Name");
	document.getElementById("tineye-url").value = await getStorageValue("TinEye-URL");
	
	//Google
	checkbox = document.getElementById("google-enabled");
	checkbox.checked = await getStorageValue("Google-Enabled") === "1";
	checkbox = document.getElementById("google-multi");
	checkbox.checked = await getStorageValue("Google-Multi") === "1";
	document.getElementById("google-name").value = await getStorageValue("Google-Name");
	document.getElementById("google-url").value = await getStorageValue("Google-URL");
	
	//Other1
	checkbox = document.getElementById("other1-enabled");
	checkbox.checked = await getStorageValue("Other1-Enabled") === "1";
	checkbox = document.getElementById("other1-multi");
	checkbox.checked = await getStorageValue("Other1-Multi") === "1";
	document.getElementById("other1-name").value = await getStorageValue("Other1-Name");
	document.getElementById("other1-url").value = await getStorageValue("Other1-URL");

	//Other2
	checkbox = document.getElementById("other2-enabled");
	checkbox.checked = await getStorageValue("Other2-Enabled") === "1";
	checkbox = document.getElementById("other2-multi");
	checkbox.checked = await getStorageValue("Other2-Multi") === "1";
	document.getElementById("other2-name").value = await getStorageValue("Other2-Name");
	document.getElementById("other2-url").value = await getStorageValue("Other2-URL");
	
	//Other3
	checkbox = document.getElementById("other3-enabled");
	checkbox.checked = await getStorageValue("Other3-Enabled") === "1";
	checkbox = document.getElementById("other3-multi");
	checkbox.checked = await getStorageValue("Other3-Multi") === "1";
	document.getElementById("other3-name").value = await getStorageValue("Other3-Name");
	document.getElementById("other3-url").value = await getStorageValue("Other3-URL");

	//Other4
	checkbox = document.getElementById("other4-enabled");
	checkbox.checked = await getStorageValue("Other4-Enabled") === "1";
	checkbox = document.getElementById("other4-multi");
	checkbox.checked = await getStorageValue("Other4-Multi") === "1";
	document.getElementById("other4-name").value = await getStorageValue("Other4-Name");
	document.getElementById("other4-url").value = await getStorageValue("Other4-URL");
	
	//Other5
	checkbox = document.getElementById("other5-enabled");
	checkbox.checked = await getStorageValue("Other5-Enabled") === "1";
	checkbox = document.getElementById("other5-multi");
	checkbox.checked = await getStorageValue("Other5-Multi") === "1";
	document.getElementById("other5-name").value = await getStorageValue("Other5-Name");
	document.getElementById("other5-url").value = await getStorageValue("Other5-URL");
	
	//Other6
	checkbox = document.getElementById("other6-enabled");
	checkbox.checked = await getStorageValue("Other6-Enabled") === "1";
	checkbox = document.getElementById("other6-multi");
	checkbox.checked = await getStorageValue("Other6-Multi") === "1";
	document.getElementById("other6-name").value = await getStorageValue("Other6-Name");
	document.getElementById("other6-url").value = await getStorageValue("Other6-URL");
	
	//Multi
	checkbox = document.getElementById("multi-enabled");
	checkbox.checked = await getStorageValue("Multi-Enabled") === "1";
	document.getElementById("multi-name").value = await getStorageValue("Multi-Name");
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
	loadSettings();
	document.getElementById('saveSettings').addEventListener('click', saveSettings);
	document.getElementById('loadSettings').addEventListener('click', loadSettings);
});