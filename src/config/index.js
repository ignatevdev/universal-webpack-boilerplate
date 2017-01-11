// import fs from 'fs'

const path = require('path'); // eslint-disable-line
const minimist = require('minimist'); // eslint-disable-line

const configuration = require('./default');
const specificСonfiguration = require('./config');

module.exports = Object.assign(configuration, specificСonfiguration);