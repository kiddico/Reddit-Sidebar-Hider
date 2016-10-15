// Sends a message from the button in the toolbar to the content script to 
//   handle the logic. You can't just change the page here, because this 
//   particular type of script can't get permission to access local storage.
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({active:true , currentWindow:true},function(tabs){
		var activeTab=tabs[0];
		chrome.tabs.sendMessage(activeTab.id,{"message":"toggle_button_press"});
	});
});
