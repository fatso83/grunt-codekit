/*
 * grunt-codekit
 * https://github.com/fatso83/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */
/* jshint laxcomma : true*/

'use strict';

function setCwd(grunt, dir) {
        grunt.file.setBase(dir);
        grunt.log.debug("New cwd: " + dir);
}

module.exports = function(grunt) {
    var cp = require('child_process'),
        kit = require('node-kit'),
        fs = require('fs'),
        path = require('path');

  grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language', function() {

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files

      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          return true;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var destination = f.dest,
          html = kit(filepath);

        grunt.log.debug("Trying path: " + filepath);
        html = kit(filepath);

        // This should not happen, but test anyway
        if( html === filepath) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return
        }

        grunt.log.debug("Got html: " + html);
        grunt.log.debug("Writing file : " + destination);
        grunt.file.write(destination, html );
      });
    });
  });
};

