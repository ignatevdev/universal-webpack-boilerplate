require('react-hot-loader/patch');

/* REMOVE THIS IF YOU WANT TO SEE THE SOURCEMAPS INSIDE YOUR ERROR INFO */
require('babel-runtime/core-js/promise').default = require('bluebird');

if (__DEVELOPMENT__) {
    require('bluebird').longStackTraces();
}
/* */

require('./client');