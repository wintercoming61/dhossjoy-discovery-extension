chrome.storage.local.get("discoveredList", ({ discoveredList }) => {
	discoveredList = discoveredList || [];

	const regpattern = /dho\/discovery\/([0-9]+)$/

	document.querySelectorAll("a").forEach(anchor => {
		let href = anchor.getAttribute('href')
		if (href == null) return
		let match = href.match(regpattern)

		if (match != null) {
			let discoveryid = match[1]
			if (discoveredList.includes(discoveryid)) {

				// ignore when pagination anchor
				let p = anchor.closest('div.pagination')
				if (p) {
					return
				}
				anchor.classList.add('discovered')
			}
			else {
				anchor.classList.add('undiscovered')
			}
		}

	});
});
