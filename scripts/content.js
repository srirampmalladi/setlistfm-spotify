(function() {
  var artistLabel = $('span.label').filter(function () {
    return $(this).text() === 'Artist';
  });
  var artistName = $(artistLabel.siblings()[0]).find('span').text();
  console.log('artist', artistName);

  // Loads uris for given list of track names and calls the callback with an array
  function loadTrackUris(trackNames, callback) {
    console.log('trackNames', trackNames);
    var total = trackNames.length;
    var trackUris = new Array(trackNames.length);
    var completed = 0;

    function doSearch(index, trackName) {
      var uri = "http://api.spotify.com/v1/search";
      $.ajax(uri, {
        data: {
          'q': 'artist:"' + artistName + '"+' + 'track:"' + trackName + '"',
          'type': 'track'
        },
        success: function (data) {
          console.log(data);
          var items = data.tracks.items;
          trackUris[index] = items.length > 0 ? items[0].uri : "";
        },
        error: console.log,
        complete: function() { complete(index); }
      });
    }

    function complete(index) {
      if (trackUris[index] === undefined) {
        trackUris[index] = "";
      }
      completed++;
      console.log('Finished ' + completed + '/' + total);
      if (total === completed) {
        callback(trackUris);
      }
    }

    trackNames.each(doSearch);
  }

  // Makes a playlist from list of uris
  function makePlaylist(trackUris) {
    console.log('trackUris', trackUris);
  }

  var trackNames = $('.songLabel').map(function(i, el) { return $(el).text(); });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request == "makePlaylistNow") {
        loadTrackUris(trackNames, makePlaylist);
      }
    });
})();

