(function() {
  'use strict';
  var chalk, ndx;

  ndx = require('../ndx');

  chalk = require('chalk');

  module.exports = {
    keywords: ['host', 'username', 'password'],
    exec: function(cb) {
      return ndx.getToken(function(err, token) {
        if (!err) {
          console.log(chalk.green.bold("\nsuccessfully connected to " + ndx.data.host + "\n"));
        }
        return typeof cb === "function" ? cb(err, null) : void 0;
      });
    },
    cleanup: function(cb) {
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=connect.js.map
