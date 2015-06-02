(function () {
  // Given an array of track names and an artist name
  // searches on the spotify api and gets the track uris
  // calls the callback with an array of uris
  function loadTrackUris(trackNames, artistName, callback) {
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
        complete: function () {
          complete(index);
        }
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

  Globals.loadTrackUris = loadTrackUris;
})();