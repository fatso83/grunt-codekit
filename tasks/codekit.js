/*
 * grunt-codekit
 * https://github.com/fatso83/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

/* jshint laxcomma : true*/

'use strict';

var kit = require('node-kit'),
    path = require('path');

module.exports = function (grunt) {

    function nonPartials(filepath) {
        // Check for Kit partials and don’t include them in the compile list
        // (They will be compiled only via imports and can cause errors if there
        // are variables that they use that are defined in the parent scope.)
        var basefilepath = path.basename(filepath);
        if (basefilepath[0] === "_") {
            grunt.verbose.ok("Encountered partial " + filepath + " — not compiling it directly.");
            return false;
        }
        return true;
    }

    grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language and pre-/appends javascript', function () {

        var done = this.async();

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            var destination = f.dest;

            var compileKitFile = function (filepath) {
                var html;

                grunt.log.debug("Trying path: " + filepath);
                html = kit(filepath);

                // This should not happen, but test anyway
                if (html === filepath) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return;
                }

                grunt.log.debug("Got html: " + html);
                grunt.log.debug("Writing file : " + destination);
                grunt.file.write(destination, html);
            };


            function compileJsFile(filepath) {
                var builder = require('file-builder')
                    , fileOptions = {
                        input: filepath,
                        customOutput: destination
                    }
                    , projectOptions = { path: '.' };

                builder.javascript(fileOptions, projectOptions, function (err) {
                    if (err) {
                        grunt.log.error(err);
                        done(false);
                        return;
                    }
                    done();
                });
            }

            f.src.filter(nonPartials)
                .filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    return grunt.file.exists(filepath);
                })
                .map(function (filepath) {
                    console.error(filepath);
                    if (filepath.match(/\.(kit|html)$/)) {
                        grunt.log.debug('Kit compilation of ' + filepath);
                        compileKitFile(filepath);
                    } else if (filepath.match(/\.js$/)) {
                        grunt.log.debug('Javascript compilation of ' + filepath);
                        compileJsFile(filepath);
                    } else {
                        grunt.log("No handler for filetype. Unsure what to do with this file: " + filepath);
                    }
                });
        });
    });
};

