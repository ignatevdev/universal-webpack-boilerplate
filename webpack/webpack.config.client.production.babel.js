import path from 'path';
import webpack from 'webpack';
import WebpackCleanPlugin from 'clean-webpack-plugin';

import baseConfiguration from './webpack.config.client';

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const configuration = baseConfiguration({development: false});

configuration.devtool = 'source-map';

configuration.plugins = configuration.plugins.concat(
    // clears the output folder
    new WebpackCleanPlugin(
        [
            path.relative(configuration.context, configuration.output.path)
        ],
        {root: configuration.context}
    ),

    // environment variables
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('production'),

        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

export default configuration;