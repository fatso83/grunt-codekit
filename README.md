# grunt-codekit
> Grunt plugin for compiling [Kit](http://incident57.com/codekit/help.html#kit) files
> Can be used to embed files or concatenate files

[![NPM version](https://badge.fury.io/js/grunt-codekit.svg)](http://badge.fury.io/js/grunt-codekit)
[![Build Status](https://travis-ci.org/fatso83/grunt-codekit.svg?branch=master)](https://travis-ci.org/fatso83/grunt-codekit)

## Getting Started

### Install the plugin

```shell
npm install grunt-codekit --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codekit');
```

### Choose files to compile

The plugin supports compiling templates written using the Kit language of CodeKit&trade;. You can use both short form
and long form when specifying input and output destination.

Using short form (see below), the output files will be placed in the `dest` directory
and have the same names as the input files, only using a `.html` extension. When using
the long form you can explicitly specify the full name and path of each output file.

There is nothing in the way of mixing and matching the two styles.

#### Configuration options
As with all Grunt plugins, you can specify an `options` object, either for all tasks 
or for each task. There is currently just one option:

- `compilePrefixed` - Files starting with an underscore (such as `_header.kit`), 
so called partials, are normally not considered for compilation. By setting this option
 to true you can override this setting and still compile these files (default `false`).

Do remember that Grunt has a [lot of fancy ways of doing file system manipulation]
(http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for you


#### Example configuration

```js
grunt.initConfig({
  codekit: {
  
    globbed_example_config : {
        src : 'templates/**/*.kit',
        dest : 'build/html/'
    },
    
    explicit_output_names: {
      files : {
        'build/index.html' : '/templates/my_special_index.kit'
      }
    },
    
    build_with_underscored_files : {
        options : { compilePrefixed : true },
        files : {
            'build/about.html' : '_about.kit',
            'build/index.html' : '_index.kit'
        }
    },

    // see http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
    dynamic_file_object: {
        files: [{
            expand: true,
            cwd: 'sources',
            src: ['**/*.kit'],
            dest: 'build',
            ext: '.html'
    }
});
```

### Example usage: embedding critical path CSS
Using [Penthouse](https://github.com/fatso83/grunt-penthouse) one can generate a file containing the 
critical path css, which can *dramatically* impact your site's [perceived speed](http://addyosmani.com/blog/tag/critical-path-css/) and your page ranking in Google.

You still need a way of embedding that CSS, though, and one way of doing that is using the Kit language. An 
example on how this kit file might look is as follows

```
<html>
<head>
<title><!-- @title --></title>

<!-- embed critical path css generated by penthouse -->
<style>
<!--@include critical.css -->
</style>

</head>
<body>
    <!-- @include _header.kit -->
    <!-- @include _navbar.kit -->
    The main text of the page
    <!-- @include _footer.kit -->
</body>
</html>
```

## About the Kit language
The Kit language is a [simple html templating language](https://incident57.com/codekit/help.html#kit) used 
in the commercial program CodeKit. It imports files into other html files and does simple variable substitution. 
Since Bryan Jones made it open source it has seen support from several other programs, among those PrePros and 
implementations in Python and Javascript. This plugin makes it possible to compile these files using Grunt.

## Release History
- 0.1.0 First release. Compilation of Kit files using an embedded python module.
- 0.2.0 Removed dependency on Python.
- 0.3.0 Partials are now being excluded.
- 0.4.0 Added support for CodeKit/PrePros javascript concatenation directives.
- 1.0.0 Added globbing support and removed support for javascript compilation.
