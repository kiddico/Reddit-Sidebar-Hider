

//okay. so this will have to listen for a message 
//if it's the right one it reloads the page
chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(sender.tab ?
					"from a content script:" + sender.tab.url :
					"from the extension");
			if (request.message == "reload")
				//first get the active tab
				chrome.tabs.query({active:true,currentWindow:true},function(tabs)
					{
						var activetab = tabs[0];
						chrome.tabs.reload(activetab.id);
					}
				);
				sendResponse({farewell: "Page Reloading!"});
});

//not sure if on startup is for the browser, or just when you hit a page
/*
chrome.runtime.onStartup.addListener(function(){
	console.log("startup");
});
*/


