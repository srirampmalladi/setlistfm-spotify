(function() {
  var trackDatas;
  var playlistName;

  var trackUris = null;
  var acessToken = null;

  function uriCallback(uris) {
    trackUris = uris;
    console.log(uris);
    if (acessToken != null) {
      Globals.createPlaylist(acessToken, trackUris);
    }
  }

  function authCallback(token) {
    acessToken = token;
    if (trackUris != null) {
      Globals.createPlaylist(acessToken, trackUris, playlistName);
    }
  }

  function makePlaylist() {
    alert('Making playlist...');
    var parseData = Globals.parsePage();
    trackDatas = parseData['trackDatas'];
    playlistName = parseData['playlistName'];
    Globals.loadTrackUris(trackDatas, uriCallback);
    Globals.getAccessToken(authCallback);
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request == "makePlaylistNow") {
        makePlaylist();
      }
    });

  if (window.location.href.search('setlistify') !== -1) {
    setTimeout(makePlaylist, 2000);
  }
})();

