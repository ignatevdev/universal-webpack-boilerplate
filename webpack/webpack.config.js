// This is the base Webpack configuration file
import path from 'path';
import autoprefixer from 'autoprefixer';
import poststylus from 'poststylus';

require('dotenv').config();

// project folder
const rootFolder = path.resolve(__dirname, '..');

// regular expressions for module.loaders
export const regularExpressions = {
    javascript: /\.js$/,
    stylus: /\.styl$/,
    css: /\.css$/,
};

const fonts = [
    [/\.woff(\?v=\d+\.\d+\.\d+)?$/],
    [/\.woff2(\?v=\d+\.\d+\.\d+)?$/],
    [/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/]
].map((font) => {
    const rule = {
        test: font[0],
        loader: 'file-loader'
    };

    return rule;
});

const assetsPath = path.resolve(rootFolder, 'webroot', 'build', 'client');

const configuration = {
    // resolve all relative paths from the project root folder
    context: path.join(rootFolder),

    // https://webpack.github.io/docs/multiple-entry-points.html
    entry: {
        main: './src/core/client/entry.js'
    },

    output: {
        // filesystem path for static files
        path: assetsPath,

        // network path for static files
        publicPath: '/build/client/',

        // file name pattern for entry scripts
        filename: '[name].[hash].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: regularExpressions.javascript,
                // include: [path.resolve(rootFolder, 'code')],
                // exclude: path.resolve(rootFolder, 'node_modules'),
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: regularExpressions.css,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: regularExpressions.stylus,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: true,
                            preferPathResolver: 'webpack',
                            outputStyle: 'expanded',
                            import: [
                                '~nib/lib/nib/index.styl',
                                '~kouto-swiss/lib/kouto-swiss/index.styl'
                            ],
                            use: poststylus([
                                autoprefixer({
                                    browsers: 'last 2 version'
                                }),
                                'lost'
                            ])
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    'img-loader',
                    'file-loader'
                ]
            },
            {
                test: /\.(mo|po)$/,
                loader: 'binary-loader'
            },
            ...fonts
        ]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, '..', 'src'),
            path.resolve('node_modules')
        ],
        alias: {
            components: path.resolve(__dirname, '../src/components'),
            containers: path.resolve(__dirname, '../src/containers'),
            config: path.resolve(__dirname, '../src/config'),
            utils: path.resolve(__dirname, '../src/utils'),
            theme: path.resolve(__dirname, '../src/theme'),
            store: path.resolve(__dirname, '../src/store'),
            core: path.resolve(__dirname, '../src/core'),
            meta: path.resolve(__dirname, '../src/meta'),
            localization: path.resolve(__dirname, '../src/localization')
        }
    },

    plugins: []
};

export default configuration;
