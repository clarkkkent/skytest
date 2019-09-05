const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  name: 'frontend',
  mode: devMode ? 'development' : 'production',
  entry: {
    main: path.resolve(__dirname, ('src/js/app.js')),
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-[hash].js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss?/,
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
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$|njk/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'src/templates'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use:
          [{
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'images-processed',
            },
          }],
      },
      {
        test: /\.svg/,
        use: [
          'svg-sprite-loader',
          'svgo-loader',
        ],
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        use:
          [
            {
              loader: 'file-loader',
              options: {
                name: '[name]-[hash].[ext]',
                outputPath: 'fonts',
              },
            },
          ],
      },
      {
        test: /\.css$/,
        use:
          [
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/images'),
        to: 'images',
      },
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'nunjucks-html-loader!./src/templates/index.njk',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHardDiskPlugin(),

    new SpriteLoaderPlugin(),
  ],
  devServer:
    {
      host: '0.0.0.0',
      port:
        9000,
      hot:
        true,
      inline:
        true,
      contentBase:
        './public',
    },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: (item) => {
            if (item.resource && item.resource.match(/[\\/]node_modules[\\/]/)) {
              if (item.resource.match(/\.s?css$/)) {
                return false;
              }
              return true;
            }
            return false;
          },
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  node: {
    fs: 'empty',
  },
};