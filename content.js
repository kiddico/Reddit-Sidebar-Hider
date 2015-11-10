//changes preference in local storage
//this takes too long, or can just cause weird stuff to happen
//I got rid of it
function flipflop(){
	chrome.storage.local.get(["preference"],function(result){
		var pref = {};
		pref = result.preference;
		pref = parseInt(pref);
		var dataobj = {};
		//logic to flipflop preference
		if(pref == "1")
			dataobj["preference"] = 0;
		else
			dataobj["preference"] = 1;
		//put in new value
		chrome.storage.local.set(dataobj);
	});
};

//sends message to event page to reload
function reloadTheCurrentTab(){
	console.log("in reload func");
	chrome.runtime.sendMessage({message: "reload"}, function(response) {
		console.log(response.farewell);
	});
}

//gets rid of saved data
//if you want to cause yourself a lot of trouble just call it in random places
function clear(){
	chrome.storage.local.remove(["preference"]);
	console.log("cleared");
}

var sidebarcontents;

////////// Initial Setup
//Look in the local storage for the preference value
//action taken depends on state of return
chrome.storage.local.get(["preference"],function(returned)
	{
		var orig = {};
		orig = returned["preference"];
		orig = parseInt(orig);
		//I suppose I can put everything in the callback.
		if(orig == 2){
			//just chill.
		}
		if(orig == 1){
			var sidebar = document.querySelector('.side');
			sidebarcontents = sidebar.innerHTML;
			sidebar.innerHTML = '';
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
					sidebar.innerHTML = sidebarcontents;
				}
				else{
					dataobj["preference"] = 1;
					chrome.storage.local.set(dataobj);
					var sidebar = document.querySelector('.side');
					sidebarcontents = sidebar.innerHTML;
					sidebar.innerHTML = '';
					console.log("removed sidebar");
				}
			});
		}
	}
);
