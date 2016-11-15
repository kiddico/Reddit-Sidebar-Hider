// Sends a message from the button in the toolbar to the content script to 
//   handle the logic. You can't just change the page here, because this 
//   particular type of script can't get permission to access local storage.

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({active:true , currentWindow:true},function(tabs){
		var activeTab=tabs[0];
		chrome.tabs.sendMessage(activeTab.id,{"message":"toggle_button_press"});
	});
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse ) {
	// read `newIconPath` from request and read `tab.id` from sender
	var icon_1 = chrome.extension.getURL('images/rev.png'); 
	var icon_2 = chrome.extension.getURL('images/hid.png');
	if ( request.icon == 1 )
		chrome.browserAction.setIcon( { path: icon_1, tabId: sender.tab.id } );
	if ( request.icon == 2 )
		chrome.browserAction.setIcon( { path: icon_2, tabId: sender.tab.id } );
});
