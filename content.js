//changes preference in local storage
function flipflop(){
	var pref = {};
		chrome.storage.local.get(["preference"],function(result){
		pref = result.preference;
	});
	dataobj = {};
	if(pref == 1)
		dataobj["preference"] = 0;
	else
		dataobj["preference"] = 1;
	chrome.storage.local.set(dataobj);
};

var orig = {};
function lazy(whatever){
	orig=whatever["preference"];
	console.log(orig);
}
//Look in the local storage for the preference value
chrome.storage.local.get(["preference"],function(returned){
		//orig = returned["preference"];
		//console.log(orig);
		lazy(returned);//this is a call to my lazy function
					//cause idk how asyc or callbacks work
	}
);
console.log(orig);
//if there is no preference make one
if(orig == {}){
	var dataobj = {};
	//set preference to false
	dataobj["preference"] = 0;
	chrome.storage.local.set(dataobj);
}
//if the original value is set to true get rid of the sidebar
if(orig == 1){
	var sidebar = document.querySelector('.side');
	sidebar.innerHTML = '';
	console.log("removed sidebar");
}
//do nothing if orig was 0
console.log("after all"+orig);

/*
var dataobj = {};
dataobj["preference"] = 1;
chrome.storage.local.set(dataobj);
chrome.storage.local.get(["preference"],function(returned){
		console.log(returned);
	}
);
chrome.storage.local.remove(["preference"]);
console.log(
		chrome.storage.local.get(["preference"],function(returned){
			console.log(returned);
		}
	)
);
*/
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
		//if the json is actually for us
		if( request.message === "toggle_button_press" ) {
			//first look at preference
			var pref = {};
			chrome.storage.local.get(["preference"],function(result){
				pref = result.preference;
			});

			//console.log("pref:" + pref);
			if(pref = 1){
				flipflop();
				//reload page. hopefully this time with the sidebar back
			}
			else{
				flipflop();
				var sidebar = document.querySelector('.side');
				sidebar.innerHTML = '';
				console.log("removed sidebar");
			}
		}
	}
);


