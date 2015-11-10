//listens for our message from background.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//if the json is actually for us
		if( request.message === "clicked_browser_action" ) {
			//this is the actual stuff. it won't be here later.
			//later this will be a toggle
			//and the preffered state is saved
			var sidebar = document.querySelector('.side');
			sidebar.innerHTML = '';
			console.log("removed sidebar");
		}
	}
);
