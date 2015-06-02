(function() {
  var artistLabel = $('span.label').filter(function () {
    return $(this).text() === 'Artist';
  });
  var artistName = $(artistLabel.siblings()[0]).find('span').text();
  var trackNames = $('.songLabel').map(function(i, el) { return $(el).text(); });

  var trackUris = null;
  var authToken = null;

  function uriCallback(uris) {
    trackUris = uris;
    if (authToken != null) {
      Globals.createPlaylist(authToken, trackUris);
    }
  }

  function authCallback(token) {
    authToken = token;
    if (trackUris != null) {
      Globals.createPlaylist(authToken, trackUris);
    }
  }

  function makePlaylist() {
    //Globals.loadTrackUris(trackNames, artistName, uriCallback);
    uriCallback("");
    Globals.getAuthToken(authCallback);
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request == "makePlaylistNow") {
        makePlaylist();
      }
    });
})();

