chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.executeScript(null, {"file": "bundle.js"});
});
chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.type === "p-b"){
        // ensure message gets to your content script by
        // targeting the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "b-c", msg:request.msg });
        });
    }
});