/*  Expected to be run after grunt:codekit */
'use strict';

var fs = require('fs')
	, path = require('path')
	, read = fs.readFileSync
	, exists = fs.existsSync
	, readToString = function (f) { return read(f).toString(); }
	, chai = require('chai');

chai.should();
chai.config.includeStack = true;

describe('Basic functionality tests', function () {

	it('should do basic basic parsing', function () {

		var actual = readToString('.tmp/test01_result.html');
		var expected = readToString('test/expected/test01_expected.html');
		actual.should.eql(expected);
	});

	it('should do variable embedding', function () {

		var actual = readToString('.tmp/test02_result.html');
		var expected = readToString('test/expected/test02_expected.html');
		actual.should.eql(expected);
	});

	it('should bring imported variables into the same scope', function () {

		var actual = readToString('.tmp/test03_result.html');
		var expected = readToString('test/expected/test03_expected.html');
		actual.should.eql(expected);
	});

	it('should support globbing file patterns', function () {
		var globbingOutputDestination = '.tmp/globbing'
			, files = ['test01_input.html', 'subfile1.html', 'subfile2.html'];

		files.forEach(function(file) {
			exists(path.join(globbingOutputDestination, file)).should.equal(true);
		});
	});

	it('should normally not compile partials', function () {
		exists('.tmp/_variables.html').should.equal(false);
	});

	it('should compile partials when configured to do so', function () {
		exists('.tmp/prefixed/_prefixed.html').should.equal(true);
	});

});
