/*
 * grunt-codekit
 * https://github.com/carl-erik.kopseng/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

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

            defaults: {
                options: {},

                files: {
                    '.tmp/test01_result.html': ['test/input/test01_input.kit'],
                    '.tmp/test02_result.html': ['test/input/test02_input.kit'],
                    '.tmp/test03_result.html': ['test/input/test03_input.kit']
                }
            },

            globbing_support: {
                src: 'test/input/**/*.kit',
                dest: '.tmp/globbing/'
            },

            partials_disabling: {
                options: {compilePrefixed: true},
                src: 'test/input/partials_disabling/*.kit',
                dest: '.tmp/prefixed/'
            },

            // Ref https://github.com/fatso83/grunt-codekit/issues/14
            // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
            dynamic_file_object: {
                files: [{
                    expand: true,
                    cwd: 'test/input/dynamic',
                    src: ['**/*.kit', '**/*.html'],
                    dest: '.tmp/dynamic',
                    ext: '.html'
                }]
            }
        },

        // Tests.
        mochaTest: {
            grunt: 'test/basic-tests-called-from-Gruntfile.js'
        },

        watch: {
            jshint: {
                files: ['Gruntfile.js', 'package.json', 'tasks/*.js'],
                tasks: ['jshint']
            },

            logic: {
                files: ['tasks/*.js'],
                tasks: ['test']
            },

            test: {
                files: ['test/**'],
                tasks: ['test']
            }

        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the ".tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'codekit', 'mochaTest']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
