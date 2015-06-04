(function() {
  if (window.location.href.search('reddit') !== -1) {
    function parsePage() {
      var trackDatas = $('p.title').map(function(i, t) {
        var text = $(t).text();
        var replaced = text.replace(/\(.*\)/g, '')
                           .replace(/\[.*\]/g, '')
                           .trim();
        var parts = replaced.split('-');
        if (parts.length == 2) {
          return {
            'trackName': parts[1].trim(),
            'artistName': parts[0].trim()
          }
        }
        return {};
      }).filter(function(i, trackData) {
        return trackData['trackName'] !== undefined
      });

      var dateStr = new Date().toISOString().replace('T.*', '');
      var pageStr = window.location.href.replace(/.*\/r\//, 'r/');
      var playlistName = pageStr + ' - ' + dateStr;
      return {
        'trackDatas': trackDatas,
        'playlistName': playlistName
      }
    }

    Globals.parsePage = parsePage;
  }
})();