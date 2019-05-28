const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    name: 'frontend',
    mode: devMode ? 'development' : 'production',
    entry: {
        main: path.resolve(__dirname, ('src/js/app.js'))
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        publicPath: '/src/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.scss?/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            plugins: [
                                autoprefixer(),
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap:true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'images-processed'
                    },
                }],
            },
            {
                test: /\.(otf|ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'fonts'
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                            sourceMap: true,
                        },
                    },
                ],
            },

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHardDiskPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 9000,
        hot: true,
        inline: true,
        contentBase: './dist',
    },
    node: {
        fs: 'empty'
    }
}