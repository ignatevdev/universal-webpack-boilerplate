import webpack from 'webpack';
import baseConfiguration from './webpack.config.server';

import applicationConfiguration from '../src/config';

const configuration = Object.assign({}, baseConfiguration);

const devServerHost = applicationConfiguration.development.webpack.development_server.host;
const devServerPort = applicationConfiguration.development.webpack.development_server.port;
const publicPath = configuration.output.publicPath;
// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${devServerHost}:${devServerPort}${publicPath}`;

configuration.plugins = configuration.plugins.concat(
    new webpack.DefinePlugin({
        'process.env':
        {
            NODE_ENV: JSON.stringify('production')
        },

        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['global', 'vendor'],
        children: true,
        async: true,
    })
);

export default configuration;