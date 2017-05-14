'use strict'

ndx = require '../ndx.js'
chalk = require 'chalk'

module.exports =
  keywords: ['host','username','password']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        console.log chalk.green.bold "\nsuccessfully connected to #{ndx.data.host}\n"
      cb? err, null
  cleanup: (cb) ->
    cb? null