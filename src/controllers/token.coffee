'use strict'

ndx = require '../ndx.js'
superagent = require 'superagent'

module.exports = 
  keywords: ['name', 'hours']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        superagent.post "#{ndx.data.host}/api/generate_cors_token"
        .set 'Authorization', "Bearer #{token}"
        .accept 'text/json'
        .send
          name: ndx.data['name']
          hours: ndx.data['hours']
        .end (err, response) ->
          if not err and not response.error
            console.log 'token:'
            console.log response.body.token
            cb? null, null
          else
            cb? response.error
  cleanup: (cb) ->
    ndx.data['name'] = null
    ndx.data['hours'] = null