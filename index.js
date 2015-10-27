var fs = require('fs');
var path = require('path');

var pkg = require('./package.json');

module.exports = function(options, callback) {
  var context = this;

  if (!context.liveReloadPort) {
    return callback();
  }

  var defaultEnable = options.defaultEnable;
  var placeholder = options.placeholder;
  var liveReloadScripts = [];
  var clientTpl = fs.readFileSync(path.join(__dirname, './client.tpl'), {
    encoding: 'utf8'
  });

  clientTpl = clientTpl.replace(
    '__ENABLE_CONDITION__',
    defaultEnable ? '!/livereload\\=false/i.test(location.href)' : '/livereload\\=true/i.test(location.href)'
  );

  liveReloadScripts.push('<script>');
  liveReloadScripts.push('window.__miaowLiveReloadPort__ = ' + context.liveReloadPort + ';');
  liveReloadScripts.push('window.__miaowLiveReloadSrcPath__ = "' + context.srcPath + '";');
  liveReloadScripts.push('window.__miaowLiveReloadTime__ = ' + context.startTime.getTime() + ';');
  liveReloadScripts.push(clientTpl);
  liveReloadScripts.push('</script>');

  liveReloadScripts = liveReloadScripts.join('\n');

  if (placeholder) {
    context.contents = new Buffer(context.contents.toString().replace(placeholder, liveReloadScripts));
  } else {
    context.contents = new Buffer(context.contents.toString() + '\n' + liveReloadScripts);
  }

  callback();
};

module.exports.toString = function() {
  return [pkg.name, pkg.version].join('@');
};
