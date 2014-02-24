# grunt-codekit

> Grunt plugin to compile *.kit files using the <a
> href="http://incident57.com/codekit/kit.php">Kit language</a>

## Getting Started

Install the plugin (Python is a required dependency)

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
        'index.html' : ['index.kit'],
        'app.html' : ['app.kit'],
      }
    },
  },
});
```


## TODO
- Release a functioning version on the NPM registry
- Support use of framework libraries
- Support concatenation of javascript using the @codekit-append/prepend directives
- Making the prepend/append directives user settable (means PrePros support)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
