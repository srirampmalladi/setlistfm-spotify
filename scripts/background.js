chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'www.setlist.fm/setlist' }
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ])
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "makePlaylistNow", function(response) {
      console.log(response.farewell);
    });
  });
});

(function() {
  function callback(details) {
    var url = details.url;
    if (url.search('#') === -1) {
      return { 'cancel': true }
    }
    var params = url.split('#')[1];
    var parts = params.split('&');
    var redirectUrl;
    for(var i = 0; i < parts.length; i++) {
      var split = parts[i].split('=');
      if (split[0] == 'state') {
        redirectUrl = split[1];
      }
      if (split[0] == 'access_token') {
        var accessToken = split[1];
      }
    }

    if (redirectUrl === undefined) {
      return { 'cancel': true };
    } else {
      var redirectUrl = decodeURIComponent(redirectUrl);
      if (redirectUrl.search('\\?') === -1) {
        redirectUrl += '?'
      } else {
        redirectUrl += '&'
      }
      redirectUrl += 'setlistify=true';
      return { 'redirectUrl': redirectUrl };
    }
  }
  var filter = {urls: ['http://www.setlistify.com/*'], types: ["main_frame"]};
  chrome.webRequest.onBeforeRequest.addListener(callback, filter, ['blocking']);
})();
