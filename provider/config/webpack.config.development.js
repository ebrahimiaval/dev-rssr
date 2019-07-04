const
    path = require('path'),
    webpack = require('webpack'),
    Dotenv = require('dotenv-webpack'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    //
    srcDir = path.resolve(process.cwd(), './src');



//?quiet=true
module.exports = [
    //---------------- development client.js config ----------------//
    {
        name: 'client',
        mode: 'development',
        target: 'web',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=client&reload=true', `${srcDir}/render/client.js`],
        output: {
            filename: 'client.js',
            publicPath: '/dist/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'css-hot-loader?cssModule=true',
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [`${srcDir}/config`]
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
            new webpack.HotModuleReplacementPlugin()
        ]
    },

    //---------------- development server.js config ----------------//
    {
        name: 'server',
        mode: 'development',
        target: 'node',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=server&reload=true', `${srcDir}/render/server.js`],
        output: {
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: '/dist/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
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
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [`${srcDir}/config`]
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
            new webpack.HotModuleReplacementPlugin()
        ]
    }
];
