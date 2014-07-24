/*
 * grunt-codekit
 * https://github.com/carl-erik.kopseng/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Autoload tasks from dependencies
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['.tmp']
        },

        // Configuration to be run (and then tested).
        codekit: {
            main: {
                options: {},

                files: {
                    '.tmp/test01_result.html': ['test/input/test01_input.kit'],
                    '.tmp/test02_result.html': ['test/input/test02_input.kit'],
                    '.tmp/test03_result.js': ['test/input/test03_input.js']
                }
            },
            glob : {
                src: ['test/input/*.kit'],
                dest: '.tmp'
            }
        },

        // Tests.
        mochaTest: {
            grunt: 'test/basic-tests-called-from-Gruntfile.js',
            unit_tests: ['test/*test.js']
        },

        watch: {
            jshint : {
                files: ['Gruntfile.js', 'package.json','tasks/*.js'],
                tasks : ['jshint']
            },

            logic : {
                files: ['tasks/*.js'],
                tasks : ['test']
            },

            test : {
                files: ['test/**'],
                tasks : ['test']
            }

        }

    });

    grunt.loadNpmTasks('grunt-debug-task');

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the ".tmp" dir, then run this
    // plugin's task(s), then test the result.
    // grunt.registerTask('test', ['clean', 'codekit:defaults', 'mochaTest']);
    grunt.registerTask('test', ['clean', 'codekit', 'mochaTest']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
