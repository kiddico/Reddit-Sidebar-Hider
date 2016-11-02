//sends message to event page to reload
function reloadTheCurrentTab(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
	});
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
			chrome.runtime.sendMessage({ "icon" : 1 });
			//just chill.
		}
		if(orig == 1){
			var sidebar = document.querySelector('.side');
			sidebarcontents = sidebar.innerHTML;
			sidebar.innerHTML = '';
			var wikimargin = document.querySelector('.wiki-page-content');
			wikimargin.style.marginRight=0;
			console.log("removed sidebar");
			chrome.runtime.sendMessage({ "icon" : 2 });
		}
		else{
			var dataobj = {};
			dataobj["preference"] = 2;
			chrome.runtime.sendMessage({ "icon" : 1 });
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
					if(sidebarcontents != {}){
						sidebar.innerHTML = sidebarcontents;
						chrome.runtime.sendMessage({ "icon" : 1 });
					}
					else {
						reloadCurrentTab();
						chrome.runtime.sendMessage({ "icon" : 1 });
					}
					console.log("sidebar revealed");
				}
				else{
					dataobj["preference"] = 1;
					chrome.storage.local.set(dataobj);
					var sidebar = document.querySelector('.side');
					sidebarcontents = sidebar.innerHTML;
					sidebar.innerHTML = '';
					var wikimargin = document.querySelector('.wiki-page-content');
					console.log(wikimargin);
					if ( wikimargin != null ){
						wikimargin.style.marginRight=0;
					}
					console.log("sidebar hidden");
					chrome.runtime.sendMessage({ "icon" : 2 });
				}
			});
		}
	}
);
