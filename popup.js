//listens for button press 
/*
document.addEventListener('DOMContentLoaded',function(){
	//get the button we want to keep an eye on
	console.log("yolo");
	var checkpagebutton = document.getElementById("togglesidebar");
	console.log(checkpagebutton);
	//if said button is pressed send a message over to the content page
	checkpagebutton.addEventListener('click',function(){
		chrome.tabs.query([active:true,currentWindows:true],function(tabs){
				var activeTab = tabs[0];
				chrome.tabs.sendMessage(activeTab.id,{"message":"toggle_button_press"});
		});
	});
});
*/

document.addEventListener('DOMContentLoaded',function(){
	var button = document.getElementById('togglesidebar');
	button.addEventListener('click',function(){
		chrome.tabs.query({active:true , currentWindow:true},function(tabs){
			console.log(tabs);
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id,{"message":"toggle_button_press"});
			console.log("just sent messge");
		});//end of tab query
	});//end of button event
});//end of dom event
