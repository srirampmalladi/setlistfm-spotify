(function() {
  function getValue(labelName) {
    var label = $('span.label').filter(function () {
      return $(this).text() === labelName;
    });
    return $(label.siblings()[0]).find('span').text();
  }

  var artistName;
  var trackNames;
  var playlistName;

  function parsePage() {
    artistName = getValue('Artist');
    trackNames = $('.songLabel').map(function (i, el) {
      return $(el).text();
    });

    var venueName = getValue('Venue');
    var month = $('.dateBlock .m').text();
    var day = $('.dateBlock .d').text();
    var year = $('.dateBlock .y').text();
    var date = new Date(month + " " + day + ", " + year);
    var formattedDate = date.toISOString().split('T')[0];

    playlistName = artistName + " at " + venueName + ", " + formattedDate;
  }

  var trackUris = null;
  var acessToken = null;


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
    alert('Making playlist...');
    parsePage();
    Globals.loadTrackUris(trackNames, artistName, uriCallback);
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

