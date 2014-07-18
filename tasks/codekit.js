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
    , async = require('async')
    , done;

module.exports = function (grunt) {

    // Check for Kit partials and don’t include them in the compile list
    // (They will be compiled only via imports and can cause errors if there
    // are variables that they use that are defined in the parent scope.)
    var nonPartials = function (filepath) {
        var basefilepath = path.basename(filepath);
        if (basefilepath[0] === "_") {
            grunt.verbose.ok("Encountered partial " + filepath + " — not compiling it directly.");
            return false;
        }
        return true;
    }

    var compileKitFile = function (filepath, destination) {
        var html;

        grunt.log.debug("Trying path: " + filepath);
        html = kit(filepath);

        // This should not happen, but test anyway
        if (html === filepath) {
            throw new Error('Source file "' + filepath + '" not found.');
        }

        grunt.log.debug("Got html: " + html);
        grunt.log.debug("Writing file : " + destination);
        grunt.file.write(destination, html);
    };


    var compileJsFile = function (filepath, destination) {
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

    grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language and pre-/appends javascript', function () {

        done = this.async();

        // Iterate over all specified file groups.
        var files = this.files
        .filter(function(f) {
            // remove partials
            return nonPartials(f.src[0]);
        })
        .filter(function (f) {
            // Remove invalid source files 
            return grunt.file.exists(f.src[0]);
        });


        files.forEach(function (f) {
            var destination = f.dest;
            var filepath = f.src[0];
            console.log(f);

            if (filepath.match(/\.(kit|html)$/)) {
                grunt.log.debug('Kit compilation of ' + filepath);
                compileKitFile(filepath, destination);
            } else if (filepath.match(/\.js$/)) {
                grunt.log.debug('Javascript compilation of ' + filepath);
                compileJsFile(filepath, destination);
            } else {
                grunt.log("No handler for filetype. Unsure what to do with this file: " + filepath);
            }
        });
    })
}
