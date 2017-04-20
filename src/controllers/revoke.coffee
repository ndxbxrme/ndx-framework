'use strict'

ndx = require '../ndx'
superagent = require 'superagent'

module.exports = 
  keywords: ['name', 'id', 'token']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        superagent.post "#{ndx.data.host}/api/revoke_cors_token"
        .set 'Authorization', "Bearer #{token}"
        .accept 'text/json'
        .send
          name: ndx.data['name']
          id: ndx.data['id']
          token: ndx.data['token']
        .end (err, response) ->
          if not err and not response.error
            console.log 'revoked'
            cb? null, null
          else
            cb? response.error
  cleanup: (cb) ->
    ndx.data['name'] = null
    ndx.data['id'] = null
    ndx.data['token'] = null
    cb? null