(function() {
  if (window.location.href.search('setlist') !== -1) {
    function getValue(labelName) {
      var label = $('span.label').filter(function () {
        return $(this).text() === labelName;
      });
      return $(label.siblings()[0]).find('span').text();
    }

    function parsePage() {
      var artistName = getValue('Artist');
      var trackNames = $('.songLabel').map(function (i, el) {
        return $(el).text();
      });

      var venueName = getValue('Venue');
      var month = $('.dateBlock .m').text();
      var day = $('.dateBlock .d').text();
      var year = $('.dateBlock .y').text();
      var date = new Date(month + " " + day + ", " + year);
      var formattedDate = date.toISOString().split('T')[0];

      var playlistName = artistName + " at " + venueName + ", " + formattedDate;

      var trackDatas = trackNames.map(function(i, trackName) {
        return {
          'trackName': trackName,
          'artistName': artistName
        }
      });
      return {
        'trackDatas': trackDatas,
        'playlistName': playlistName
      }
    }

    Globals.parsePage = parsePage;
  }
})();