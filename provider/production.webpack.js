// load .env files and define environment varibale before all actions
require('./assistant/evnLoader');

const path = require('path'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    StatsPlugin = require('stats-webpack-plugin'),
    Dotenv = require('dotenv-webpack'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    //
    distDir = path.resolve(process.cwd(), './dist'),
    SCSS_UTILITY_PATH = path.resolve(process.cwd(), './root/config');



module.exports = [
    //---------------- client ----------------//
    {
        name: 'client',
        mode: 'production',
        target: 'web',
        performance: {hints: false},
        entry: './root/client.js',
        output: {
            path: distDir,
            filename: 'client.js',
            publicPath: distDir
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                // sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [SCSS_UTILITY_PATH]
                            }
                        }
                    ]
                },
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new Dotenv({systemvars: true}),
            new CleanWebpackPlugin(["dist"], {
                root: process.cwd(),
                verbose: true,
                dry: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.IgnorePlugin(/async-local-storage/)
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        },
                        output: {
                            comments: false,
                            beautify: false
                        },
                    },
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCssAssetsPlugin({})
            ]
        },
    },

    //---------------- server ----------------//
    {
        name: 'server',
        mode: 'production',
        target: 'node',
        performance: {hints: false},
        entry: './root/server.js',
        output: {
            path: distDir,
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: distDir,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'isomorphic-style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                // sourceMap: true
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [SCSS_UTILITY_PATH]
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {discardComments: {removeAll: true}}
            }),
            new StatsPlugin('stats.json', {
                chunkModules: true,
                modules: true,
                chunks: true,
                exclude: [/node_modules[\\\/]react/],
            }),
        ],
    }
];