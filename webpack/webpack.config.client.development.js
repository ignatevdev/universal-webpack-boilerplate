import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

import {regularExpressions} from './webpack.config';
import baseConfiguration from './webpack.config.client';

const applicationConfiguration = require('../src/config');

const configuration = baseConfiguration({ development: true, css_bundle: true });

configuration.devtool = 'inline-source-map';

configuration.plugins.push(
    // environment variables
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.BABEL_ENV': JSON.stringify('es6'),

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HappyPack({
        id: 'js',
        loaders: ['babel-loader'],
        threads: 8
    }) // no need to specify loaders manually, yay!
);

const host = `http://${applicationConfiguration.development.webpack.development_server.host}:${applicationConfiguration.development.webpack.development_server.port}`;

// enable webpack development server
configuration.entry.main = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${host}`,
    'webpack/hot/only-dev-server',
    configuration.entry.main
];

const devServerHost = applicationConfiguration.development.webpack.development_server.host;
const devServerPort = applicationConfiguration.development.webpack.development_server.port;

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${devServerHost}:${devServerPort}${configuration.output.publicPath}`;

// Add React Hot Module Replacement plugin to `babel-loader`

const jsLoader = configuration.module.rules.find(
    loader => loader.test.toString() === regularExpressions.javascript.toString()
);

jsLoader.use[0].options = {
    plugins: [
        [
            'react-transform',
            {
                transforms:
                [
                    {
                        transform: 'react-transform-catch-errors',
                        imports: ['react', 'redbox-react']
                    }
                ]
            }
        ]
    ]
};

jsLoader.use.push({
    loader: 'eslint-loader',
    options: {
        configFile: path.resolve(__dirname, '../.eslintrc'),
        quiet: true,
        emitError: true,
        failOnError: true
    }
});

jsLoader.use.unshift({
    loader: 'happypack/loader',
    options: {
        id: 'js'
    }
});

// jsLoader.happy = {
//     id: 'js'
// };

export default configuration;