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
        // Check for Kit partials and don’t include them in the compile list
        // (They will be compiled only via imports and can cause errors if there
        // are variables that they use that are defined in the parent scope.)
        var basefilepath = path.basename(filepath);
        if (basefilepath[0] === "_") {
          grunt.verbose.ok("Encountered partial " + filepath + " — not compiling it directly.");
          return false;
        }
               
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
          return;
        }

        grunt.log.debug("Got html: " + html);
        grunt.log.debug("Writing file : " + destination);
        grunt.file.write(destination, html );
      });
    });
  });
};

