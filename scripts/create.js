(function() {
  function createPlaylist(authToken, trackUris) {
    console.log('authToken', authToken);
    console.log('trackUris', trackUris);
  }

  Globals.createPlaylist = createPlaylist;
})();