// This is the base Webpack configuration file
import path from 'path';
import autoprefixer from 'autoprefixer';
import poststylus from 'poststylus';

require('dotenv').config();

// project folder
const rootFolder = path.resolve(__dirname, '..');

// regular expressions for module.loaders
const regularExpressions = {
    javascript: /\.js$/,
    styles: /\.styl$/
};

const assetsPath = path.resolve(rootFolder, 'webroot', 'build', 'client');

const configuration = {
    // resolve all relative paths from the project root folder
    context: path.join(rootFolder),

    // https://webpack.github.io/docs/multiple-entry-points.html
    entry:
    {
        main: './src/core/client/entry.js'
    },

    output:
    {
        // filesystem path for static files
        path: assetsPath,

        // network path for static files
        publicPath: '/build/client/',

        // file name pattern for entry scripts
        filename: '[name].[hash].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].[hash].js'
    },

    eslint: {
        configFile: path.resolve(__dirname, '../.eslintrc')
    },

    module:
    {
        loaders:
        [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: regularExpressions.javascript,
                // include: [path.resolve(rootFolder, 'code')],
                // exclude: path.resolve(rootFolder, 'node_modules'),
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: regularExpressions.styles,
                loaders:
                [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap',
                    'stylus-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
                ]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?mimetype=application/font-woff'},
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?lmimetype=application/font-woff'},
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?mimetype=application/octet-stream'},
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'},
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?mimetype=image/svg+xml'
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file!img'
            },
            {
                test: /\.(mo|po)$/,
                loaders:
                [
                    'binary-loader'
                ]
            }
        ]
    },

    // maybe some kind of a progress bar during compilation
    progress: true,

    stylus: {
        import: [
            '~nib/lib/nib/index.styl',
            '~kouto-swiss/lib/kouto-swiss/index.styl'
        ],
        use: [
            poststylus([autoprefixer({ browsers: 'last 2 version' }), 'lost'])
        ]
    },

    resolve:
    {
        root: [
            path.resolve('src'),
            path.resolve('node_modules')
        ],
        alias: {
            components: path.resolve(__dirname, '../src/components'),
            containers: path.resolve(__dirname, '../src/containers'),
            utils: path.resolve(__dirname, '../src/utils'),
            theme: path.resolve(__dirname, '../src/theme'),
            store: path.resolve(__dirname, '../src/store'),
            core: path.resolve(__dirname, '../src/core'),
            localization: path.resolve(__dirname, '../src/localization')
        },
        // you can now require('file') instead of require('file.[extension]')
        extensions: ['', '.json', '.js']
    },

    plugins: []
};

export default configuration;
