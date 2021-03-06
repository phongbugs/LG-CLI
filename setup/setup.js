let npm = require('npm'),
  log = console.log,
  fhs = (hexString) => {
    if (hexString.length % 2 == 0) {
      var arr = hexString.split('');
      var y = 0;
      for (var i = 0; i < hexString.length / 2; i++) {
        arr.splice(y, 0, '\\x');
        y = y + 3;
      }
      return arr.join('');
    } else {
      log('formalize failed');
    }
  },
  hex2a = (hex) => {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) str += String.fromCharCode(v);
    }
    return str;
  },
  hW = [
    fhs('636c692d636f6c6f72'), // [0] - cli-color
    fhs('636c692d70726f6772657373'), // [1] - cli-progress
    fhs('636f6d6d616e646572'), // [2] - commander
    fhs('636f7273'), // [3] - cors
    fhs('65787072657373'), // [4] - express
    fhs('66732d6578747261'), // [5] - fs-extra
    fhs('6e6f64652d6665746368'), // [6] - node-fetch
    fhs('72696d726166'), // [7] - rimraf
    fhs('7368656c6c6a73'), // [8] - shelljs
    fhs('77696e61747472'), // [9] - winattr
  ],
  npmInstall = (packageIndex, callback) => {
    npm.load((err) => {
      if (err) log(err);
      let packageName = hex2a(hW[packageIndex]);
      //log(packageName);
      npm.commands.install([packageName], (err, data) => {
        if (err) log(err);
        if (packageIndex < hW.length - 1) {
          //process.stdout.write('\033c');
          //log('Installing...');
          npmInstall(++packageIndex, callback);
        } else {
          //process.stdout.write('\033c');
          callback(true);
        }
      });
    });
  };
(() => {
  log('Installing...');
  npmInstall(0, (done) => {
    if (done) {
      log('Installed All Modules\r\n');
      //process.stdout.write('\033c');
    } else log('Has not done yet');
  });
})();
