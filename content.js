//gets the list of elements with a class name of side
//it's an array brah

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
			var sidebar = document.querySelector('.side');
			sidebar.innerHTML = '';
			console.log("removed sidebar");
		}
	}
);
