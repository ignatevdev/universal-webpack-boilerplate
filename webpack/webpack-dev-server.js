import webpack from 'webpack';
import configuration from './webpack.config.client.development';
import applicationConfiguration from '../src/config';

const WebpackDevServer = require('webpack-dev-server');

// http://webpack.github.io/docs/webpack-dev-server.html
const devServerOptions = {
    quiet: true, // don’t output anything to the console
    noInfo: true, // suppress boring information
    hot: true,
    // network path for static files: fetch all statics from webpack development server
    publicPath: configuration.output.publicPath,
    watchOptions: {
        aggregateTimeout: 300, // <---------
        poll: 1000, // <---------
        ignored: /node_modules/
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true},
    historyApiFallback: true
};

const compiler = webpack(configuration);

new WebpackDevServer(compiler, devServerOptions)
.listen(
    applicationConfiguration.development.webpack.development_server.port,
    (error) => {
        if (error) {
            console.error(error.stack || error);
            throw error;
        }

        console.log('[webpack-dev-server] Running');
    }
);