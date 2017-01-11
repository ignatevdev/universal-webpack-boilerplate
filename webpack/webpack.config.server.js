import {server_configuration as serverConfiguration} from 'universal-webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config';

const fileLoaders = configuration.module.rules.filter(item => item.loader === 'file-loader');

for (const loader of fileLoaders) {
    loader.options = {
        emitFile: false
    };
}

export default serverConfiguration(configuration, settings);