var fs = require('fs');
var path = require('path');

module.exports = function (option, cb) {

  if (!this.liveReloadPort) {
    return cb();
  }

  var defaultEnable = option.defaultEnable;
  var placeholder = option.placeholder;
  var liveReloadScripts = [];
  var clientTpl = fs.readFileSync(path.join(__dirname, './client.tpl'), {
    encoding: 'utf8'
  });

  clientTpl = clientTpl.replace(
    '__ENABLE_CONDITION__',
    defaultEnable ? '!/livereload\\=false/i.test(location.href)' : '/livereload\\=true/i.test(location.href)'
  );

  liveReloadScripts.push('<script>');
  liveReloadScripts.push('window.__miaowLiveReloadPort__ = ' + this.liveReloadPort + ';');
  liveReloadScripts.push('window.__miaowLiveReloadSrcPath__ = "' + this.srcPath + '";');
  liveReloadScripts.push('window.__miaowLiveReloadTime__ = ' + new Date().getTime() + ';');
  liveReloadScripts.push(clientTpl);
  liveReloadScripts.push('</script>');

  liveReloadScripts = liveReloadScripts.join('\n');

  if (placeholder) {
    this.contents = new Buffer(this.contents.toString().replace(placeholder, liveReloadScripts));
  } else {
    this.contents = new Buffer(this.contents.toString() + '\n' + liveReloadScripts);
  }

  cb();
};
