# grunt-babel [![Build Status](https://travis-ci.org/babel/grunt-babel.svg?branch=master)](https://travis-ci.org/babel/grunt-babel)

> Use next generation JavaScript, today, with [Babel](https://babeljs.io)

*Issues with the output should be reported on the Babel [issue tracker](https://github.com/babel/babel/issues).*


## Install

```
$ npm install --save-dev grunt-babel babel-preset-es2015
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	babel: {
		options: {
			sourceMap: true,
			presets: ['es2015']
		},
		dist: {
			files: {
				'dist/app.js': 'src/app.js'
			}
		}
	}
});

grunt.registerTask('default', ['babel']);
```


## Options

See the Babel [options](https://babeljs.io/docs/usage/options), except for `filename` which is handled for you and `inputSourceMap` (see below).

### inputSourceMap
`inputSourceMap` option should be a function which takes two arguments and returns path to the existing source map.


```
grunt.initConfig({
	babel: {
		options: {
			inputSourceMap: function (el, sourceFileName) {
				return return el.src[0].replace(/\.js$/, '.js.map');
			}
		}
	}
});
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
