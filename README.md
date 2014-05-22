# grunt-codekit
> Grunt plugin for compiling the [Kit language](http://incident57.com/codekit/help.html#kit)

[![NPM version](https://badge.fury.io/js/grunt-codekit.svg)](http://badge.fury.io/js/grunt-codekit)
[![Build Status](https://travis-ci.org/fatso83/grunt-codekit.svg?branch=master)](https://travis-ci.org/fatso83/grunt-codekit)
[![Gittip](http://img.shields.io/gittip/fatso83.svg)](https://www.gittip.com/fatso83/)

## Getting Started

Install the plugin 

```shell
npm install grunt-codekit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codekit');
```

## The "codekit" task

### Overview
In your project's Gruntfile, add a section named `codekit` to the data object passed into `grunt.initConfig()`.

### Usage Example

```js
grunt.initConfig({
  codekit: {
    options: {
      // None yet
    },
    your_target: {
      files : {
        'index.html' : 'index.kit',
        'app.html' : 'app.kit',
      }
    },
  },
});
```
## About the Kit language
The Kit language is a simple open source html templating language used in the commercial programs CodeKit and
PrePros. It imports files into other html files and does simple variable substitution. This plugin makes it possible to compile these files using Grunt.

So far this project only supports compiling the Kit Language, but it
might be extended in the future to also support the directives from
CodeKit and PrePros for concatenating javascript files.


## TODO
- <del>Release a functioning version on the NPM registry</del>
- <del>Remove Python dependency (Yay!)</del>
- Support concatenation of javascript using the @codekit-append/prepend directives
- Making the prepend/append directives user settable (means PrePros support)

## Release History
0.1.0 First release. Only compiling of Kit files supported. No framework
0.2.0 Removed dependency on Python (yay!)
