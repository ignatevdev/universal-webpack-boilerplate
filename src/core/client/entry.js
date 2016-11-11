// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird');
require('react-hot-loader/patch');

if (__DEVELOPMENT__) {
    require('bluebird').longStackTraces();
}

require('./client');