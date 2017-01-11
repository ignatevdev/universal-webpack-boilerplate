/*eslint-disable */
'use strict'
// use bluebird for Promises
// require('babel-runtime/core-js/promise').default = require('bluebird');

var minimist = require('minimist');
var path = require('path');
var command_line_arguments = minimist(process.argv.slice(2));

global.__ROOT_FOLDER__ = path.resolve(__dirname, '..', '..');
global.__PRODUCTION__ = command_line_arguments.production;
global.__DEVELOPMENT__ = command_line_arguments.development || process.env.NODE_ENV === 'development';

require('babel-register');

// require('bluebird').promisifyAll(require('fs-extra'));

global.configuration = require('../config');