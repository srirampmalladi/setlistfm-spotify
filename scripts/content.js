(function() {
  var artistLabel = $('span.label').filter(function () {
    return $(this).text() === 'Artist';
  });
  var artistName = $(artistLabel.siblings()[0]).find('span').text();
  var trackNames = $('.songLabel').map(function(i, el) { return $(el).text(); });

  function makePlaylist() {
    var trackUris = Globals.loadTrackUris(trackNames, artistName, makePlaylist);
    console.log('trackUris', trackUris);
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request == "makePlaylistNow") {
        makePlaylist();
      }
    });
})();

