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
	, reKitHtml = /\.(kit|html)$/
	, reGlob = /.*\*.*/;

module.exports = function (grunt) {

	// Check for Kit partials and don’t include them in the compile list
	// (They will be compiled only via imports and can cause errors if there
	// are variables that they use that are defined in the parent scope.)
	var not = function (predicate) { return function () { return !predicate.apply(null, arguments); }; };
	var and = function (predicates) {
		return function () {
			var bool = true, index = 0, len = predicates.length, predicate;
			while (bool && index < len) {
				predicate = predicates[index++];
				bool = bool && predicate.apply(null, arguments);
			}
			return bool;
		};
	};
	var isPartial = function (filepath) { return path.basename(filepath)[0] === partialPrefix; };
	var isUnexpandedGlob = function (file) {
        var filename = file.orig.src[0],
            expand = file.orig.expand;

        return reGlob.test(filename) && !expand;
    };
	var isKitFile = function (f) { return reKitHtml.test(f); };
	var fileExists = function (f) { return grunt.file.exists(f); };

	var createFilename = function (destination, filepath) {
		return path.resolve(destination, path.basename(filepath, '.kit') + '.html');
	};

	var compileKitFile = function (filepath, outputFilename) {
		var html;

		grunt.log.debug("Compiling Kit file : " + outputFilename);
		html = kit(filepath);

		grunt.log.debug("Writing file : " + outputFilename);
		grunt.file.write(outputFilename, html);
	};

	grunt.registerMultiTask('codekit', 'Compiles files using the open CodeKit language and pre-/appends javascript', function () {

		// Iterate over all specified file groups.
		var files = this.files
			, options = this.options();

		files.forEach(function (file) {

			// if file is a globbing pattern, then src might be a list of several files
			// otherwise file.src will contain a list of one file
			var currentSetOfInputFiles = file.src,
				destination = file.dest,
				predicates = [],
				outputFilename;

			if (!options.compilePrefixed) {
				predicates.push(not(isPartial));
			}
			predicates.push(isKitFile, fileExists);

			currentSetOfInputFiles
				.filter(and(predicates))
				.forEach(function (filepath) {
					outputFilename = isUnexpandedGlob(file) ?
						createFilename(destination, filepath)
						: destination;

					compileKitFile(filepath, outputFilename);
				});
		});
	});
};
