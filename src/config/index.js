// import fs from 'fs'
import path from 'path'; // eslint-disable-line
import minimist from 'minimist'; // eslint-disable-line

import configuration from './default.js';
import specificСonfiguration from './config.js';

export default Object.assign(configuration, specificСonfiguration);