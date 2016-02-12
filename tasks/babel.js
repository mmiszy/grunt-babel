'use strict';
var path = require('path');
var babel = require('babel-core');

module.exports = function (grunt) {
	grunt.registerMultiTask('babel', 'Use next generation JavaScript, today', function () {
		var options = this.options();
        var inputSourceMapFn;
        if (options.inputSourceMap && typeof options.inputSourceMap === 'function') {
            inputSourceMapFn = options.inputSourceMap.bind(options);
        }

        delete options.filename;
        delete options.filenameRelative;
        delete options.inputSourceMap;

		this.files.forEach(function (el) {
			options.sourceFileName = path.relative(path.dirname(el.dest), el.src[0]);

			if (process.platform === 'win32') {
				options.sourceFileName = options.sourceFileName.replace(/\\/g, '/');
			}

            if (inputSourceMapFn) {
                var inputSourceMapPath = path.relative('.', inputSourceMapFn(el, options.sourceFileName));
                if (grunt.file.exists(inputSourceMapPath)) {
                    options.inputSourceMap = grunt.file.readJSON(inputSourceMapPath);
                }
            }

			options.sourceMapTarget = path.basename(el.dest);

			var res = babel.transformFileSync(el.src[0], options);
			var sourceMappingURL = '';

			if (res.map) {
				sourceMappingURL = '\n//# sourceMappingURL=' + path.basename(el.dest) + '.map';
			}

			grunt.file.write(el.dest, res.code + sourceMappingURL + '\n');

			if (res.map) {
				grunt.file.write(el.dest + '.map', JSON.stringify(res.map));
			}
		});
	});
};
