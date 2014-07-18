/*  Expected to be run after grunt:codekit */
'use strict';

var read = require('fs').readFileSync
  , chai = require('chai')
  , should = chai.should();

chai.config.includeStack = true;

describe('Basic functionality tests', function () {

  it('should do basic basic parsing', function() {

    var actual = read('.tmp/test01_result.html').toString();
    var expected = read('test/expected/test01_expected.html').toString();
    actual.should.eql(expected);
  });

  it('should do variable embedding', function() {

    var actual = read('.tmp/test02_result.html').toString();
    var expected = read('test/expected/test02_expected.html').toString();
    actual.should.eql(expected);
  });

});
