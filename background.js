

const discoveryUrlPattern = /dho\/discovery\/([0-9]+)$/
function isToggleTargetUrl(url) {
	/**
	 * check if given url should be target of discovery toggling
	 */
	if (url == null) return false
	let match = url.match(discoveryUrlPattern)
	if (match != null) {
		return true
	}
	return false;

}


async function markAsDiscovered(linkUrl) {


	async function fetchDiscoveredList() {
		let result = await chrome.storage.local.get('discoveredList')

		if (result?.discoveredList != null) {
			return result.discoveredList
		}
		return null;

	}

	async function addToDiscoveredList(newId) {
		let dl = await fetchDiscoveredList()

		if (dl == null && newId != null) {
			await saveDiscoveredList([newId])
		}
		if (dl.includes(newId)) {
			return
		}
		else {
			if (newId != null) {
				dl.push(newId)
				await saveDiscoveredList(dl)

			}
			else {
				return
			}
		}

	}

	async function removeFromDiscoveredList(removeItem) {

		let dl = await fetchDiscoveredList()
		if (dl == null) {
			return
		}
		dl = dl.filter(x => x !== removeItem)
		saveDiscoveredList(dl)
	}

	async function saveDiscoveredList(newlist) {
		if (newlist != null) {
			await chrome.storage.local.set({ discoveredList: newlist });
		}
	}


	const discoveryUrlPattern = /dho\/discovery\/([0-9]+)$/
	function getDiscoveryIdFromUrl(url) {
		let match = url.match(discoveryUrlPattern)
		if (match != null) {
			return match[1]
		}
		return null
	}


	function is_url_discovery_url_maching_discovery_id(url, discoveryid) {

		let url_discovery_id = getDiscoveryIdFromUrl(url)
		if (url_discovery_id === discoveryid) {
			return true
		}
		return false
	}

	let discoveryid = getDiscoveryIdFromUrl(linkUrl)
	if (discoveryid == null) return
	await addToDiscoveredList(discoveryid)


	let anchorArr = document.querySelectorAll('a')
	anchorArr = Array.from(anchorArr).filter(x => {
		let href = x.getAttribute('href')
		if (href == null) return false
		return is_url_discovery_url_maching_discovery_id(href, discoveryid)

	}).forEach(a => {
		a.classList.remove('undiscovered')
		a.classList.add('discovered')
	})


}



async function markAsUndiscovered(linkUrl) {

	async function fetchDiscoveredList() {
		let result = await chrome.storage.local.get('discoveredList')

		if (result?.discoveredList != null) {
			return result.discoveredList
		}
		return null;

	}

	async function addToDiscoveredList(newId) {
		let dl = await fetchDiscoveredList()

		if (dl == null && newId != null) {
			await saveDiscoveredList([newId])
		}
		if (dl.includes(newId)) {
			return
		}
		else {
			if (newId != null) {
				dl.push(newId)
				await saveDiscoveredList(dl)

			}
			else {
				return
			}
		}

	}

	async function removeFromDiscoveredList(removeItem) {

		let dl = await fetchDiscoveredList()
		if (dl == null) {
			return
		}
		dl = dl.filter(x => x !== removeItem)
		saveDiscoveredList(dl)
	}

	async function saveDiscoveredList(newlist) {
		if (newlist != null) {
			await chrome.storage.local.set({ discoveredList: newlist });
		}
	}


	const discoveryUrlPattern = /dho\/discovery\/([0-9]+)$/
	function getDiscoveryIdFromUrl(url) {
		let match = url.match(discoveryUrlPattern)
		if (match != null) {
			return match[1]
		}
		return null
	}


	function is_url_discovery_url_maching_discovery_id(url, discoveryid) {

		let url_discovery_id = getDiscoveryIdFromUrl(url)
		if (url_discovery_id === discoveryid) {
			return true
		}
		return false
	}

	let discoveryid = getDiscoveryIdFromUrl(linkUrl)
	if (discoveryid == null) return
	await removeFromDiscoveredList(discoveryid)


	let anchorArr = document.querySelectorAll('a')
	anchorArr = Array.from(anchorArr).filter(x => {
		let href = x.getAttribute('href')
		if (href == null) return false
		return is_url_discovery_url_maching_discovery_id(href, discoveryid)

	}).forEach(a => {
		a.classList.remove('discovered')
		a.classList.add('undiscovered')
	})


}

function toggleAnchorState(linkUrl) {
	const anchor = document.querySelector(`a[href="${linkUrl}"]`);
	if (anchor) {
		anchor.classList.toggle("discovered");
		anchor.style.color = anchor.classList.contains("discovered") ? "green" : "red";
	}
}

function fetchDiscoveredList() {

	chrome.storage.local.get('discoveredList', function (result) {
		if (result?.discoveredList != null) {
			return result.discoveredList
		}
		return null;
	});

}

function addToDiscoveredList(newId) {
	let dl = fetchDiscoveredList()
	if (!dl.includes(newId)) {
		return
	}
	else {
		if (newId != null) {
			dl.push(newId)
			saveDiscoveredList(dl)

		}
		else {
			return
		}
	}

}

function removeFromDiscoveredList(removeItem) {

	let dl = fetchDiscoveredList()
	dl = dl.filter(x => x !== removeItem)
	saveDiscoveredList(dl)
}

function saveDiscoveredList(newlist) {
	if (newlist != null) {
		chrome.storage.local.set({ discoveredList: newlist });
	}
}

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "markDiscovered",
		title: "Mark as Discovered",
		contexts: ["link"]
	});


	chrome.contextMenus.create({
		id: "markUndiscovered",
		title: "Mark as Undiscovered",
		contexts: ["link"]
	});
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "markDiscovered" && info.linkUrl) {
		if (isToggleTargetUrl(info.linkUrl)) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: markAsDiscovered,
				args: [info.linkUrl]
			});
		}
	}

	if (info.menuItemId === 'markUndiscovered' && info.linkUrl) {
		if (isToggleTargetUrl(info.linkUrl)) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: markAsUndiscovered,
				args: [info.linkUrl]
			});
		}
	}
});
