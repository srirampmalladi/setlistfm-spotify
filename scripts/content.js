(function() {
  function getValue(labelName) {
    var label = $('span.label').filter(function () {
      return $(this).text() === labelName;
    });
    return $(label.siblings()[0]).find('span').text();
  }

  var artistName = getValue('Artist');
  var venueName = getValue('Venue');
  var trackNames = $('.songLabel').map(function(i, el) { return $(el).text(); });

  var month = $('.dateBlock .m').text();
  var day = $('.dateBlock .d').text();
  var year = $('.dateBlock .y').text();
  var dateStr = month + " " + day + ", " + year;
  var date = new Date(month + " " + day + ", " + year);
  var formattedDate = date.toISOString().split('T')[0];

  var playlistName = artistName + " at " + venueName + ", " + formattedDate;

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
      Globals.createPlaylist(acessToken, trackUris, playlistName);
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

