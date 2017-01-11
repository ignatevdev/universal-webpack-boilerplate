/*eslint-disable */
'use strict'
// use bluebird for Promises
// require('babel-runtime/core-js/promise').default = require('bluebird');

var minimist = require('minimist');
var path = require('path');
var command_line_arguments = minimist(process.argv.slice(2));

global.__ROOT_FOLDER__ = path.resolve(__dirname, '..', '..', '..');
global.__PRODUCTION__ = command_line_arguments.production;
global.__DEVELOPMENT__ = command_line_arguments.development || process.env.NODE_ENV === 'development';

require('babel-register')({
    ignore: function(filename) {
        const relative_path = path.relative(global.__ROOT_FOLDER__, filename)
        let folder = path.dirname(relative_path)

        // If it's a `node_modules` folder, ignore it
        if (folder.split(path.sep).indexOf('node_modules') >= 0) {
            return true
        }

        const slash_index = folder.indexOf(path.sep)

        if (slash_index >= 0) {
            folder = folder.substring(0, slash_index)
        }

        if (folder === 'build')
        {
            return true
        }

        return false
    }

});

// require('bluebird').promisifyAll(require('fs-extra'));

global.configuration = require('../config');