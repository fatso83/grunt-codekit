# grunt-codekit
> Grunt plugin for compiling [Kit](http://incident57.com/codekit/help.html#kit) files and concatenating javascript

[![NPM version](https://badge.fury.io/js/grunt-codekit.svg)](http://badge.fury.io/js/grunt-codekit)
[![Build Status](https://travis-ci.org/fatso83/grunt-codekit.svg?branch=master)](https://travis-ci.org/fatso83/grunt-codekit)
[![Gittip](http://img.shields.io/gittip/fatso83.svg)](https://www.gittip.com/fatso83/)

## Getting Started

###Install the plugin

```shell
npm install grunt-codekit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codekit');
```

### Choose files to compile

The plugins supports building templates written using the Kit language of CodeKit&trade; as well as concatenating
javascript using the same directives as in CodeKit&trade; and PrePros&trade;
`@codekit-append`,`@codekit-prepend` and `@prepros-append`,`@prepros-prepend`

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
The Kit language is a [simple html templating language](https://incident57.com/codekit/help.html#kit) used in the commercial program CodeKit. It imports files into other html files and does simple variable substitution. Since Bryan Jones made it open source it has seen support from several other programs, among those PrePros and implementations in Python and Javascript. This plugin makes it possible to compile these files using Grunt.

## TODO
- <del>Release a functioning version on the NPM registry</del>
- <del>Remove Python dependency (Yay!)</del>
- <del>Support concatenation of javascript using the @codekit-append/prepend directives</del>

## Release History
- 0.1.0 First release. Only compiling of Kit files supported. No framework
- 0.2.0 Removed dependency on Python (yay!)
- 0.3.0 Partials are now being excluded (thanks, @aral)
- 0.4.0 Support for CodeKit/PrePros javascript concatenation directives
