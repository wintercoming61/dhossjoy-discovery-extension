

const discoveryUrlPattern = /dho\/discovery\/([0-9]+)$/
function isToggleTargetUrl(url) {
	if (url == null) return false
	let match = url.match(discoveryUrlPattern)
	if (match != null) {
		return true
	}
	return false;

}

// function getDiscoveryIdFromUrl(url) {
// 	let match = url.match(discoveryUrlPattern)
// 	if (match != null) {
// 		return match[1]
// 	}
// 	return null
// }


async function markAsDiscovered(linkUrl) {


	async function fetchDiscoveredList() {
		let result = await chrome.storage.local.get('discoveredList')

		console.log(result)
		if (result?.discoveredList != null) {
			return result.discoveredList
		}
		return null;

	}

	async function addToDiscoveredList(newId) {
		let dl = await fetchDiscoveredList()
		console.log(`fetched dl: ${dl}`)
		if (dl.includes(newId)) {
			return
		}
		else {
			if (newId != null) {
				dl.push(newId)
				console.log(`pushed dl: ${dl}`)
				await saveDiscoveredList(dl)

			}
			else {
				return
			}
		}

	}

	async function removeFromDiscoveredList(removeItem) {

		let dl = await fetchDiscoveredList()
		console.log(dl)
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


	function normalizeUrl(url) {
		console.log(url)
		const parsedUrl = new URL(url);  // Parse the URL using the URL constructor

		// Normalize the path: remove trailing slash if it's the only path component
		if (parsedUrl.pathname !== '/' && parsedUrl.pathname.endsWith('/')) {
			parsedUrl.pathname = parsedUrl.pathname.slice(0, -1);  // Remove trailing slash
		}

		// Sort query parameters alphabetically by key to ensure consistent ordering
		const searchParams = new URLSearchParams(parsedUrl.search);
		const sortedParams = new URLSearchParams();
		[...searchParams.entries()].sort().forEach(([key, value]) => sortedParams.append(key, value));
		parsedUrl.search = sortedParams.toString();

		// Optionally remove fragment (hash)
		parsedUrl.hash = '';

		console.log(parsedUrl)

		// Return the normalized URL string
		return parsedUrl.toString();
	}

	function areUrlsEquivalent(url1, url2) {
		return normalizeUrl(url1) === normalizeUrl(url2);
	}



	let discoveryid = getDiscoveryIdFromUrl(linkUrl)
	console.log(`discovery id: ${discoveryid}`)
	await addToDiscoveredList(discoveryid)

	console.log('hello')


	// let anchorArr = document.querySelectorAll(`a[href="${linkUrl}"]`)
	let anchorArr = document.querySelectorAll('a')
	console.log(anchorArr)
	// an
	anchorArr = Array.from(anchorArr).filter(x => {
		let href = x.getAttribute('href')
		if (href == null) return false
		if (areUrlsEquivalent(href, linkUrl)) return true
		return false

	})
	console.log('anchor arr')
	console.log(anchorArr)
	anchorArr.forEach(a => {

		console.log('anchor:')
		console.log(a)
		// remove discovered class and add undiscovered class
		a.classList.remove('undiscovered')
		a.classList.add('discovered')
		// let cl = a.classList
		// if (cl.includes('undiscovered')) {
		// 	cl = cl.filter(x => x !== 'undiscovered')
		// 	// ad undiscovered
		// 	cl.push('discovered')
		// 	a.classList = cl
		// }

	})

	// reload page
	// window.location.reload()

}



async function markAsUndiscovered(linkUrl) {


	async function fetchDiscoveredList() {
		let result = await chrome.storage.local.get('discoveredList')

		console.log(result)
		if (result?.discoveredList != null) {
			return result.discoveredList
		}
		return null;

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

	async function removeFromDiscoveredList(removeItem) {

		let dl = await fetchDiscoveredList()
		console.log(dl)
		if (dl == null) {
			return
		}
		dl = dl.filter(x => x !== removeItem)
		saveDiscoveredList(dl)
	}

	function saveDiscoveredList(newlist) {
		if (newlist != null) {
			chrome.storage.local.set({ discoveredList: newlist });
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


	let discoveryid = getDiscoveryIdFromUrl(linkUrl)
	await removeFromDiscoveredList(discoveryid)

	let anchorArr = document.querySelectorAll(`a[href="${linkUrl}"]`)
	anchorArr.forEach(a => {
		// remove discovered class and add undiscovered class
		let cl = a.classList
		if (cl.includes('discovered')) {
			cl = cl.filter(x => x !== 'discovered')
			// ad undiscovered
			cl.push('undiscovered')
			a.classList = cl
		}

	})

	// window.location.reload()

}

function toggleAnchorState(linkUrl) {
	console.log('inside toggleAnchorState')
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
