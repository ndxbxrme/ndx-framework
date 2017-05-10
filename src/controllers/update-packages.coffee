'use strict'
path = require 'path'
ndx = require '../ndx'

module.exports = (npm, bower) ->
  localNpm = null
  try
    localNpm = require path.join process.cwd(), 'package.json'
  localBower = null
  try
    localBower = require path.join process.cwd(), 'bower.json'
  devDeps = []
  deps = []
  bowerDeps = []
  if localNpm and npm
    for dep of localNpm.devDependencies
      if dep.indexOf('ndx') isnt -1
        devDeps.push dep
    for dep of localNpm.dependencies
      if dep.indexOf('ndx') isnt -1
        deps.push dep
  if localBower and bower
    for dep of localBower.dependencies
      if dep.indexOf('ndx') isnt -1
        bowerDeps.push dep
  if devDeps.length
    ndx.spawnSync 'npm', ['uninstall', '--save-dev', '--silent'].concat(devDeps), ->
      ndx.spawnSync 'npm', [ 'install', '--save-dev', '--silent'].concat(devDeps)
  if deps.length
    ndx.spawnSync 'npm', ['uninstall', '--save', '--silent'].concat(deps), ->
      ndx.spawnSync 'npm', ['install', '--save', '--silent'].concat(deps)
  if bowerDeps.length
    ndx.spawnSync 'bower', ['uninstall', '--save', '--silent'].concat(bowerDeps), ->
      ndx.spawnSync 'bower', ['install', '--save', '--silent'].concat(bowerDeps)