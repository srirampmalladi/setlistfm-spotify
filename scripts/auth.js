(function () {
  // Parses uri of the form:
  // "http://localhost/#access_token=foo&token_type=Bearer&expires_in=3600"
  // And returns access_token
  function parseRedirect(redirect) {
    var params = redirect.split('#')[1].split('&');
    for (var i = 0; i < params.length; i++) {
      var parts = params[i].split('=');
      if (parts[0] == 'access_token') {
        return parts[1];
      }
    }
  }

  // Calls the callback with an authtoken for the user
  function getAuthToken(callback) {
    var uri = 'https://accounts.spotify.com/authorize';
    $.ajax(uri, {
      data: {
        'client_id': '868f291804be438f93c51f60be977b40',
        'response_type': 'token',
        'redirect_uri': 'http://localhost',
        'scope': 'playlist-modify-private'
      },
      success: function(response) {
        console.log('auth response', response);
        var redirect = response.redirect;
        var token = parseRedirect(redirect);
        callback(token);
      },
      error: function(err) {
        console.log('error getting auth token', err);
      }
    });
  }

  Globals.getAuthToken = getAuthToken;
})();