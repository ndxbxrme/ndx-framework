(function() {
  'use strict';
  var accessToken, data, getData, getToken, read, splitLine, superagent;

  superagent = require('superagent');

  read = require('read');

  data = {
    state: 'command',
    command: '',
    username: '',
    password: '',
    host: ''
  };

  splitLine = function(line) {
    if (line) {
      return line.match(/[\w:\/@\.]+|"(?:\\"|[^"])+"/g);
    }
  };

  accessToken = null;

  getToken = function(cb) {
    var authCode;
    if (accessToken) {
      return cb(null, accessToken);
    } else {
      if (data.host && data.username && data.password) {
        if (!/^http/.test(data.host)) {
          data.host = "http://" + data.host;
        }
        if (/\/$/.test(data.host)) {
          data.host = data.host.replace(/\/$/, '');
        }
        authCode = new Buffer(data.username + ":" + data.password).toString('base64');
        return superagent.post(data.host + "/auth/token").set('Authorization', 'Basic ' + authCode).send().end(function(err, response) {
          if (!err) {
            accessToken = response.body.accessToken;
          }
          return cb((accessToken ? null : 'bad login'), accessToken);
        });
      } else {
        accessToken = null;
        return cb('incomplete details', null);
      }
    }
  };

  getData = function(args, callback) {
    if (args.name) {
      if (data[args.name]) {
        return callback(null, data[args.name]);
      }
    }
    return read({
      prompt: args.prompt || '>>',
      silent: /password/i.test(args.name)
    }, function(err, input) {
      if (args.name) {
        data[args.name] = input;
      }
      return callback(null, input);
    });
  };

  module.exports = {
    data: data,
    splitLine: splitLine,
    accessToken: accessToken,
    getToken: getToken,
    getData: getData
  };

}).call(this);

//# sourceMappingURL=ndx.js.map
