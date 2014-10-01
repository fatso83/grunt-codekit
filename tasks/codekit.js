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
	, partialPrefix = "_"
	, done;

module.exports = function (grunt) {

	// Check for Kit partials and don’t include them in the compile list
	// (They will be compiled only via imports and can cause errors if there
	// are variables that they use that are defined in the parent scope.)
	var nonPartials = function (filepath) {
		var basefilepath = path.basename(filepath);

		if (basefilepath[0] === partialPrefix) {
			grunt.verbose.ok("Encountered partial " + filepath + " — not compiling it directly.");
			return false;
		}
		return true;
	};

	var compileKitFile = function (filepath, destination) {
		var html;

		grunt.log.debug("Compiling Kit file : " + filepath);
		html = kit(filepath);

		grunt.log.debug("Writing file : " + destination);
		grunt.file.write(destination, html);
	};

	grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language and pre-/appends javascript', function () {

		// Iterate over all specified file groups.
		var files = this.files
			.filter(function (f) {
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
			}

		}, function (err) {
			if (err) { done(err); }
			else { done(); }
		});
	});
};
