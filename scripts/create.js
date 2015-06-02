(function() {
  function createPlaylist(accessToken, trackUris, playlistName) {
    console.log('accessToken', accessToken);
    console.log('trackUris', trackUris);

    // Add tracks to playlist given username and playlist id
    function addTracks(username, playlistId) {
      var url = 'https://api.spotify.com/v1/users/' + username +
        '/playlists/' + playlistId +
        '/tracks';
      $.ajax(url, {
        method: 'POST',
        processData: false,
        data: JSON.stringify(trackUris),
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        success: function (response) {
          console.log('add tracks response', response);
        },
        error: function (err) {
          console.log('error creating playlist', err);
        }
      });

    }

    // Create a new playlist for given username
    // and callback with playlist id
    function newPlaylist(username, callback) {
      var url = 'https://api.spotify.com/v1/users/' + username + '/playlists';
      $.ajax(url, {
        method: 'POST',
        processData: false,
        data: JSON.stringify({
          'name': playlistName,
          'public': false
        }),
        dataType: 'json',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        success: function (response) {
          console.log('create response', response);
          callback(response.id);
        },
        error: function (err) {
          console.log('error creating playlist', err);
        }
      });
    }

    // Get username of the auth'd user and callback with it
    function getUsername(callback) {
      var url = 'https://api.spotify.com/v1/me';
      $.ajax(url, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        contentType: 'application/json',
        success: function (response) {
          console.log('get username response', response);
          callback(response.id);
        },
        error: function (err) {
          console.log('error creating playlist', err);
        }
      });
    }

    getUsername(function(username) {
      newPlaylist(username, function(playlistId) {
        addTracks(username, playlistId);
      })
    });
  }

  Globals.createPlaylist = createPlaylist;
})();