//changes preference in local storage
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

function clear(){
	chrome.storage.local.remove(["preference"]);
	console.log("cleared");
}


//Look in the local storage for the preference value
//action taken depends on state of return
chrome.storage.local.get(["preference"],function(returned)
	{
		var orig = {};
		orig = returned["preference"];
		console.log("Initial pref value :" + orig);
		orig = parseInt(orig);
		console.log("Initial pref value :" + orig);
		//I suppose I can put everything in the callback.
		if(orig == 2){
			//just chill.
		}
		if(orig == 1){
			console.log("This is in the second orig check");
			var sidebar = document.querySelector('.side');
			sidebar.innerHTML = '';
			console.log("removed sidebar");
		}
		else{
			console.log("This is in the last orig check");
			var dataobj = {};
			dataobj["preference"] = 2;
			chrome.storage.local.set(dataobj);
		}
		chrome.storage.local.get(["preference"],function(returner){
			console.log("store val after init" + returner["preference"]);
		});
	}
);


/*
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
*/
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//if the message is actually for us
		if( request.message === "toggle_button_press" ) {
			//first look at preference
			console.log("responce in content");
			chrome.storage.local.get(["preference"],function(result){
				var pref = {};
				var dataobj = {};
				pref = result;
				//convert pref to int so I can actually test against properly
				var pref = parseInt(pref["preference"]);
				if(pref == 1){
					//flipflop();
					//switched to this in case flipflop takes too long (it will)
					dataobj["preference"] = 2;
					chrome.storage.local.set(dataobj);
					console.log("before reload");
					reloadTheCurrentTab();
				}
				else{
					//flipflop();
					dataobj["preference"] = 1;
					chrome.storage.local.set(dataobj);
					var sidebar = document.querySelector('.side');
					sidebar.innerHTML = '';
					console.log("removed sidebar");
				}
			});

			//console.log("pref:" + pref);

		}
	}
);
