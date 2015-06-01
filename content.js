function load() {
  var artistLabel = $('span.label').filter(function() {
      return $(this).text() === 'Artist';
  });
  var artist = $(artistLabel.siblings()[0]).find('span').text()
  console.log('artist', artist);
  var total = 0
  var num = 0
  var dict = {}

  function finish() {
      if(total === num) {
          console.log(dict)    
      } else {
          console.log('not done')
      }
      
  }

  function find(seq, artist, title) {
      console.log(seq + artist + title);
      $.ajax("http://ws.spotify.com/search/1/track.json", {
          data: {
              'q': title + ' AND ' + artist
          },
          success: function(data) {
              for(var i=0;i<data.tracks.length;i++) {
                  track = data.tracks[i]
                  if (track.name === title && track.artists[0].name === artist ) {
                      num++
                      dict[seq] = track.href
                      break;
                 }
              }
              finish();
          }
      });
  }

  var i = 0;
  var titles = []

  total = $('.songLabel').length
  $('.songLabel').each(function(index, element) {
      find(index, artist, $(element).text());
  });
}
console.log('loaded file');
load();

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//  console.log('loaded message', message, sender, sendResponse);
//  load();
//});

