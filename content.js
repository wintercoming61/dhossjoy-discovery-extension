chrome.storage.local.get("discoveredList", ({ discoveredList }) => {
	discoveredList = discoveredList || [];

	const regpattern = /dho\/discovery\/([0-9]+)$/

	document.querySelectorAll("a").forEach(anchor => {
		// let match = anchor.href?.match(regpattern) ?? null
		let href = anchor.getAttribute('href')
		if (href == null) return
		let match = href.match(regpattern)

		if (match != null) {
			console.log('match not null')
			console.log(anchor.href)
			console.log(anchor)
			console.log(match)
			let discoveryid = match[1]
			if (discoveredList.includes(discoveryid)) {

				// ignore when pagination anchor
				let p = anchor.closest('div.pagination')
				if (p) {
					return
				}
				// anchor.style.color = 'green'
				anchor.classList.add('discovered')
			}
			else {
				// anchor.style.color = 'red'
				anchor.classList.add('undiscovered')
			}
		}

	});
});
