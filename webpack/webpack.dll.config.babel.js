import webpack from 'webpack';
import path from 'path';
import HappyPack from 'happypack';

import baseConfiguration from './webpack.config.client';
import applicationConfiguration from '../src/config';

const configuration = baseConfiguration({ development: true, css_bundle: true });

configuration.entry = {
    vendor: [ // This is not a complete list and shurely can be extended
        'react',
        'react-dom',
        'babel-runtime/core-js',
        'babel-polyfill',
        'immutable',
        'serialize-javascript',
        'sprintf-js',
        'moment',
        'lodash',
        'redux',
        'redux-immutable',
        'redux-form',
        'react-router',
        'react-helmet',
        'react-router',
        'history'
    ]
};

configuration.output = {
    path: configuration.output.path,
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: configuration.output.publicPath
};

configuration.plugins = configuration.plugins.concat([
    new webpack.DllPlugin({
        name: '[name]',
        path: path.join(configuration.output.path, '[name]-manifest.json'),
    }),
    new webpack.DefinePlugin({
        'process.env':
        {
            // Useful to reduce the size of client-side libraries, e.g. react
            NODE_ENV: JSON.stringify('production') // 'development' to see non-minified React errors
        },

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
]);

export default configuration;