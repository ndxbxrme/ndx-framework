'use strict'

ndx = require '../ndx'
chalk = require 'chalk'

module.exports =
  keywords: ['host','username','password']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        console.log chalk.green.bold "\nsuccessfully connected to #{ndx.data.host}\n"
      cb? err, token
  cleanup: (cb) ->
    cb? null