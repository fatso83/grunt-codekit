# grunt-codekit

> Grunt plugin to compile *.kit files using the CodeKit language

## Getting Started
You need to have Python on your path (meaning installed) for this to work, as this plugin is
simply wrapping the existing [CodeKit Language implementation in
Python](https://github.com/gjo/python-codekitlang).

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
- Code clean up
- <del>Get the integration tests working</del>
- Update the documentation
- Release a functioning version on the NPM registry
- Support concatenation of javascript using the @codekit-append/prepend
  directives.
- Ditto for Prepros by simply making the prepend/append directives
  configurable.
- Pure JS implementation of the compiler? Not needed, but any 
  purists out there are welcome to take a stab at it :)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
