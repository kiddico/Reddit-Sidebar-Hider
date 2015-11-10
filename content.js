//changes preference in local storage
function flipflop(){
	console.log("in flip flop");
	chrome.storage.local.get(["preference"],function(result){
		var pref = {};
		pref = result.preference;
		var dataobj = {};
		//logic to flipflop preference
		if(pref == 1)
			dataobj["preference"] = 0;
		else
			dataobj["preference"] = 1;
		//put in new value
		chrome.storage.local.set(dataobj);
	});
};

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
		//I suppose I can put everything in the callback.
		if(orig == {}){
			console.log("This is in the first orig check");
			var dataobj = {};
			dataobj["preference"] = 0;
			chrome.storage.local.set(dataobj);
		}
		if(orig == 1){
			console.log("This is in the second orig check");
			var sidebar = document.querySelector('.side');
			sidebar.innerHTML = '';
			console.log("removed sidebar");
		}
		//if the result was 0 then we do nothing
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
				pref = result["preference"];
				if(pref = 1){
					flipflop();
					console.log("before reload");
					//reload page. hopefully this time with the sidebar back
				}
				else{
					flipflop();
					var sidebar = document.querySelector('.side');
					sidebar.innerHTML = '';
					console.log("removed sidebar");
				}
			});

			//console.log("pref:" + pref);

		}
	}
);


