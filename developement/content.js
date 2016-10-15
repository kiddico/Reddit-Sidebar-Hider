//sends message to event page to reload
function reloadTheCurrentTab(){
	chrome.runtime.sendMessage({message: "reload"}, function(response) {
		console.log(response.farewell);
	});
}
//gets rid of saved data from the local storage
function clear(){
	chrome.storage.local.remove(["preference"]);
	console.log("cleared");
}
//used later to store the contents of the sidebar
var sidebarcontents;
////////// Initial Setup
//Look in the local storage for the preference value
//action taken depends on state of return
chrome.storage.local.get(["preference"],function(returned)
	{
		var orig = {};
		orig = returned["preference"];
		orig = parseInt(orig);
		if(orig == 2){
			//just chill.
		}
		if(orig == 1){
			var sidebar = document.querySelector('.side');
			sidebarcontents = sidebar.innerHTML;
			sidebar.innerHTML = '';
			var wikimargin = document.querySelector('.wiki-page-content');
			wikimargin.style.marginRight=0;
			console.log("removed sidebar");
		}
		else{
			var dataobj = {};
			dataobj["preference"] = 2;
			chrome.storage.local.set(dataobj);
		}
	}
);
//Toggle button action
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//if the message is actually for us
		if( request.message === "toggle_button_press" ) {
			//first look at preference
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
					var wikimargin = document.querySelector('.wiki-page-content');
					if(sidebarcontents != {}){
						sidebar.innerHTML = sidebarcontents;
						wikimargin.style.marginRight=0;
					}
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
					var wikimargin = document.querySelector('.wiki-page-content');
					wikimargin.style.marginRight=0;
					console.log("sidebar hidden");
				}
			});
		}
	}
);
