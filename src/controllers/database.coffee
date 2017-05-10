'use strict'

ndx = require '../ndx'
superagent = require 'superagent'

module.exports = 
  keywords: ['sql', 'props']
  exec: (cb) ->
    if ['exit','quit','q','e','x'].indexOf(ndx.data.sql) isnt -1
      return cb? null, null
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
            console.log JSON.stringify(JSON.parse(response.text), null, '  ')
          else
            console.log response.error
          cb? null, 'database'
      else
        cb? 'not logged in'
  cleanup: (cb) ->
    ndx.data.sql = null
    ndx.data.props = null
    cb? null