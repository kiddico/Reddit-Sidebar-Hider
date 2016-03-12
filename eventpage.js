

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

// working but silly implementation

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({active:true , currentWindow:true},function(tabs){
		var activeTab=tabs[0];
		chrome.tabs.sendMessage(activeTab.id,{"message":"toggle_button_press"});
	});
});


/*
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.local.get(["preference"],function(result){
		var pref = {};
		var dataobj = {};
		pref = result;
		//convert pref to int so I can actually test against properly
		var pref = parseInt(pref["preference"]);
		if(pref == 1){
			dataobj["preference"] = 2;
			chrome.storage.local.set(dataobj);
			var sidebar = document.querySelector('.side');
			if(sidebarcontents != {})
				sidebar.innerHTML = sidebarcontents;
			else
				reloadCurrentTab();
			console.log("sidebar revealed");
		}
		else{
			dataobj["preference"] = 1;
			chrome.storage.local.set(dataobj);
			var sidebar = document.querySelector('.side');
			sidebarcontents = sidebar.innerHTML;
			sidebar.innerHTML = '';
			console.log("sidebar hidden");
		}
	});
});
*/

