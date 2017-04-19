module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    express:
      options: {}
      web:
        options:
          script: 'build/app.js'
    watch:
      coffee:
        options:
          spawn: false
          atBegin: true
        files: ['src/**/*.coffee']
        tasks: ['build']
    coffee:
      options:
        sourceMap: true
      default:
        files: [{
          expand: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'build'
          ext: '.js'
        }]
    clean:
      build: 'build'
      html: 'build/client/*/**/*.html'
    file_append:
      main:
        files: [{
          prepend: '#!/usr/bin/env node\n//\'use strict\';\n'
          input: 'build/app.js'
          output: 'build/app.js'
        }]
    lineending:
      dist:
        'build\/app.js': 'build\/app.js'
  grunt.registerTask 'build', [
    'clean:build'
    'coffee'
    'file_append'
    'lineending'
  ]
  grunt.registerTask 'default', [
    'build'
    'watch'
  ]