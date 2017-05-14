'use strict'

ndx = require '../ndx.js'
superagent = require 'superagent'

module.exports =
  keywords: []
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        superagent.get "#{ndx.data.host}/api/memory"
        .set 'Authorization', "Bearer #{token}"
        .send()
        .end (err, response) ->
          if not response.error
            console.log response.body.memory
          else
            console.log response.error
          cb? response.error
      else
        cb? 'not logged in'
  cleanup: (cb) ->
    cb? null