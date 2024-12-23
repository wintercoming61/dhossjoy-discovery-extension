chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggleAnchor",
    title: "Mark as Discovered/Undiscovered",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "toggleAnchor" && info.linkUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleAnchorState,
      args: [info.linkUrl]
    });
  }
});

function toggleAnchorState(linkUrl) {
  const anchor = document.querySelector(`a[href="${linkUrl}"]`);
  if (anchor) {
    anchor.classList.toggle("discovered");
    anchor.style.color = anchor.classList.contains("discovered") ? "green" : "red";
  }
}



// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId === "toggleDiscovered") {
//     // Get the element using scripting
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: tab.id },
//         func: checkClassAndChangeMenu,
//       },
//       (results) => {
//         const element = results[0].result; // Right-clicked element
//         const isDiscovered = element.classList.contains("discovered");

//         // Change the menu text based on the element class
//         const newText = isDiscovered ? "Mark as undiscovered" : "Mark as discovered";
//         chrome.contextMenus.update("toggleDiscovered", {
//           title: newText,
//         });
        
//         // Handle logic for discovered/undiscovered
//         if (isDiscovered) {
//           element.classList.remove("discovered");
//         } else {
//           element.classList.add("discovered");
//         }
//       }
//     );
//   }
// });

// function checkClassAndChangeMenu() {
//   const element = document.querySelector(":hover"); // Get the element under the mouse
//   return element; // Return the element to the background script
// }
