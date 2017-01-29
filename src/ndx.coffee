'use strict'

superagent = require 'superagent'
read = require 'read'

data =
  state: 'command'
  command: ''
  username: ''
  password: ''
  host: ''
  
splitLine = (line) ->
  if line
    return line.match /[\w:\/@\.]+|"(?:\\"|[^"])+"/g
  
accessToken = null

getToken = (cb) ->
  if accessToken
    return cb null, accessToken
  else
    if data.host and data.username and data.password
      if not /^http/.test(data.host)
        data.host = "http://#{data.host}"
      if /\/$/.test(data.host)
        data.host = data.host.replace(/\/$/,'')
      authCode = new Buffer "#{data.username}:#{data.password}"
      .toString 'base64'
      superagent.post "#{data.host}/auth/token"
      .set 'Authorization', 'Basic ' + authCode
      .send()
      .end (err, response) ->
        if not err
          accessToken = response.body.accessToken 
        cb (if accessToken then null else 'bad login'), accessToken
    else
      accessToken = null
      cb 'incomplete details', null
  
getData = (args, callback) ->
  if args.name
    if data[args.name]
      return callback null, data[args.name]
  read
    prompt: args.prompt or '>>'
    silent: /password/i.test(args.name)
  , (err, input) ->
    if args.name
      data[args.name] = input
    return callback null, input
    
module.exports =
  data: data
  splitLine: splitLine
  accessToken: accessToken
  getToken: getToken
  getData: getData