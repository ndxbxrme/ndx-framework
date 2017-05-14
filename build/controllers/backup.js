(function() {
  'use strict';
  var chalk, getBackupList, inquirer, ndx, superagent;

  ndx = require('../ndx.js');

  superagent = require('superagent');

  inquirer = require('inquirer');

  chalk = require('chalk');

  getBackupList = function(token, cb) {
    return superagent.get(ndx.data.host + "/api/backup/list").set('Authorization', "Bearer " + token).accept('text/json').send().end(function(err, response) {
      var backup, d, i, j, len, list, num, ref;
      list = [];
      if (!err && response.body) {
        ref = response.body;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          backup = ref[i];
          num = backup.match(/\d+/)[0];
          d = new Date(+num);
          list.push({
            date: (d.toDateString()) + " " + (d.toLocaleTimeString().replace(/^(\d):/, '0$1:')),
            file: backup
          });
        }
      }
      return typeof cb === "function" ? cb(err, list) : void 0;
    });
  };

  module.exports = {
    keywords: ['subcommand'],
    exec: function(cb) {
      return ndx.getToken(function(err, token) {
        if (!err) {
          switch (ndx.data.subcommand) {
            case 'list':
              return getBackupList(token, function(err, list) {
                var backup, j, len;
                if (list && list.length) {
                  for (j = 0, len = list.length; j < len; j++) {
                    backup = list[j];
                    console.log(backup.date);
                  }
                }
                return typeof cb === "function" ? cb(err, '') : void 0;
              });
            case 'restore':
              return getBackupList(token, function(err, list) {
                var choices;
                choices = list.map(function(backup) {
                  return backup.date;
                });
                choices.push('None');
                return inquirer.prompt([
                  {
                    type: 'list',
                    name: 'date',
                    message: 'choose a file to restore',
                    choices: choices
                  }
                ]).then(function(answers) {
                  var backup, j, len, selectedBackup;
                  if (answers.date) {
                    selectedBackup = null;
                    for (j = 0, len = list.length; j < len; j++) {
                      backup = list[j];
                      if (backup.date === answers.date) {
                        selectedBackup = backup;
                        break;
                      }
                    }
                    if (selectedBackup) {
                      return superagent.post(ndx.data.host + "/api/backup/restore").set('Authorization', "Bearer " + token).send({
                        fileName: selectedBackup.file
                      }).end(function(err, response) {
                        if (!response.error) {
                          console.log(chalk.green.bold("\nbackup successfully restored\n"));
                        } else {
                          console.log(response.error);
                        }
                        return typeof cb === "function" ? cb(null, '') : void 0;
                      });
                    } else {
                      return typeof cb === "function" ? cb(null, '') : void 0;
                    }
                  } else {
                    return typeof cb === "function" ? cb('nothing selected', '') : void 0;
                  }
                });
              });
          }
        } else {
          return typeof cb === "function" ? cb('not logged in') : void 0;
        }
      });
    },
    cleanup: function(cb) {
      ndx.data.subcommand = null;
      return typeof cb === "function" ? cb(null) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=backup.js.map
