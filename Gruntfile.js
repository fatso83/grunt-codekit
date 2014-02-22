/*
 * grunt-codekit
 * https://github.com/carl-erik.kopseng/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        //'<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    codekit: {
      defaults: {
        options: {
          //file_suffix : 'kit'
        },
        files: {
          //'tmp/test01_result.html': ['test/input/test01_input.kit'],
        }
      },
    },

    // Unit tests.
    //nodeunit: {
      //tests: ['test/*_test.js'],
    //},

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'codekit', 'nodeunit']);
  //grunt.registerTask('test', ['clean', 'codekit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
