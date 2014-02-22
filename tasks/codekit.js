/*
 * grunt-codekit
 * https://github.com/fatso83/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */
/* jshint laxcomma : true*/

'use strict';

module.exports = function(grunt) {
    var cp = require('child_process')
    , format = require('util').format
    , _ = grunt.util._
    , log = grunt.log
    , verbose = grunt.verbose;

  grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language', function() {

  var data = this.data
      , execOptions = {}
      , stdout = data.stdout !== undefined ? data.stdout : true
      , stderr = data.stderr !== undefined ? data.stderr : true
      , callback = _.isFunction(data.callback) ? data.callback : function() {}
      , exitCodes = [0]
      , command = 'python -c \'import codekitlang.compiler;c=codekitlang.compiler.Compiler(framework_paths=[]);c.generate_to_file("%s","%s")\''
      , childProcess
      , args = [].slice.call(arguments, 0)
      , done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
          //file_suffix : 'kit'
    });
    //
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.

      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return true;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var childProcess = cp.exec(format(command,f.dest,filepath), execOptions, callback);

        if(stdout) { childProcess.stdout.on('data', function (d) { log.write(d); }); }
        if(stderr) { childProcess.stderr.on('data', function (d) { log.error(d); }); }

        childProcess.on('exit', function(code) {
          log.ok(exitCodes);
          if (exitCodes.indexOf(code) < 0) {
            log.error(format('Exited with code: %d.', code));
            return done(false);
          }

          grunt.log.ok('File "' + f.dest + '" created.');
          verbose.ok(format('Exited with code: %d.', code));
          done();
        });
      });

      // Handle options.
      //src += options.punctuation;

      // Write the destination file.

      // Print a success message.
      //grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
