
ndx = require './ndx'
readline = require 'readline'
chalk = require 'chalk'
async = require 'async'
cli = require 'cli'
options = cli.parse()
pack = require '../package.json'

  
getCommand = (commandName) ->
  switch commandName
    when 'connect', 'login'
      return require('./controllers/connect')
    when 'backup'
      return require('./controllers/backup')
    when 'password', 'pass'
      return require('./controllers/password')
    when 'database', 'exec', 'sql', 'd'
      return require('./controllers/database')
    when 'memory', 'mem'
      return require('./controllers/memory')
    when 'token'
      return require('./controllers/token')
    when 'revoke'
      return require('./controllers/revoke')
    when 'help'
      return require('./controllers/help')

pad = (input) ->
  while input.length < 8
    input = ' ' + input
  input

main = ->
  switch ndx.data.state
    when 'command'
      ndx.getData
        prompt: "#{chalk.green('ndx')}#{chalk.yellow('>')} "
      , (err, input) ->
        keywords = ndx.splitLine input
        if keywords and keywords.length
          questions = []
          ndx.data.command = getCommand keywords[0]
          if not ndx.data.command
            console.log 'unexpected command'
            return main()
          for keyword, i in keywords
            if i > 0
              commandKeyword = ndx.data.command.keywords[i-1].replace('?', '')
              questions.push
                name: commandKeyword
                prompt: "#{chalk.green(commandKeyword)}#{chalk.yellow('>')} "
              if commandKeyword
                ndx.data[commandKeyword] = keyword
          while i < ndx.data.command.keywords.length + 1
            commandKeyword = ndx.data.command.keywords[i - 1]
            if not /\?/.test(commandKeyword)
              questions.push
                name: commandKeyword
                prompt: "#{chalk.green(commandKeyword)}#{chalk.yellow('>')} "
            i++
          async.eachSeries questions, ndx.getData
          , ->
            ndx.data.command.exec (err, thing) ->
              if err
                console.log err
              ndx.data.command.cleanup (err) ->
                main()
                

if options.init
  ndx.spawnSync 'npm', ['install', '-g', '--silent', 'yo', 'generator-ndx', 'grunt-cli', 'bower'], ->
    console.log 'done'
else if options.create and options.appname
  ndx.spawnSync 'yo', ['ndx', options.appname], ->
    console.log 'done'
else
  console.log chalk.yellow('ndx framework ') + chalk.cyan('v' + pack.version)
  console.log chalk.cyan('type ') + chalk.yellow('help') + chalk.cyan(' for a list of commands')
  console.log chalk.cyan('hit ') + chalk.yellow('Ctrl-C') + chalk.cyan(' to exit')
  main()
