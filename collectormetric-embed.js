// author: Paul Deardorff (themetric)
// https://github.com/collectormetric/collectormetric-embed
// version 1.0
(function(jQuery) {

  jQuery.fn.collectormetric = function() {
    $ = jQuery;
    return this.each(function() {
      var $elem = $(this),
        username,
        id,
        url,
        data = {};

      // make block level so loading text shows properly
      $elem.css('display', 'block');

      $elem.addClass('cm-card').addClass('item-card');

      id = $elem.data('collectormetric-id') || '';
      username = $elem.data('collectormetric-username') || '';

      // if the username or id don't exist, then ignore
      if (!id || !username) return false;

      url = 'http://collectormetric.com/' + username + '/' + id;

      // add the stylesheet if it does not exist
      var stylesheet = "https://collectormetric.github.io/collectormetric-embed/collectormetric-card.css"
      if ($('link[href="' + stylesheet + '"]').length === 0) {
        linkTag = document.createElement('link');
        head = document.getElementsByTagName('head')[0];

        linkTag.type = 'text/css';
        linkTag.rel = 'stylesheet';
        linkTag.href = stylesheet;
        head.insertBefore(linkTag, head.firstChild);
      }

      // loading
      $elem.html('Loading from CollectorMetric.com...');

      // request the json version of this collectormetric item sharing
      $.ajax({
        url: url + ".json",
        data: data,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(response) {
          if (response) {
            $elem.html('').append("<div class=\"header\"><a class=\"avatar\" target=\"_blank\" href=\"http://collectormetric.com/" + response.username + "\"><img src=\"" + response.avatar + "\"></a><a href=\"" + url + "\"><strong class=\"title\">" + response.title + "</strong></a><span class=\"name\">Item from <a href=\"http://collectormetric.com/" + response.username + "\">" + response.username + "</a></div>" + 
              "<div class=\"content\"><img src=\"" + response.images[0]["normal"] + "\"></div><div class=\"footer\"><a href=\"http://collectormetric.com\">:: CollectorMetric.com ::</a></div>");
          } else {
            $elem.html('Failed loading CollectorMetric item ' + url);
          }
        },
        error: function(jqXHR, textStatus) {
          $elem.html('Failed loading CollectorMetric item ' + url + ': ' + textStatus + '.  Did the item ID change?');
        }
      });

    });
  };

  $(function() {
    // find all elements containing "data-collectormetric-id" attribute.
    $('[data-collectormetric-id]').collectormetric();
  });

})(jQuery);