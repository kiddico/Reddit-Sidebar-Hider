chrome.browserAction.onClicked.addListener(function(a){chrome.tabs.query({active:!0,currentWindow:!0},function(a){var b=a[0];chrome.tabs.sendMessage(b.id,{message:"toggle_button_press"})})});
