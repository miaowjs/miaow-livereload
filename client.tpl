(function () {
  window.__miaowLiveReload__ = function () {
    if (window.__miaowLiveReloadLock__) {
      return;
    }

    window.__miaowLiveReloadLock__ = true;

    var hostname = location.hostname || '127.0.0.1';

    function ws () {
      var client = new WebSocket(
        'ws://' +
        hostname +
        ':' +
        window.__miaowLiveReloadPort__ +
        '/livereload'
      );
      client.onopen = function (event) {
        client.send(JSON.stringify({
          src: window.__miaowLiveReloadSrc__,
          timestamp: window.__miaowLiveReloadTime__
        }));
      };

      client.onmessage = function (event) {
        var msg = JSON.parse(event.data);

        if (msg.isExpire) {
          client.close();
          location.reload(true);
        }
      };
    }

    function polling () {
      var scriptEl = document.createElement('script');

      var headEl = document.getElementsByTagName('head')[0];
      headEl.appendChild(scriptEl);

      var callbackName = '__miaowLiveReloadCallback'+ new Date().getTime() +'__';
      window[callbackName] = function (isExpire) {
        if (isExpire) {
          location.reload(true);
        } else {
          headEl.removeChild(scriptEl);
          window.setTimeout(polling, 1e3);
        }
      };

      var url = 'http://' + hostname + ':' + window.__miaowLiveReloadPort__ + '/livereload';
      url += '?src=' + encodeURIComponent(window.__miaowLiveReloadSrc__);
      url += '&timestamp=' + window.__miaowLiveReloadTime__;
      url += '&callback=' + callbackName;
      url += '&cache=' + new Date().getTime();

      scriptEl.src = url;
    }

    if (window.WebSocket) {
      ws();
    } else {
      polling();
    }

  };

  if (__ENABLE_CONDITION__) {
    window.__miaowLiveReloadTime && window.clearTimeout(window.__miaowLiveReloadTime);
    window.__miaowLiveReloadTime = window.setTimeout(window.__miaowLiveReload__, 1e3);
  }
})();
