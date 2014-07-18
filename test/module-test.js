'use strict';

var fs = require('fs-extra')
    , read = require('fs').readFileSync
    , chai = require('chai')
    , should = chai.should()
    , sinon = require('sinon')
    , codekit = require(__dirname + '/../tasks/codekit.js');

chai.config.includeStack = true;

describe('Async handling', function() {
    var grunt;

    beforeEach(function(done) {
        grunt = fakeGrunt();
        // register task
        codekit(grunt);

        fs.remove('.tmp', done);
    });

    it('should call the callback on empty list', function(done) {
        grunt.task([], done);
    });

    it('should call the callback when compiling html', function(done) {
        grunt.task([
            { 
                src : ['test/input/test01_input.kit'],
                dest : '.tmp/ignored.out'
            },
        ], done);
    });

    it('should call the callback with an error for illegal file names', function(done) {
        grunt.task([
            { 
                src : ['test/input/illegal.file.name'],
                dest : '.tmp/ignored.out'
            },
        ], function(err) {
            if(err) done();
            else done(new Error('Expected error'));
        });
    });

});


function fakeGrunt() {
    var taskFn, callback;

    return {
        registerMultiTask : function(name, desc, fn) {
            taskFn = fn;
        },

        file : {
            write : sinon.spy(),

            exists : function(path) {
                return fs.existsSync(path);
            }
        },

        log : {
            debug : sinon.stub()
        },

        task : function(files, done) {
            
            taskFn.call({
                async : function() {
                    return done;
                },
                files : files
            });
        }
    }
}
