/*
 * grunt-codekit
 * https://github.com/fatso83/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

/* jshint laxcomma : true*/

'use strict';

var kit = require('node-kit')
    , path = require('path')
    , count
    , done;

module.exports = function (grunt) {

    // Check for Kit partials and don’t include them in the compile list
    // These are files that start with underscores (i.e. _header.kit)
    // (They will be compiled only via imports and can cause errors if there
    // are variables that they use that are defined in the parent scope.)
    var notAPartial = function (filepath) {
        var basefilepath = path.basename(filepath);
        if (basefilepath[0] === "_") {
            grunt.verbose.ok("Encountered partial " + filepath + " — not compiling it directly.");
            return false;
        }
        return true;
    };

    var compileKitFile = function (filepath, destination) {

        var html,
            outputFilename = (path.basename(destination) === destination) ?
                path.resolve(destination, path.basename(filepath, '.kit') + '.html'):
                destination;

        grunt.log.debug("Trying path: " + filepath);
        html = kit(filepath);
        count++;

        grunt.log.debug("Derived html: " + html);
        grunt.log.debug("Writing to : " + outputFilename);
        grunt.file.write(outputFilename, html );
    };

    var compileJsFile = function (filepath, destination, callback) {
        callback = callback || function(){};
        var builder = require('file-builder')
            , fileOptions = {
                input: filepath,
                customOutput: destination
            }
            , projectOptions = { path: '.' };

        builder.javascript(fileOptions, projectOptions, callback);
    };

    grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language', function () {
        count = 0;

        this.files.forEach(function(fileGlob) {
            var destination = fileGlob.dest;
            grunt.log.debug("FileGlob: " + fileGlob);

            fileGlob.src.forEach(function(filepath) {
                if (notAPartial(filepath) && grunt.file.exists(filepath)) {
                    if (filepath.match(/\.(kit|html)$/)) {
                        grunt.log.debug('test compilation of ' + filepath);
                        compileKitFile(filepath, destination);
                    } else if (filepath.match(/\.js$/)) {
                        grunt.log.debug('Javascript compilation of ' + filepath);
                        compileJsFile(filepath, destination);
                    } else {
                        grunt.log.error("No handler for filetype: " + filepath);
                    }
                }
            });
        });

      grunt.log.ok("Compiled " + count + " files.");
    });
};
