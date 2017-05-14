#!/usr/bin/env node 

'use strict';
(function() {
  var async, backupCtrl, chalk, cli, connectCtrl, databaseCtrl, getCommand, helpCtrl, main, memoryCtrl, ndx, options, pack, pad, passwordCtrl, path, processCommand, readline, revokeCtrl, tokenCtrl;

  ndx = require('./ndx.js');

  readline = require('readline');

  chalk = require('chalk');

  async = require('async');

  cli = require('cli');

  path = require('path');

  options = cli.parse();

  pack = require('../package.json');

  connectCtrl = require('./controllers/connect.js');

  backupCtrl = require('./controllers/backup.js');

  passwordCtrl = require('./controllers/password.js');

  databaseCtrl = require('./controllers/database.js');

  memoryCtrl = require('./controllers/memory.js');

  tokenCtrl = require('./controllers/token.js');

  revokeCtrl = require('./controllers/revoke.js');

  helpCtrl = require('./controllers/help.js');

  getCommand = function(commandName) {
    switch (commandName) {
      case 'connect':
      case 'login':
        return connectCtrl;
      case 'backup':
        return backupCtrl;
      case 'password':
      case 'pass':
        return passwordCtrl;
      case 'database':
      case 'exec':
      case 'sql':
      case 'd':
        return databaseCtrl;
      case 'memory':
      case 'mem':
        return memoryCtrl;
      case 'token':
        return tokenCtrl;
      case 'revoke':
        return revokeCtrl;
      case 'help':
        return helpCtrl;
      case 'exit':
      case 'quit':
      case 'e':
      case 'q':
        return process.exit(0);
    }
  };

  pad = function(input) {
    while (input.length < 8) {
      input = ' ' + input;
    }
    return input;
  };

  processCommand = function(keywords, i) {
    var commandKeyword, j, keyword, len, questions;
    questions = [];
    if (i === 0) {
      for (i = j = 0, len = keywords.length; j < len; i = ++j) {
        keyword = keywords[i];
        if (i > 0) {
          commandKeyword = ndx.data.command.keywords[i - 1].replace('?', '');
          questions.push({
            name: commandKeyword,
            prompt: "" + (chalk.green(commandKeyword)) + (chalk.yellow('>')) + " "
          });
          if (commandKeyword) {
            ndx.data[commandKeyword] = keyword;
          }
        }
      }
    }
    while (i < ndx.data.command.keywords.length + 1) {
      commandKeyword = ndx.data.command.keywords[i - 1];
      if (!/\?/.test(commandKeyword)) {
        questions.push({
          name: commandKeyword,
          prompt: "" + (chalk.green(commandKeyword)) + (chalk.yellow('>')) + " "
        });
      }
      i++;
    }
    return async.eachSeries(questions, ndx.getData, function() {
      return ndx.data.command.exec(function(err, thing) {
        if (err) {
          console.log(err);
        }
        return ndx.data.command.cleanup(function(err) {
          return main(thing);
        });
      });
    });
  };

  main = function(command) {
    if (command) {
      ndx.data.command = getCommand(command);
      return processCommand([], 1);
    }
    switch (ndx.data.state) {
      case 'command':
        return ndx.getData({
          prompt: "" + (chalk.green('ndx')) + (chalk.yellow('>')) + " "
        }, function(err, input) {
          var keywords;
          keywords = ndx.splitLine(input);
          if (keywords && keywords.length) {
            ndx.data.command = getCommand(keywords[0]);
            if (!ndx.data.command) {
              console.log('unexpected command');
              return main();
            }
            return processCommand(keywords, 0);
          }
        });
    }
  };

  if (options.init) {
    ndx.spawnSync('npm', ['install', '-g', '--silent', 'yo', 'generator-ndx', 'grunt-cli', 'bower'], function() {
      return console.log('done');
    });
  } else if (options.create && options.appname) {
    ndx.spawnSync('yo', ['ndx', options.appname], function() {
      return console.log('done');
    });
  } else if (options['update-packages']) {
    require('./controllers/update-packages')(true, true);
  } else if (options['update-npm']) {
    require('./controllers/update-packages')(true, false);
  } else if (options['update-bower']) {
    require('./controllers/update-packages')(false, true);
  } else {
    console.log(chalk.yellow('ndx framework ') + chalk.cyan('v' + pack.version));
    console.log(chalk.cyan('type ') + chalk.yellow('help') + chalk.cyan(' for a list of commands'));
    console.log(chalk.cyan('hit ') + chalk.yellow('Ctrl-C') + chalk.cyan(' or type ') + chalk.yellow('exit') + chalk.cyan(' to exit'));
    main();
  }

}).call(this);

//# sourceMappingURL=app.js.map
