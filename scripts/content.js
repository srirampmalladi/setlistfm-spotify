(function() {
  var artistLabel = $('span.label').filter(function () {
    return $(this).text() === 'Artist';
  });
  var artistName = $(artistLabel.siblings()[0]).find('span').text();
  var trackNames = $('.songLabel').map(function(i, el) { return $(el).text(); });

  var trackUris = null;
  var acessToken = null;
  var userId = 'srirampmalladi';

  function uriCallback(uris) {
    trackUris = uris;
    if (acessToken != null) {
      Globals.createPlaylist(acessToken, trackUris);
    }
  }

  function authCallback(token) {
    acessToken = token;
    if (trackUris != null) {
      Globals.createPlaylist(acessToken, trackUris, artistName + ' concert');
    }
  }

  function makePlaylist() {
    Globals.loadTrackUris(trackNames, artistName, uriCallback);
    Globals.getAccessToken(authCallback);
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request == "makePlaylistNow") {
        makePlaylist();
      }
    });
})();

