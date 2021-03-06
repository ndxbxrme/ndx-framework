(function() {
  'use strict';
  var chalk, ndx;

  ndx = require('../ndx.js');

  chalk = require('chalk');

  module.exports = {
    keywords: [],
    exec: function(cb) {
      console.log('');
      console.log(chalk.yellow.bold('Available commands'));
      console.log('login');
      console.log('connect');
      console.log('backup list');
      console.log('backup restore');
      console.log('password');
      console.log('database');
      console.log('token');
      console.log('revoke');
      console.log('memory');
      console.log('exit');
      console.log('');
      return typeof cb === "function" ? cb(null) : void 0;
    },
    cleanup: function(cb) {
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=help.js.map
