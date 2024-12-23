document.getElementById("uploadFile").addEventListener("change", async event => {
	const file = event.target.files[0];
	const text = await file.text();
	const values = text.split("\n").map(line => line.trim()).filter(Boolean);
	chrome.storage.local.set({ discoveredList: values });
});

document.getElementById("downloadFile").addEventListener("click", () => {
	chrome.storage.local.get("discoveredList", ({ discoveredList }) => {
		const blob = new Blob([discoveredList.join("\n")], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "discovered_list.txt";
		a.click();
		URL.revokeObjectURL(url);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get('discoveredList', function (result) {
		console.log(result)
		if (result?.discoveredList != null) {
			console.log('Discovered List:', result.discoveredList);

			document.getElementById('discovery-count').textContent  = result.discoveredList.length
		} else {
			console.log('Discovered List is empty or not found.');
		}
	});
});
