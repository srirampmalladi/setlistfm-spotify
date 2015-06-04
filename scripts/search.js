(function () {
  // Given an array of trackData objects (containing trackName and artistName)
  // searches on the spotify api and gets the track uris
  // calls the callback with an array of uris
  function loadTrackUris(trackDatas, callback) {
    var total = trackDatas.length;
    var trackUris = new Array(trackDatas.length);
    var completed = 0;

    function doSearch(index, trackData) {
      var url = "http://api.spotify.com/v1/search";
      var artistName = trackData['artistName'];
      var trackName = trackData['trackName'];
      $.ajax(url, {
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
        callback(trackUris.filter(function(trackUri) {
          return trackUri !== undefined && trackUri.length != 0;
        }));
      }
    }

    trackDatas.each(doSearch);
  }

  Globals.loadTrackUris = loadTrackUris;
})();