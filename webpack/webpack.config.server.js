import {server_configuration as serverConfiguration} from 'universal-webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config';

export default serverConfiguration(configuration, settings);