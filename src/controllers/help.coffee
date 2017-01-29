'use strict'

ndx = require '../ndx'
chalk = require 'chalk'

module.exports =
  keywords: []
  exec: (cb) ->
    console.log ''
    console.log chalk.yellow.bold('Available commands')
    console.log 'login'
    console.log 'connect'
    console.log 'backup list'
    console.log 'backup restore'
    console.log 'password'
    console.log ''
    cb? null
  cleanup: (cb) ->
    cb? null