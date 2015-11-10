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
