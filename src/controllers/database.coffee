'use strict'

ndx = require '../ndx'
superagent = require 'superagent'

module.exports = 
  keywords: ['sql', 'props']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        superagent.post "#{ndx.data.host}/api/database/exec"
        .set 'Authorization', "Bearer #{token}"
        .send
          sql: ndx.data.sql
          props: ndx.data.props
          notCritical: false
        .end (err, response) ->
          if not response.error
            console.log response.text
          else
            console.log response.error
          cb? null, ''
      else
        cb? 'not logged in'
  cleanup: (cb) ->
    ndx.data.sql = null
    ndx.data.props = null
    cb? null