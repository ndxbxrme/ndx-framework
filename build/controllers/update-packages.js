(function() {
  'use strict';
  var ndx, path;

  path = require('path');

  ndx = require('../ndx.js');

  module.exports = function(npm, bower) {
    var bowerDeps, dep, deps, devDeps, localBower, localNpm;
    console.log('hi');
    localNpm = null;
    try {
      localNpm = require(path.join(process.cwd(), 'package.json'));
    } catch (undefined) {}
    localBower = null;
    try {
      localBower = require(path.join(process.cwd(), 'bower.json'));
    } catch (undefined) {}
    devDeps = [];
    deps = [];
    bowerDeps = [];
    if (localNpm && npm) {
      for (dep in localNpm.devDependencies) {
        if (dep.indexOf('ndx') !== -1) {
          devDeps.push(dep);
        }
      }
      for (dep in localNpm.dependencies) {
        if (dep.indexOf('ndx') !== -1) {
          deps.push(dep);
        }
      }
    }
    console.log(localBower);
    if (localBower && bower) {
      for (dep in localBower.dependencies) {
        if (dep.indexOf('ndx') !== -1) {
          bowerDeps.push(dep);
        }
      }
    }
    if (devDeps.length) {
      ndx.spawnSync('npm', ['uninstall', '--save-dev', '--silent'].concat(devDeps), function() {
        return ndx.spawnSync('npm', ['install', '--save-dev', '--silent'].concat(devDeps));
      });
    }
    if (deps.length) {
      ndx.spawnSync('npm', ['uninstall', '--save', '--silent'].concat(deps), function() {
        return ndx.spawnSync('npm', ['install', '--save', '--silent'].concat(deps));
      });
    }
    if (bowerDeps.length) {
      return ndx.spawnSync('bower', ['uninstall', '--save', '--silent'].concat(bowerDeps), function() {
        console.log('bower uninstalled');
        return ndx.spawnSync('bower', ['install', '--save', '--silent'].concat(bowerDeps));
      });
    }
  };

}).call(this);

//# sourceMappingURL=update-packages.js.map
