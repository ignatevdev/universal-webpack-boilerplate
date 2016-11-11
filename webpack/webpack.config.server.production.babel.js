import webpack from 'webpack';
import baseConfiguration from './webpack.config.server';

const configuration = Object.assign({}, baseConfiguration);

configuration.plugins = configuration.plugins.concat(
    new webpack.DefinePlugin({
        'process.env':
        {
            NODE_ENV: JSON.stringify('production')
        },

        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
);

export default configuration;