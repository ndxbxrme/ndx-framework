'use strict'

ndx = require '../ndx'
superagent = require 'superagent'
inquirer = require 'inquirer'
chalk = require 'chalk'

getBackupList = (token, cb) ->
  superagent.get "#{ndx.data.host}/api/backup/list"
  .set 'Authorization', "Bearer #{token}"
  .accept 'text/json'
  .send()
  .end (err, response) ->
    list = []
    if not err and response.body
      for backup, i in response.body
        num = backup.match(/\d+/)[0]
        d = new Date(+num)
        list.push 
          date: "#{d.toDateString()} #{d.toLocaleTimeString().replace(/^(\d):/, '0$1:')}"
          file: backup
    cb? err, list

module.exports =
  keywords: ['subcommand']
  exec: (cb) ->
    ndx.getToken (err, token) ->
      if not err
        switch ndx.data.subcommand
          when 'list'
            getBackupList token, (err, list) ->
              if list and list.length
                for backup in list
                  console.log backup.date
              cb? err, ''
          when 'restore'
            getBackupList token, (err, list) ->
              choices = list.map (backup) ->
                backup.date
              choices.push 'None'
              inquirer.prompt [{
                type: 'list'
                name: 'date'
                message: 'choose a file to restore'
                choices: choices
              }]
              .then (answers) ->
                if answers.date
                  selectedBackup = null
                  for backup in list
                    if backup.date is answers.date
                      selectedBackup = backup
                      break
                  if selectedBackup
                    superagent.post "#{ndx.data.host}/api/backup/restore"
                    .set 'Authorization', "Bearer #{token}"
                    .send
                      fileName: selectedBackup.file
                    .end (err, response) ->
                      if not response.error
                        console.log chalk.green.bold "\nbackup successfully restored\n"
                      else
                        console.log response.error
                      cb? null, ''
                  else
                    cb? null, ''
                else
                  cb? 'nothing selected', ''
              
      else
        cb? 'not logged in'
  cleanup: (cb) ->
    ndx.data.subcommand = null
    cb? null