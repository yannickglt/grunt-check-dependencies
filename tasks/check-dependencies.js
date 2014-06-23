/**
 * grunt-check-dependencies
 * https://github.com/mzgol/grunt-check-dependencies
 *
 * Author Michał Gołębiowski <m.goleb@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
    checkDependencies = require('check-dependencies');

module.exports = function (grunt) {
    grunt.registerMultiTask('checkDependencies',
            'Checks if currently installed npm dependencies are installed in the exact same versions ' +
            'that are specified in package.json',
        function () {
            var options = _.cloneDeep(this.options()),
                done = this.async();

            if (options.verbose) {
                options.log = grunt.log.writeln;
            } else {
                options.log = _.noop;
            }
            options.error = grunt.log.error;
            options.verbose = true;

            checkDependencies(options, function (output) {
                done(output.status === 0);
            });
        }
    );
};
