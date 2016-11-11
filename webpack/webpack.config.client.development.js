import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

import baseConfiguration from './webpack.config.client';
import applicationConfiguration from '../src/config';

const configuration = baseConfiguration({ development: true, css_bundle: true });
const regularExpressions = {
    javascript: /\.js$/,
    styles: /\.less$/
};

configuration.devtool = 'inline-source-map';

configuration.plugins.push(
    // environment variables
    new webpack.DefinePlugin({
        'process.env':
        {
            NODE_ENV: JSON.stringify('development'),
            BABEL_ENV: JSON.stringify('development')
        },

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true
    }),
    new webpack.DllReferencePlugin({
        context: path.join(__dirname, '../'),
        manifest: require(path.join(configuration.output.path, 'vendor-manifest.json')),
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HappyPack({
        id: 'js',
        threads: 8
    }) // no need to specify loaders manually, yay!
);

const host = `http://${applicationConfiguration.development.webpack.development_server.host}:${applicationConfiguration.development.webpack.development_server.port}`;

// enable webpack development server
configuration.entry.main = [
    `webpack-dev-server/client?${host}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    configuration.entry.main
];

const devServerHost = applicationConfiguration.development.webpack.development_server.host;
const devServerPort = applicationConfiguration.development.webpack.development_server.port;

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${devServerHost}:${devServerPort}${configuration.output.publicPath}`;

// Add React Hot Module Replacement plugin to `babel-loader`

const jsLoader = configuration
        .module
        .loaders
        .filter(
            loader => (
                loader.test.toString() === regularExpressions.javascript.toString()
            )
        )[0];

const query = {
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

configuration.eslint = {
    quiet: true,
    emitError: true,
    failOnError: true
};

jsLoader.loaders[0] += `?${JSON.stringify(query)}`;
jsLoader.loaders.push('eslint-loader');
jsLoader.happy = {
    id: 'js'
};

export default configuration;