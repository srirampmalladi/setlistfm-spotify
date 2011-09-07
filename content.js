chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    alert('foo');
    
    sendResponse({});
});