// import fs from 'fs'

import path from 'path'; // eslint-disable-line
import minimist from 'minimist'; // eslint-disable-line

import configuration from './default';
import specificСonfiguration from './config';

export default Object.assign(configuration, specificСonfiguration);