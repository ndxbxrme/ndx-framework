'use strict'

ndx = require '../ndx'
superagent = require 'superagent'

module.exports =
  keywords: ['old password', 'new password']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        superagent.post "#{ndx.data.host}/api/update-password"
        .set 'Authorization', "Bearer #{token}"
        .accept 'text/json'
        .send
          oldPassword: ndx.data['old password']
          newPassword: ndx.data['new password']
        .end (err, response) ->
          if not err and not response.error
            console.log 'password updated successfully'
            cb? null, null
          else
            cb? response.error
  cleanup: (cb) ->
    ndx.data['old password'] = null
    ndx.data['new password'] = null
    cb? null