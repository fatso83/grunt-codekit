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
    , path = require('path')
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
      , pythonScript = [
                        'import codekitlang.compiler',
                        'c=codekitlang.compiler.Compiler(framework_paths=[])',
                        'c.generate_to_file("%s","%s")'
                       ].join(';')
      , command = 'python -c \'' + pythonScript +  '\''
      , rootDirectoryOfModule =  path.join(__dirname, "..")
      , childProcess
      , args = [].slice.call(arguments, 0)
      , done = this.async();

    process.env['PYTHONPATH'] = rootDirectoryOfModule;

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
          log.debug(exitCodes);
          if (exitCodes.indexOf(code) < 0) {
            log.error(format('Exited with code: %d.', code));
            return done(false);
          }

          grunt.log.ok('Compiled Kit file : "' + f.dest);
          verbose.ok(format('Exited with code: %d.', code));
          done();
        });
      });
    });
  });

};
