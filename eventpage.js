
/*
//this background task sends a json to the current tab that just says we pressed the button
chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the active tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		//var defaultpref = false;
		//var prefobj["preference"] = defaultpref;
		//console.log(prefobj);
		//chrome.storage.local.set(prefobj);
		
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
	});
});
*/

chrome.runtime.onStartup.addListener(function(){
	console.log("startup");
});


chrome.runtime.onInstalled.addListener(function("install"){};){
	console.log("in the install bit");
	var inital = false;
	var dataobj = {};
	dataobj["preference"] = initial;
	//chrome.storage.local.set(initial);
	console.log("after install bit");
};

function removebar(){
	//chrome.tabs.query();
}
