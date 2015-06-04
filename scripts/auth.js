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

  var redirectUri = "http://www.setlistify.com";
  var authUrl = 'https://accounts.spotify.com/authorize' +
    '?client_id=868f291804be438f93c51f60be977b40' +
    '&response_type=token' +
    '&redirect_uri=' + redirectUri +
    '&state=' + encodeURIComponent(window.location.href) +
    '&scope=playlist-modify-private';

  console.log(authUrl);
  // Pops up a log in page and lets the user login
  // TODO: call the callback with the access token after the user logs in.
  // Right now the user has to go back to the original page and click the button again
  function popupLogin(callback) {
    window.location.href = authUrl;
  }

  // Calls the callback with the access token for the user
  function getAccessToken(callback) {
    $.ajax(authUrl, {
      success: function(response, foo) {
        console.log('auth response', response, foo);
        var redirect = response.redirect;
        if (redirect !== undefined) {
          var token = parseRedirect(redirect);
          callback(token);
        } else {
          popupLogin(callback)
        }
      },
      error: function(err) {
        console.log('error getting auth token', err);
      }
    });
  }

  Globals.getAccessToken = getAccessToken;
})();